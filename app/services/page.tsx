import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { ServicesIndex } from "@/components/services/services-index";
import { ServiceSection } from "@/components/services/service-section";
import { ServiceCatchUp } from "@/components/services/service-catchup";
import {
  LedgerExtract,
  YearEndFile,
  PayrollSummary,
  QuarterlyReport,
} from "@/components/services/service-visuals";
import { cta } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Monthly bookkeeping, tax preparation, payroll support, business accounting, financial reporting and catch-up bookkeeping for small businesses and individuals.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Accounting Support Built Around Your Business."
        description="ClearLedger handles monthly bookkeeping, tax preparation, payroll support, business accounting, financial reporting and catch-up work for small businesses and individuals — shaped around how the business actually runs."
        primaryAction={cta.primary}
        secondaryAction={{
          label: "See How We Work",
          href: "/services#what-we-do",
        }}
      />

      <ServicesIndex />

      {/* Tone and layout alternate deliberately: no two consecutive sections
          share a background or put the visual on the same side. */}
      <ServiceSection
        id="monthly-bookkeeping"
        tone="canvas"
        visual={<LedgerExtract />}
        visualSide="end"
      />

      <ServiceSection
        id="tax-preparation"
        tone="muted"
        visual={<YearEndFile />}
        visualSide="start"
      />

      <ServiceSection
        id="payroll-support"
        tone="canvas"
        visual={<PayrollSummary />}
        visualSide="end"
      />

      <ServiceSection id="business-accounting" tone="accentSoft" layout="open" />

      <ServiceSection
        id="financial-reporting"
        tone="canvas"
        visual={<QuarterlyReport />}
        visualSide="start"
      />

      <ServiceCatchUp />

      <CTASection
        heading="Not Sure Where to Start?"
        description="You don’t need to figure out the right accounting service on your own. Tell us where things stand, and we’ll help you understand what kind of support makes sense for your business."
        action={cta.primary}
        tone="canvas"
        spacing="lg"
        align="center"
      />

      <CTASection
        heading="Let’s Get Your Finances Organized."
        description="Whether you need ongoing bookkeeping, tax preparation, or help bringing your records back up to date, let’s talk about what your business needs."
        // Distinct wording from the section directly above it, which already
        // uses the site's "Schedule a Consultation" primary.
        action={{ label: "Get in Touch", href: cta.primary.href }}
        tone="accent"
      />
    </>
  );
}
