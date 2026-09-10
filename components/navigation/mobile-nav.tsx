"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { mainNav, cta } from "@/lib/site-config";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";

/**
 * Disclosure-pattern navigation: the panel expands inline beneath the header
 * rather than covering the screen. Because it is not a modal, the natural tab
 * order already does the right thing — no focus trap or inert background is
 * needed, and none is added.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex size-11 items-center justify-center rounded-md text-ink transition-colors [transition-duration:var(--duration-fast)] hover:bg-surface-muted md:hidden"
      >
        {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
      </button>

      {/* Entrance only. The panel is removed from the DOM on close so its links
          never sit in the tab order while hidden, which also means there is no
          element left to animate out — dismissal is immediate by design.
          `starting:` degrades to today's instant appearance where
          @starting-style is unsupported. */}
      {open && (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full border-b border-border bg-canvas transition-[opacity,translate] [transition-duration:var(--duration-base)] [transition-timing-function:var(--ease-out-soft)] starting:-translate-y-1 starting:opacity-0 md:hidden"
        >
          <nav aria-label="Mobile" className="gutter mx-auto max-w-page py-6">
            <ul className="flex flex-col">
              {mainNav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-12 items-center border-b border-border text-h4",
                        active ? "text-accent" : "text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ButtonLink
              href={cta.primary.href}
              size="lg"
              fullWidth
              onClick={() => setOpen(false)}
              className="mt-6"
            >
              {cta.primary.label}
            </ButtonLink>
          </nav>
        </div>
      )}
    </>
  );
}
