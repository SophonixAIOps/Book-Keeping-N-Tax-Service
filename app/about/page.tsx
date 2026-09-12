import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { AboutPurpose } from "@/components/about/about-purpose";
import { AboutPhilosophy } from "@/components/about/about-philosophy";
import { AboutApproach } from "@/components/about/about-approach";
import { AboutAudience } from "@/components/about/about-audience";
import { AboutExperience } from "@/components/about/about-experience";
import { AboutPrinciples } from "@/components/about/about-principles";
import { JsonLd } from "@/components/seo/json-ld";
import { cta } from "@/lib/site-config";
import { canonicalFor, pageSeo, socialFor } from "@/lib/seo";
import { pageGraph } from "@/lib/schema";

export const metadata: Metadata = {
  ...pageSeo["/about"],
  ...socialFor("/about"),
  alternates: canonicalFor("/about"),
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageGraph("/about")} />
      <PageHero
        eyebrow="About ClearLedger"
        title="Built to Give Business Owners Peace of Mind."
        description="Accounting should do more than keep records. It should give a business owner a clearer understanding of where things stand and what needs attention."
        primaryAction={cta.primary}
        secondaryAction={cta.secondary}
      />

      <AboutPurpose />
      <AboutPhilosophy />
      <AboutApproach />
      <AboutAudience />
      <AboutExperience />
      <AboutPrinciples />

      {/* Worded off the homepage's "Let’s Make Your Finances Easier." and off
          the Contact page's "Start With a Conversation" — this page should not
          close on a line the visitor has already read elsewhere. */}
      <CTASection
        heading="A Clearer Place to Begin."
        description="If you’re looking for a more organized way to manage your financial records, let’s start with a conversation about what your business needs."
        action={cta.primary}
        secondaryAction={cta.secondary}
        tone="accent"
        spacing="lg"
      />
    </>
  );
}
