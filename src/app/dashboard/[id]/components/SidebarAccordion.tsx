"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bold } from "#components/Fonts";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "#ui/Accordion";
import { Button } from "#ui/Button";
import type { Category } from "./Sidebar";

export function SidebarAccordionComponent({
  data,
}: {
  data: Category;
}) {
  const pathname = usePathname();

  return (
    <Accordion collapsible={true} type="single" defaultValue={data.name}>
      <AccordionItem value={data.name}>
        <AccordionTrigger className={bold.className}>{data.name.toUpperCase()}</AccordionTrigger>
        <AccordionContent>
          {data.items.map((item, _) => (
            <Button
              key={item.name}
              asChild={true}
              variant={pathname === item.href ? "default" : "ghost"}
              className="flex w-full justify-start"
            >
              <Link href={item.href} aria-label={`${item.name} Page`} className="flex items-center gap-2">
                {item.icon}
                {item.name}
                {item.badge && <span className="flex w-full justify-end">{item.badge}</span>}
              </Link>
            </Button>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
