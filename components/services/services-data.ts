import { services, type ServiceId } from "@/lib/site-config";

export type Service = (typeof services)[number];

/** Per-service detail copy. `label`, `href` and the one-line `summary` stay in
    `lib/site-config.ts` so the header, footer, homepage and this page cannot
    drift apart; only the long-form content lives here. */
export type ServiceDetail = {
  /** Two-digit numeral shown in the index and beside each section heading. */
  number: string;
  description: string;
  audience: string[];
  coverage: string[];
  benefits: string[];
  /** Always "Discuss <this service>". One shared verb so no service reads as
      a stronger offer than its neighbours, and the service named so the link
      still stands on its own out of context. Never an outcome ("Get Your
      Books Back on Track") — the point is to decide whether the service
      fits, which is not something the link can promise. */
  cta: string;
  /** Optional honesty guard rendered under the coverage list. */
  note?: string;
};

export const serviceDetails: Record<ServiceId, ServiceDetail> = {
  "monthly-bookkeeping": {
    number: "01",
    description:
      "Bookkeeping works best when it happens steadily rather than all at once. Records are maintained month by month, so the numbers stay current and the year never has to be reconstructed from memory.",
    audience: [
      "Small business",
      "Freelancer",
      "Contractor",
      "Growing business",
    ],
    coverage: [
      "Transaction categorization",
      "Bank and account reconciliation",
      "Expense organization",
      "Monthly record maintenance",
      "Basic financial reporting",
    ],
    benefits: [
      "More organized financial records",
      "Less administrative backlog",
      "Better visibility into the business",
      "Easier preparation for tax and reporting",
    ],
    cta: "Discuss Monthly Bookkeeping",
  },

  "tax-preparation": {
    number: "02",
    description:
      "Most of the difficulty around tax time comes from disorganized information rather than the filing itself. The work here is getting financial records into order so the process is calmer and better documented.",
    audience: [
      "Small business",
      "Self-employed",
      "Freelancer",
      "Contractor",
      "Individual",
    ],
    coverage: [
      "Financial record organization",
      "Income and expense information",
      "Tax document preparation support",
      "Year-end financial organization",
    ],
    benefits: [
      "Financial information prepared ahead of time",
      "Fewer last-minute gaps to chase",
      "A clearer record of the year",
      "A more predictable tax season",
    ],
    cta: "Discuss Tax Preparation",
    note: "Support here is focused on organizing and preparing financial information. Outcomes depend on your specific circumstances.",
  },

  "payroll-support": {
    number: "03",
    description:
      "Payroll generates a steady stream of records that need to stay accurate and easy to find. This support keeps that side of the books organized alongside everything else.",
    audience: [
      "Small team",
      "Owner-operated",
      "Adding employees",
      "Startup",
    ],
    coverage: [
      "Payroll record organization",
      "Payroll-related bookkeeping",
      "Expense categorization",
      "Coordination with payroll systems where applicable",
    ],
    benefits: [
      "Payroll records kept current",
      "Payroll costs reflected in the books",
      "Less time spent locating information",
      "A clearer view of what staffing costs",
    ],
    cta: "Discuss Payroll Support",
    note: "ClearLedger supports payroll record-keeping and bookkeeping. It does not operate as a payroll provider.",
  },

  "business-accounting": {
    number: "04",
    description:
      "Beyond keeping records, business accounting is about understanding what those records say. The aim is a financial picture an owner can actually read and use when making decisions.",
    audience: ["Small business", "Startup", "Landlord", "Contractor"],
    coverage: [
      "Account organization",
      "Financial record maintenance",
      "Business expense tracking",
      "Financial review",
      "General accounting support",
    ],
    benefits: [
      "A clearer understanding of financial position",
      "Expenses tracked against the right categories",
      "Regular review rather than year-end surprises",
      "Financial information that is easier to use",
    ],
    cta: "Discuss Business Accounting",
  },

  "financial-reporting": {
    number: "05",
    description:
      "Reporting turns a run of transactions into something readable. Revenue, expenses, cash activity and trends are presented over a period, so the shape of the business is visible at a glance.",
    audience: ["Small business", "Startup", "Growing business"],
    coverage: [
      "Revenue and expense summaries",
      "Cash activity overviews",
      "Period-over-period comparison",
      "Reports prepared on a regular schedule",
    ],
    benefits: [
      "Financial activity presented clearly",
      "Trends visible over time",
      "Easier conversations about performance",
      "Information ready when it is needed",
    ],
    cta: "Discuss Financial Reporting",
  },

  "catch-up-bookkeeping": {
    number: "06",
    description:
      "Books fall behind for ordinary reasons — a busy season, a change in systems, a year that got away. Catch-up work starts by establishing where things actually stand, then brings the records back into order.",
    audience: ["Small business", "Freelancer", "Contractor", "Individual"],
    coverage: [
      "Books have fallen behind",
      "Records are incomplete or disorganized",
      "Preparing for tax season",
      "Records need to be brought current",
    ],
    benefits: [
      "A clear picture of what is missing",
      "Records brought back into order",
      "A defined path back to current",
      "A foundation for ongoing bookkeeping",
    ],
    cta: "Discuss Catch-Up Bookkeeping",
    note: "Every set of books is different, so scope is reviewed together before any work begins rather than promised against a fixed timeline.",
  },
};

/** Lets a section be addressed by id alone, so the page never has to thread
    both the config entry and its detail through every call site. */
export const serviceById = Object.fromEntries(
  services.map((service) => [service.id, service]),
) as Record<ServiceId, Service>;
