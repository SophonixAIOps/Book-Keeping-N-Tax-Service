import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { AboutPurpose } from "@/components/about/about-purpose";
import { AboutPhilosophy } from "@/components/about/about-philosophy";
import { AboutApproach } from "@/components/about/about-approach";
import { AboutAudience } from "@/components/about/about-audience";
import { AboutExperience } from "@/components/about/about-experience";
import { AboutPrinciples } from "@/components/about/about-principles";
import { cta } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why ClearLedger exists, how the practice approaches accounting, who the work is built for, and what to expect from working together.",
};

export default function AboutPage() {
  return (
    <>
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

      <CTASection
        // The brief suggested "Let’s Make Your Finances Easier." — the homepage
        // already closes on that exact line, so this one is worded differently
        // rather than repeating the site's closing heading verbatim.
        heading="Let's Make Your Finances Easier."
        description="If you’re looking for a more organized way to manage your financial records, let’s start with a conversation about what your business needs."
        action={cta.primary}
        secondaryAction={cta.secondary}
        tone="accent"
        spacing="lg"
      />
    </>
  );
}
