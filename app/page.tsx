import { HomeHero } from "@/components/home/home-hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { ServicesOverview } from "@/components/home/services-overview";
import { MoreThanNumbers } from "@/components/home/more-than-numbers";
import { WhyClearLedger } from "@/components/home/why-clearledger";
import { ProcessSection } from "@/components/home/process-section";
import { ClientPerspectives } from "@/components/home/client-perspectives";
import { CTASection } from "@/components/sections/cta-section";
import { cta } from "@/lib/site-config";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <ServicesOverview />
      <MoreThanNumbers />
      <WhyClearLedger />
      <ProcessSection />
      <ClientPerspectives />
      <CTASection
        tone="accent"
        spacing="lg"
        align="center"
        heading="Let’s Make Your Finances Easier."
        description="Whether your books need ongoing attention or simply need to be brought back into order, let’s talk about what your business needs."
        action={cta.primary}
        secondaryAction={cta.secondary}
      />
    </>
  );
}
