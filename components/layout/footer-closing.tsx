"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heading } from "@/components/ui/typography";
import { ArrowRightIcon } from "@/components/icons";
import { cta } from "@/lib/site-config";

/**
 * The footer's closing prompt, hidden on the page it points at. Split out of
 * the footer purely because the pathname is unavailable to a server component;
 * the footer itself stays static so the copyright year is not client-rendered.
 */
export function FooterClosing() {
  if (usePathname() === cta.primary.href) return null;

  return (
    /* Deliberately a quiet single line, not a second CTA band: every page
       already closes on a full-weight consultation prompt directly above the
       footer, and two heavy dark bands in a row read as a repeat. */
    <div className="flex flex-col gap-3 border-b border-ink-inverse/12 py-10 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
      <Heading as="h2" variant="h4" className="text-ink-inverse">
        {cta.closingHeading}
      </Heading>
      <Link
        href={cta.primary.href}
        className="group inline-flex shrink-0 items-center gap-2 text-body-sm text-ink-inverse/75 transition-colors [transition-duration:var(--duration-fast)] hover:text-ink-inverse"
      >
        {cta.primary.label}
        <ArrowRightIcon
          size={16}
          className="transition-transform [transition-duration:var(--duration-fast)] group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}
