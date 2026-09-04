import { LedgerLines } from "@/components/financial/ledger-lines";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

const principles = [
  {
    title: "Accuracy",
    body: "Financial records deserve careful attention, and checking is part of the work rather than an extra step.",
  },
  {
    title: "Organization",
    body: "Information should be structured well enough that finding something is never the hard part.",
  },
  {
    title: "Responsibility",
    body: "Financial information is handled thoughtfully and professionally, whatever the size of the engagement.",
  },
  {
    title: "Client Focus",
    body: "The work should reflect what the client actually needs, not what is easiest to standardize.",
  },
];

/** A statement held against a quiet list — the page's closing argument before
    the ask. Values, not evidence: nothing here asserts a credential. */
export function AboutPrinciples() {
  return (
    <Section spacing="lg" tone="muted" className="relative overflow-hidden">
      {/* The page's one ledger motif: accounting-paper ruling behind the closing
          statement, faint enough to read as texture rather than as content. */}
      <LedgerLines
        rowHeight={44}
        className="absolute inset-x-0 top-0 h-2/3 opacity-40"
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>What matters to us</Eyebrow>
            <Heading as="h2" className="mt-4 text-ink">
              The standard behind every engagement.
            </Heading>
            <Text className="mt-5">
              These are not claims about results. They are what the work is held
              to, on every set of books, regardless of how small the engagement
              is.
            </Text>
          </div>

          <Reveal className="lg:col-span-6 lg:col-start-7">
            <dl>
              {principles.map((principle) => (
                <div
                  key={principle.title}
                  className="border-t border-border py-6 first:border-t-0 first:pt-0"
                >
                  <dt className="font-serif text-h2 leading-tight text-ink">
                    {principle.title}
                  </dt>
                  <dd className="mt-2 text-body-sm text-ink-secondary">
                    {principle.body}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
