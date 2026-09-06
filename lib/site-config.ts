/**
 * Single source of truth for repeated site-wide labels and links.
 *
 * ClearLedger is a fictional firm. Contact details below are deliberately
 * non-routable placeholders — the 555-01xx range and the reserved `.example`
 * TLD both exist for fiction — so nothing here can be mistaken for, or dial
 * through to, a real business. No street address is invented.
 */

export const siteConfig = {
  name: "ClearLedger",
  descriptor: "Accounting",
  legalName: "ClearLedger Accounting",
  tagline:
    "Bookkeeping and tax services that give small businesses clarity, accuracy, and confidence.",
} as const;

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Includes Home, which the header expresses through the wordmark instead. */
export const footerNav = [
  { label: "Home", href: "/" },
  ...mainNav,
] as const;

/** Canonical service list. `summary` is the one-line description used wherever
    a service is listed; the full treatment lives on the Services page, and `id`
    is the anchor there — so every link to a service lands on that service
    rather than on the top of a shared page. */
export const services = [
  {
    id: "monthly-bookkeeping",
    label: "Monthly Bookkeeping",
    href: "/services#monthly-bookkeeping",
    summary:
      "Keep financial records organized and current throughout the year.",
  },
  {
    id: "tax-preparation",
    label: "Tax Preparation",
    href: "/services#tax-preparation",
    summary:
      "Prepare organized financial information for a smoother tax process.",
  },
  {
    id: "payroll-support",
    label: "Payroll Support",
    href: "/services#payroll-support",
    summary: "Help keep payroll-related records organized and up to date.",
  },
  {
    id: "business-accounting",
    label: "Business Accounting",
    href: "/services#business-accounting",
    summary:
      "Practical accounting support built around the needs of small businesses.",
  },
  {
    id: "financial-reporting",
    label: "Financial Reporting",
    href: "/services#financial-reporting",
    summary: "Turn financial activity into clear, useful reports.",
  },
  {
    id: "catch-up-bookkeeping",
    label: "Catch-Up Bookkeeping",
    href: "/services#catch-up-bookkeeping",
    summary: "Bring overdue or disorganized books back into order.",
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];

export const contact = {
  phone: "(555) 0100",
  phoneHref: "tel:+15550100",
  email: "hello@clearledger.example",
  emailHref: "mailto:hello@clearledger.example",
  hours: [
    { days: "Monday – Thursday", time: "9:00am – 5:00pm" },
    { days: "Friday", time: "9:00am – 3:00pm" },
  ],
} as const;

/**
 * Geography for ClearLedger. Every field is `null` because none of it is
 * verified: there is no office, no registered service area and no Google
 * Business Profile behind this demo.
 *
 * The shape exists so a real location can be filled in later without touching
 * the components that read it. Anything consuming this must render nothing
 * when a field is null rather than printing a placeholder — an unconfirmed
 * service area shown to a visitor reads as a real, if vague, claim.
 */
export const location = {
  streetAddress: null,
  locality: null,
  region: null,
  postalCode: null,
  country: null,
  serviceArea: null,
  googleBusinessProfileUrl: null,
} as const;

export const cta = {
  primary: { label: "Schedule a Consultation", href: "/contact" },
  secondary: { label: "Explore Our Services", href: "/services" },
  /** Heading for the footer's closing prompt. Deliberately distinct from
      `primary.label` so the heading never simply restates its own button. */
  closingHeading: "Ready to get your books in order?",
} as const;
