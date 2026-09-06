import { contact, services, siteConfig } from "@/lib/site-config";
import { serviceDetails } from "@/components/services/services-data";
import { absoluteUrl, pageSeo, type PagePath } from "@/lib/seo";

/**
 * JSON-LD for the four public routes.
 *
 * Every value here traces back to something already published on the page.
 * ClearLedger is a fictional practice with no address, no service area, no
 * credentials and no clients, so the properties that would describe those are
 * absent rather than filled in — structured data that a visitor cannot verify
 * against the page is worse than no structured data at all.
 *
 * Deliberately omitted, each for a reason:
 * - `logo` / `image` — there is no logo asset; the wordmark is live text.
 * - `address`, `areaServed`, `geo`, `hasMap` — no location exists to state.
 * - `sameAs` — no social or directory profiles exist.
 * - `aggregateRating`, `review`, `award`, `foundingDate`, `numberOfEmployees`,
 *   `priceRange`, `hasCredential` — nothing on the site supports any of them.
 * - `BreadcrumbList` — the site renders no breadcrumb trail to mark up.
 * - `FAQPage` — there is no FAQ.
 * - `potentialAction` / `SearchAction` — there is no site search to invoke.
 */

type JsonLdNode = { "@type": string; "@id": string } & Record<string, unknown>;

type JsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
};

/** A pointer to another node in the same graph. */
type NodeRef = { "@id": string };

/* Root-relative when no origin is configured. That is valid JSON-LD: a relative
   IRI resolves against the document it is embedded in, so these identifiers are
   correct on whatever domain the site is eventually served from — and no
   fictional hostname has to be guessed to make them absolute. */
const organizationId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");

const organizationRef: NodeRef = { "@id": organizationId };

/**
 * `Organization`, not `AccountingService` or `ProfessionalService`.
 *
 * Both of those are subtypes of `LocalBusiness`, which asserts a physical
 * place of business and expects an address and opening hours attached to it.
 * ClearLedger has none, so claiming the more specific type would be claiming
 * the local presence that comes with it. `Organization` says only what is true.
 *
 * `contact.hours` is real published data, but `openingHoursSpecification`
 * belongs to `LocalBusiness` — it is left off with the type, not smuggled in.
 */
function organizationNode(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.tagline,
    email: contact.email,
    telephone: contact.phone,
  };
}

function websiteNode(): JsonLdGraph["@graph"][number] {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: absoluteUrl("/"),
    name: siteConfig.legalName,
    description: siteConfig.tagline,
    inLanguage: "en",
    publisher: organizationRef,
  };
}

/**
 * One `Service` per entry on the Services page, addressed by the same anchor
 * the page's own navigation uses.
 *
 * The `note` on a service is a published qualification — most importantly that
 * payroll support is record-keeping rather than payroll provision — so it is
 * carried into `description` instead of being dropped. Schema that describes
 * "Payroll Support" as a payroll service would overstate what is offered.
 *
 * No `offers`, `price` or `areaServed`: nothing is priced or geographically
 * scoped anywhere on the site.
 */
function serviceNode(service: (typeof services)[number]): JsonLdNode {
  const detail = serviceDetails[service.id];
  const url = absoluteUrl(service.href);

  return {
    "@type": "Service",
    "@id": url,
    url,
    name: service.label,
    description: detail.note
      ? `${detail.description} ${detail.note}`
      : detail.description,
    provider: organizationRef,
    audience: detail.audience.map((audienceType) => ({
      "@type": "Audience",
      audienceType,
    })),
  };
}

const pageType: Record<PagePath, string> = {
  "/": "WebPage",
  "/services": "CollectionPage",
  "/about": "AboutPage",
  "/contact": "ContactPage",
};

/** The complete graph for a route: the site and organization it belongs to, the
    page itself, and — on the services page — what that page collects. */
export function pageGraph(path: PagePath): JsonLdGraph {
  const { title, description } = pageSeo[path];
  const serviceNodes = path === "/services" ? services.map(serviceNode) : [];

  const page: JsonLdNode = {
    "@type": pageType[path],
    "@id": absoluteUrl(`${path}#webpage`),
    url: absoluteUrl(path),
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    about: serviceNodes.length
      ? serviceNodes.map((node) => ({ "@id": node["@id"] }))
      : organizationRef,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode(), page, ...serviceNodes],
  };
}
