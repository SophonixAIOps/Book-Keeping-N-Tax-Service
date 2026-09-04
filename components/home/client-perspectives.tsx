import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

/* Written to describe the outcome the practice aims for. They are not quotes
   from real people, and the section says so in visible copy — no names,
   companies, photographs, logos or ratings are attached to them. */
const perspectives = [
  "I finally have a clearer picture of where the business stands.",
  "Having everything organized makes tax preparation much less stressful.",
  "I spend less time sorting through records and more time running the business.",
];

export function ClientPerspectives() {
  return (
    <Section spacing="lg" bordered>
      <Container>
        <div className="max-w-narrow">
          <Eyebrow>Illustrative client perspectives</Eyebrow>
          <Heading as="h2" className="mt-4 text-ink">
            The kind of clarity we work toward.
          </Heading>
          <Text className="mt-5">
            ClearLedger is a demonstration site, so there are no verified client
            testimonials to show yet. The statements below are written examples
            of the outcomes the practice aims for.
          </Text>
        </div>

        <Reveal>
          <ul className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-3">
            {perspectives.map((quote) => (
              <li
                key={quote}
                className="flex h-full flex-col border-t border-border-ink pt-6"
              >
                <blockquote className="font-serif text-h2 leading-snug text-ink">
                  {quote}
                </blockquote>
                {/* `mt-auto` keeps the three captions on one line even though
                    the quotes above them run to different depths. */}
                <p className="mt-auto pt-5 text-caption text-ink-tertiary">
                  Illustrative example
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
