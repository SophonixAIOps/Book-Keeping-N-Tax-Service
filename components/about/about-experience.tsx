import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

/* Confidentiality is stated as a professional standard for how information is
   handled. No certification, audit, insurance or security guarantee is claimed,
   because none has been established for this demonstration firm. */
const expectations = [
  {
    title: "Straightforward Communication",
    body: "Financial matters explained in plain terms, with jargon left out unless it is genuinely the clearest word for the thing.",
  },
  {
    title: "Organized Records",
    body: "Information kept structured and easy to work with, so it can be found at the point it is actually needed.",
  },
  {
    title: "Thoughtful Support",
    body: "Work shaped around the situation the business is actually in, rather than a standard package applied to everyone.",
  },
  {
    title: "Professional Confidentiality",
    body: "Financial information treated as confidential and handled with care and discretion.",
  },
  {
    title: "Practical Guidance",
    body: "Help understanding what the records show and what may deserve attention next.",
  },
];

export function AboutExperience() {
  return (
    <Section spacing="lg" bordered>
      <Container>
        <div className="max-w-narrow">
          <Eyebrow>The experience</Eyebrow>
          <Heading as="h2" className="mt-4 text-ink">
            Clear communication. Organized work. No unnecessary complexity.
          </Heading>
        </div>

        <Reveal>
          <ul className="mt-14 border-t border-border">
            {expectations.map((item) => (
              <li
                key={item.title}
                className="grid gap-x-8 gap-y-1.5 border-b border-border py-7 md:grid-cols-12 md:items-baseline"
              >
                <h3 className="text-h3 text-ink md:col-span-4">{item.title}</h3>
                <Text size="sm" className="md:col-span-6 md:col-start-6">
                  {item.body}
                </Text>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
