"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { mainNav } from "@/lib/site-config";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-8">
      {mainNav.map((item) => {
        const active = pathname === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative inline-flex h-16 items-center text-nav transition-colors",
                "[transition-duration:var(--duration-fast)] [transition-timing-function:var(--ease-out-soft)]",
                /* Underline is drawn on a pseudo-element so the link never
                   shifts as it thickens on hover. */
                "after:absolute after:inset-x-0 after:bottom-[-1px] after:h-px after:bg-accent after:transition-opacity",
                "after:[transition-duration:var(--duration-fast)]",
                active
                  ? "text-ink after:opacity-100"
                  : "text-ink-secondary hover:text-ink after:opacity-0 hover:after:opacity-100",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
