import Link from "next/link";
import { NavbarComponent } from "#components/navbar/Navbar";
import { Button } from "#components/ui/Button";
import { ADD_TO_DISCORD_URL } from "#lib/Constants";

export default function Page() {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="flex full-screen:h-[calc(650px_-_64px)] h-[calc(100dvh_-_64px)] flex-col items-center justify-center gap-6 px-8">
        <div className="rounded-full border border-amber-400 p-2 text-amber-400 text-xs">
          Overseer is in Alpha Stage
        </div>
        <h1 className="max-w-xl text-center font-extrabold text-5xl">
          A better way to manage <br />
          Discord Servers
        </h1>
        <p className="max-w-xl text-center text-default-400">
          Overseer is a Discord bot created with the purpose of being robust and manage Discord Servers in a better and
          easy way
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button variant="white" asChild={true}>
            <Link target="_self" href={ADD_TO_DISCORD_URL} aria-label="Add to Discord Link">
              Add to Discord
            </Link>
          </Button>
          <Button variant="outline" asChild={true}>
            <Link target="_self" href="/dashboard" aria-label="Add to Discord Link">
              Manage Servers
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
