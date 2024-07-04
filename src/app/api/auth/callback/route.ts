import { CALLBACK_URL, CLIENT_ID, CLIENT_SECRET } from "@/lib/Constants";
import { encrypt, encryptJWT, nextRedirect } from "@/lib/Util";
import { type APIUser, type RESTPostOAuth2AccessTokenResult, RouteBases, Routes } from "discord-api-types/v10";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return nextRedirect(url.origin);
  }

  const exchangeCodeRequest = await fetch(`${RouteBases.api}/${Routes.oauth2TokenExchange()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: CALLBACK_URL,
      scopes: "identity guilds email",
    }),
  });

  if (!exchangeCodeRequest.ok) {
    return nextRedirect(url.origin);
  }

  const exchangeCodeResponse = <RESTPostOAuth2AccessTokenResult>await exchangeCodeRequest.json();
  const userRequest = await fetch(`${RouteBases.api}/${Routes.user()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${exchangeCodeResponse.token_type} ${exchangeCodeResponse.access_token}`,
    },
  });

  if (!userRequest.ok) {
    return nextRedirect(url.origin);
  }

  const userResponse = <APIUser>await userRequest.json();
  const authorization = await encryptJWT({
    userId: userResponse.id,
    username: userResponse.username,
    avatarHash: userResponse.avatar,
    globalName: userResponse.global_name,
    name: userResponse.global_name ?? userResponse.username,
    email: encrypt(userResponse.email ?? ""),
    accessToken: encrypt(exchangeCodeResponse.access_token),
  });

  cookies().set("authorization", authorization, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 604_800,
  });

  return nextRedirect(url.origin);
}
