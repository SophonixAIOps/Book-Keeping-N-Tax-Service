import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { ContactConsultation } from "@/components/contact/contact-consultation";
import { ContactNextSteps } from "@/components/contact/contact-next-steps";
import { cta } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a consultation with ClearLedger. Share a few details about your business and the bookkeeping, tax, payroll or reporting support you are considering.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact ClearLedger"
        title="Let’s Get Your Finances Organized."
        description="Tell us a little about your business, what you need help with, and where things stand today. We’ll use that information to understand how we can best support you."
        // Kept compact and action-free: the consultation form is the next thing
        // on the page, so a hero CTA would only scroll past it.
        spacing="md"
      />

      <ContactConsultation />
      <ContactNextSteps />

      <Section spacing="md" tone="accentSoft" bordered>
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
            <div>
              <Heading as="h2" className="text-ink">
                Not Sure Which Service Fits?
              </Heading>
              <Text size="lg" measure className="mt-4">
                That’s okay. You do not need to have everything figured out
                before reaching out. Tell us what is happening in your business,
                and the conversation can start there.
              </Text>
            </div>
            <ButtonLink
              href={cta.secondary.href}
              variant="secondary"
              size="lg"
              className="shrink-0"
            >
              {cta.secondary.label}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Closes on reassurance rather than another button. The page already is
          the conversion point, and the footer carries the site's closing CTA —
          a third action here would only stack. */}
      <Section spacing="md" tone="accent">
        <Container>
          <div className="max-w-narrow">
            <Heading as="h2" className="text-ink-inverse">
              Clear Records Make Everything Else Easier.
            </Heading>
            <Text size="lg" tone="inverse" measure className="mt-4 opacity-75">
              Organized records make reporting simpler, tax preparation calmer,
              and business decisions easier to think through. That is what the
              work is for.
            </Text>
          </div>
        </Container>
      </Section>
    </>
  );
}
