import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Heading, Text } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button";
import { RecordsState } from "./service-visuals";
import { ServiceNumber, AudienceTags, BenefitList } from "./service-section";
import { serviceById, serviceDetails } from "./services-data";
import { cta } from "@/lib/site-config";

const id = "catch-up-bookkeeping";

/** Catch-up is the one service someone arrives at because something is wrong,
    so it gets its own composition: a full-width before/after instead of the
    paired column layout the other five share, and the reassurance placed
    before the ask. */
export function ServiceCatchUp() {
  const service = serviceById[id];
  const detail = serviceDetails[id];

  return (
    <Section
      id={id}
      aria-labelledby="catch-up-title"
      spacing="lg"
      tone="muted"
      className="scroll-mt-24"
    >
      <Container>
        <div className="max-w-narrow">
          <ServiceNumber>{detail.number}</ServiceNumber>
          <Heading as="h2" id="catch-up-title" className="mt-5 text-ink">
            {service.label}
          </Heading>
          <Text size="lg" className="mt-5">
            {detail.description}
          </Text>
          <AudienceTags items={detail.audience} className="mt-7" />
        </div>

        <Reveal className="mt-14">
          <RecordsState />
        </Reveal>

        <div className="mt-16 grid gap-10 border-t border-border-strong pt-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h3 className="text-h4 text-ink">When this may be appropriate</h3>
            <ul className="mt-4 grid border-t border-border sm:grid-cols-2 sm:gap-x-8">
              {detail.coverage.map((item) => (
                <li
                  key={item}
                  className="border-b border-border py-3 text-body-sm text-ink-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-caption text-ink-tertiary">{detail.note}</p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="text-h4 text-ink">What it helps with</h3>
            <BenefitList items={detail.benefits} className="mt-4" />
          </div>
        </div>

        <div className="mt-14 border-t border-border-ink pt-8 sm:flex sm:items-end sm:justify-between sm:gap-10">
          <p className="max-w-narrow font-serif text-h3 font-normal text-ink">
            Let’s understand where things stand and determine what needs to be
            brought up to date.
          </p>
          <div className="mt-7 shrink-0 sm:mt-0">
            <ButtonLink href={cta.primary.href} variant="secondary">
              {detail.cta}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
