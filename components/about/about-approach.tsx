import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { ArrowRightIcon } from "@/components/icons";

const stages = [
  {
    title: "Records",
    body: "Financial activity is captured as it happens, so the year never has to be reconstructed from memory.",
  },
  {
    title: "Organization",
    body: "Consistent bookkeeping turns that activity into a foundation that holds together month to month.",
  },
  {
    title: "Understanding",
    body: "Once information is organized it can be read: what came in, what went out, and what changed.",
  },
  {
    title: "Preparedness",
    body: "Reporting, tax preparation and business decisions all draw on the same organized records.",
  },
];

/** A single narrow column with a turned arrow between stages — the one
    composition on this page that runs down the middle, and the sequence reads
    the same at every width. The arrows are decorative; the ordered list and
    the copy carry the progression on their own. */
export function AboutApproach() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="max-w-narrow">
          <Eyebrow>Our approach</Eyebrow>
          <Heading as="h2" className="mt-4 text-ink">
            Accounting is more useful when it helps you understand the business
            behind the numbers.
          </Heading>
          <Text size="lg" className="mt-5">
            Each stage depends on the one before it. Skip the first and the last
            becomes guesswork.
          </Text>
        </div>

        <Reveal className="mt-14 max-w-narrow">
          <ol>
            {stages.map((stage, index) => (
              <li key={stage.title}>
                {index > 0 && (
                  <ArrowRightIcon
                    size={18}
                    className="my-7 rotate-90 text-accent"
                  />
                )}
                <div className="grid gap-x-8 gap-y-2 sm:grid-cols-12 sm:items-baseline">
                  <Heading
                    as="h3"
                    variant="h2"
                    className="text-ink sm:col-span-5"
                  >
                    {stage.title}
                  </Heading>
                  <Text className="sm:col-span-7">{stage.body}</Text>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
