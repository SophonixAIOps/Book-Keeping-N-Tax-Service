import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Heading, Text } from "@/components/ui/typography";

/* Written as what can happen, not what will. No response window is promised
   and no inquiry is described as becoming an engagement. */
const stages = [
  {
    number: "01",
    title: "We Review Your Inquiry",
    body: "The information you provide gives us context about your business and what you are looking for.",
  },
  {
    number: "02",
    title: "We Understand the Situation",
    body: "The conversation can focus on your current accounting setup, priorities, and the areas where you need support.",
  },
  {
    number: "03",
    title: "We Determine the Right Next Step",
    body: "If ClearLedger is a good fit for what you need, the next step can be discussed from there.",
  },
];

export function ContactNextSteps() {
  return (
    <Section spacing="lg" tone="surface" bordered>
      <Container>
        <div className="max-w-narrow">
          <Heading as="h2" className="text-ink">
            What Happens Next
          </Heading>
          <Text className="mt-5">
            An inquiry is the start of a conversation, not a commitment on
            either side.
          </Text>
        </div>

        {/* Each stage hangs off its own heavy rule, like the column headings
            on a printed statement. */}
        {/* Subgrid so the numeral, title and body of all three stages share
            rows — the third title wraps to two lines and would otherwise
            drop its body text below the others. */}
        {/* The stages reveal in order rather than as one block: at md they are
            side by side and arrive together, so the stagger is what carries
            01 → 02 → 03. */}
        <ol className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-3 md:grid-rows-[auto_auto_auto]">
          {stages.map((stage, index) => (
            <Reveal
              as="li"
              delay={index * 70}
              key={stage.number}
              className="border-t border-border-strong pt-6 md:row-span-3 md:grid md:grid-rows-subgrid md:gap-y-0"
            >
              <span
                aria-hidden="true"
                className="numeric font-serif text-h2 leading-none text-ink-tertiary"
              >
                {stage.number}
              </span>
              <h3 className="mt-4 text-h3 text-ink">{stage.title}</h3>
              <Text size="sm" className="mt-2">
                {stage.body}
              </Text>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
