import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { contact } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ClearLedger to talk through bookkeeping, tax or payroll support.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Schedule a consultation"
        description="Tell us a little about your business and we will get back to you."
      />

      <Section bordered>
        <Container>
          <Heading as="h2">Contact details</Heading>
          <dl className="mt-6 flex flex-col gap-5">
            <div>
              <dt className="text-eyebrow uppercase text-ink-tertiary">Phone</dt>
              <dd className="mt-1 text-body text-ink numeric">
                {contact.phone}
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow uppercase text-ink-tertiary">Email</dt>
              <dd className="mt-1 text-body text-ink">{contact.email}</dd>
            </div>
            <div>
              <dt className="text-eyebrow uppercase text-ink-tertiary">
                Office hours
              </dt>
              {contact.hours.map((entry) => (
                <dd key={entry.days} className="mt-1 text-body text-ink">
                  {entry.days}
                  <span className="text-ink-tertiary numeric"> — {entry.time}</span>
                </dd>
              ))}
            </div>
          </dl>

          <Text size="caption" tone="tertiary" measure className="mt-8">
            ClearLedger is a fictional firm. The phone number and email address
            shown are non-routable placeholders reserved for documentation.
          </Text>
        </Container>
      </Section>
    </>
  );
}
