import Link from "next/link";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

type WordmarkProps = {
  /** Inverted surfaces (the footer) need the light treatment. */
  tone?: "default" | "inverse";
  className?: string;
};

/** Purely typographic: serif name over a spaced descriptor, joined by a short
    accent rule. No logo asset, which keeps the mark crisp at every size. */
export function Wordmark({ tone = "default", className }: WordmarkProps) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex flex-col leading-none", className)}
      aria-label={`${siteConfig.legalName} — home`}
    >
      <span
        className={cn(
          "font-serif text-[1.375rem] tracking-[-0.015em] sm:text-[1.5rem]",
          tone === "inverse" ? "text-ink-inverse" : "text-ink",
        )}
      >
        {siteConfig.name}
      </span>
      <span className="mt-1.5 inline-flex items-center gap-2">
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-4 transition-[width] [transition-duration:var(--duration-base)] [transition-timing-function:var(--ease-out-soft)] group-hover:w-6",
            tone === "inverse" ? "bg-ink-inverse/40" : "bg-accent",
          )}
        />
        <span
          className={cn(
            "text-eyebrow uppercase",
            tone === "inverse" ? "text-ink-inverse/60" : "text-ink-tertiary",
          )}
        >
          {siteConfig.descriptor}
        </span>
      </span>
    </Link>
  );
}
