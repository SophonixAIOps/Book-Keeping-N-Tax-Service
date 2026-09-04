import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { cta } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "How ClearLedger works with small business owners, and what to expect from the engagement.",
};

/* Structural placeholder. Section content is authored in a later phase. */
const outline = ["Our approach", "How an engagement works", "Working with us"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="The people behind your books"
        description="A small practice built around steady, unhurried work and plain answers."
      />

      <Section bordered>
        <Container>
          <Heading as="h2">Page outline</Heading>
          <ul className="mt-6 flex flex-col gap-3">
            {outline.map((item) => (
              <li key={item}>
                <Text>{item}</Text>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CTASection
        heading="Have a question about your books?"
        description="We are happy to talk it through before you commit to anything."
        action={cta.primary}
        secondaryAction={cta.secondary}
      />
    </>
  );
}
