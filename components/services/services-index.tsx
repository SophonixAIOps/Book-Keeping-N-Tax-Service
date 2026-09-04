import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { ArrowRightIcon } from "@/components/icons";
import { services } from "@/lib/site-config";
import { serviceDetails } from "./services-data";

const holds = [
  "Organized",
  "Current",
  "Understandable",
  "Prepared",
];

/** A dense two-column index, deliberately unlike the homepage's single column
    of large serif showcase rows — this one is for finding your service, not for
    being introduced to them. Links are in-page anchors, so they are plain
    <a href="#id"> rather than <Link>. */
export function ServicesIndex() {
  return (
    <Section id="what-we-do" spacing="lg" tone="muted" className="scroll-mt-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>What we do</Eyebrow>
            <Heading as="h2" className="mt-4 text-ink">
              Practical financial support, from day-to-day books to tax
              preparation.
            </Heading>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <Text>
              Most businesses need more than one isolated task handled. Books,
              payroll records and tax information all describe the same
              business, so they are kept together and held to the same four
              things.
            </Text>
            <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-5">
              {holds.map((word) => (
                <li
                  key={word}
                  className="text-eyebrow uppercase text-ink-tertiary"
                >
                  {word}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal>
          <ul className="mt-14 grid border-t border-border-strong sm:grid-cols-2">
            {services.map((service) => (
              <li
                key={service.id}
                className="border-b border-border sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
              >
                <a
                  href={`#${service.id}`}
                  className="group flex items-baseline gap-4 py-5 [transition-duration:var(--duration-fast)] transition-colors sm:py-6"
                >
                  <span className="numeric shrink-0 text-caption text-ink-tertiary [transition-duration:var(--duration-fast)] transition-colors group-hover:text-accent">
                    {serviceDetails[service.id].number}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-h3 text-ink">
                      {service.label}
                    </span>
                    <span className="mt-1 block text-body-sm text-ink-secondary">
                      {service.summary}
                    </span>
                  </span>
                  <ArrowRightIcon
                    size={18}
                    className="ml-auto shrink-0 translate-y-1 text-ink-tertiary [transition-duration:var(--duration-fast)] transition-[color,transform] group-hover:translate-x-1 group-hover:text-accent"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
