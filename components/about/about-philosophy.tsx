import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

/* Hyphenated compounds are kept unbreakable so narrow viewports cannot split
   them at the hyphen ("Support Over One-" / "Size-Fits-All"). */
const nowrap = (text: string) => (
  <span className="whitespace-nowrap">{text}</span>
);

const beliefs = [
  {
    number: "01",
    title: "Clarity Over Complexity",
    body: "Financial information should be understandable. Terminology has its place, but it should never be the reason an owner cannot tell what their own records say.",
  },
  {
    number: "02",
    title: <>Consistency Over {nowrap("Catch-Up")}</>,
    body: "Records kept steadily through the year are easier to work with than a year reconstructed from memory in March. Consistency is less effort than it looks, and far less than the alternative.",
  },
  {
    number: "03",
    title: <>Support Over {nowrap("One-Size-Fits-All")}</>,
    body: "A contractor, a landlord and a growing studio do not need the same thing. The support should adapt to the situation rather than the situation being fitted to a fixed process.",
  },
];

export function AboutPhilosophy() {
  return (
    <Section spacing="lg" tone="muted">
      <Container>
        <div className="max-w-narrow">
          <Eyebrow>Our philosophy</Eyebrow>
          <Heading as="h2" className="mt-4 text-ink">
            Good accounting should make things clearer.
          </Heading>
        </div>

        <Reveal>
          <ol className="mt-14 border-t border-border-strong">
            {beliefs.map((belief) => (
              <li
                key={belief.number}
                className="grid gap-x-8 gap-y-3 border-b border-border py-10 lg:grid-cols-12 lg:py-12"
              >
                {/* Decorative: the list order already carries the sequence. */}
                <span
                  aria-hidden="true"
                  className="numeric font-serif text-h1 leading-none text-ink-tertiary lg:col-span-2"
                >
                  {belief.number}
                </span>
                <h3 className="font-serif text-h2 leading-tight text-ink lg:col-span-4">
                  {belief.title}
                </h3>
                <Text className="lg:col-span-5 lg:col-start-8">
                  {belief.body}
                </Text>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
