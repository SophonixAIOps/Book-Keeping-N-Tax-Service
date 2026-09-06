import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/seo";

/**
 * The four public routes stay crawlable. `/design-system` is disallowed as
 * well as `noindex` so a specimen page never competes with the real ones.
 *
 * The `sitemap` line is omitted until an origin is configured — the reference
 * has to be absolute to be usable.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/design-system",
    },
    ...(siteUrl ? { sitemap: absoluteUrl("/sitemap.xml") } : {}),
  };
}
