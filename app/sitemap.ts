import type { MetadataRoute } from "next";
import { footerNav } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/seo";

/**
 * The four public routes only. `/design-system` is a specimen page carrying
 * `robots: { index: false }` and is deliberately absent.
 *
 * Until `NEXT_PUBLIC_SITE_URL` is set at build time these entries are
 * root-relative. The sitemap spec requires absolute URLs, so setting that
 * variable is a launch requirement — no domain is guessed here.
 *
 * `changeFrequency` and `priority` are omitted rather than invented: both are
 * hints Google ignores, and picking numbers would only add noise.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return footerNav.map((route) => ({
    url: absoluteUrl(route.href),
    lastModified,
  }));
}
