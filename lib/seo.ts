import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * The origin this site is served from, supplied at build time via
 * `NEXT_PUBLIC_SITE_URL` (e.g. https://clearledger.example.com).
 *
 * ClearLedger has no deployment domain yet, so there is no default. Guessing
 * one would put a fictional hostname into canonical tags and the sitemap,
 * which is worse than emitting neither.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

/** Absolute URL for a route, or the root-relative path when no origin is set. */
export function absoluteUrl(path: string) {
  return siteUrl ? new URL(path, siteUrl).href : path;
}

/**
 * Canonical metadata for a route. Returns `undefined` until an origin is
 * configured: Next resolves a relative canonical against `metadataBase`, which
 * silently falls back to localhost, and a localhost canonical in production
 * markup is an actively wrong signal.
 */
export function canonicalFor(path: string): Metadata["alternates"] {
  return siteUrl ? { canonical: path } : undefined;
}

/** Site-wide title, and the homepage's own title — the home page is the one
    route whose name is the brand line rather than a section name. */
export const siteTitle = `${siteConfig.legalName} — Bookkeeping & Tax Services`;

/**
 * Title and description for each public route, read by both the `Metadata`
 * exports and the JSON-LD graph.
 *
 * They share one source so a page cannot describe itself one way to a crawler
 * reading `<meta>` and another way to a crawler reading structured data —
 * mismatched descriptions are the usual way schema drifts out of date.
 */
export const pageSeo = {
  "/": {
    title: siteTitle,
    description:
      "Monthly bookkeeping, tax preparation and accounting support for small businesses — organized records and clear reporting, so you know where the business stands.",
  },
  "/services": {
    // Titled by what the page offers rather than by its nav label: "Services"
    // alone carries no search intent, and this is the site's strongest
    // service-intent page.
    title: "Accounting & Bookkeeping Services",
    description:
      "Monthly bookkeeping, tax preparation, payroll support, business accounting, financial reporting and catch-up bookkeeping for small businesses and individuals.",
  },
  "/about": {
    title: "About Our Accounting Practice",
    description:
      "Why ClearLedger exists, how the practice approaches small business accounting and bookkeeping, who the work is built for, and what to expect.",
  },
  "/contact": {
    title: "Contact & Consultation",
    description:
      "Request a consultation with ClearLedger. Share a few details about your business and the bookkeeping, tax, payroll or reporting support you are considering.",
  },
} as const;

export type PagePath = keyof typeof pageSeo;

/**
 * Open Graph and Twitter metadata for a route, built from the same title and
 * description the page already publishes, so a shared link cannot describe the
 * page differently from its `<meta>` tags.
 *
 * No `images`: there is no social asset, and a card pointing at a missing file
 * is worse than one without art. No `locale`: the tag expects a
 * language_TERRITORY pair, and ClearLedger claims no territory.
 *
 * `url` is emitted only once an origin is configured, for the same reason
 * `canonicalFor` withholds a canonical — a localhost URL in shared markup is an
 * actively wrong signal.
 */
export function socialFor(path: PagePath): Metadata {
  const { title, description } = pageSeo[path];

  return {
    openGraph: {
      type: "website",
      siteName: siteConfig.legalName,
      title,
      description,
      ...(siteUrl ? { url: absoluteUrl(path) } : {}),
    },
    twitter: { card: "summary", title, description },
  };
}
