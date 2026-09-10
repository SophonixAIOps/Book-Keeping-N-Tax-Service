import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

const steps = [
  {
    title: "Understand Your Business",
    body: "We start by understanding your business, its needs, and where your finances currently stand.",
  },
  {
    title: "Organize Your Finances",
    body: "We establish a clear and organized financial foundation.",
  },
  {
    title: "Keep Everything Up to Date",
    body: "Your records stay maintained and easier to work with throughout the year.",
  },
  {
    title: "Help You Stay Prepared",
    body: "You have clearer financial information when decisions, reporting, or tax preparation require it.",
  },
];

export function ProcessSection() {
  return (
    <Section spacing="lg" tone="accentSoft">
      <Container>
        <div className="max-w-narrow">
          <Eyebrow>Our process</Eyebrow>
          <Heading as="h2" className="mt-4 text-ink">
            A simpler way to stay financially organized.
          </Heading>
        </div>

        {/* Plain wrapper, not a Reveal: the steps below fade individually, and
            nesting them inside a fading parent would multiply the two opacity
            curves and smear the stagger. The rail stays put while the steps
            arrive along it. */}
        <div className="relative mt-14">
          {/* A left rail on mobile becomes one continuous track on desktop:
              a single unbroken rule with a node per step, so the sequence
              reads as a timeline rather than four independent columns. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 hidden border-t border-accent-border lg:block"
          />
          {/* At lg the four steps sit side by side and enter the viewport
              together, so the stagger is what makes them read in order rather
              than as one block. The step is small enough that the last item is
              not left waiting. */}
          <ol className="grid gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {steps.map((step, index) => (
              <Reveal
                as="li"
                delay={index * 70}
                key={step.title}
                className="border-l border-accent-border pl-6 lg:relative lg:border-l-0 lg:pl-0 lg:pt-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-[3px] left-0 hidden size-[7px] rounded-full bg-accent lg:block"
                />
                <span className="numeric font-serif text-h2 text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-h3 text-ink">{step.title}</h3>
                <Text size="sm" className="mt-2">
                  {step.body}
                </Text>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
