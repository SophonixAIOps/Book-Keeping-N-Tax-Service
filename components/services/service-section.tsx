import type { ComponentProps, ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Heading, Text } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { cta, type ServiceId } from "@/lib/site-config";
import { serviceById, serviceDetails } from "./services-data";

export function ServiceNumber({ children }: { children: string }) {
  return (
    <p className="numeric border-t border-border-ink pt-4 text-eyebrow text-accent">
      {children}
    </p>
  );
}

/** Squared, hairline labels — contextual audience tags, not market claims and
    not SaaS pills. */
export function AudienceTags({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-xs border border-border-strong px-2.5 py-1 text-eyebrow uppercase text-ink-tertiary"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Benefits carry a check; coverage is a plain hairline list. The two are
    visually distinct on purpose so they never read as the same list twice. */
export function BenefitList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-body-sm text-ink-secondary">
          <CheckIcon size={16} className="mt-1 shrink-0 text-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CoverageList({
  items,
  label,
  className,
}: {
  items: string[];
  label: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-h4 text-ink">{label}</h3>
      <ul className="mt-4 border-t border-border">
        {items.map((item) => (
          <li
            key={item}
            className="border-b border-border py-3 text-body-sm text-ink-secondary"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

type ServiceSectionProps = {
  id: ServiceId;
  tone?: ComponentProps<typeof Section>["tone"];
  /** `split` pairs copy with a visual; `open` is a wide editorial band. */
  layout?: "split" | "open";
  visual?: ReactNode;
  /** Which side the visual sits on at `lg` and up. Alternated by the page so
      six consecutive sections never share one rhythm. */
  visualSide?: "start" | "end";
  coverageLabel?: string;
};

export function ServiceSection({
  id,
  tone = "canvas",
  layout = "split",
  visual,
  visualSide = "end",
  coverageLabel = "What it can include",
}: ServiceSectionProps) {
  const service = serviceById[id];
  const detail = serviceDetails[id];
  const headingId = `${id}-title`;

  const intro = (
    <>
      <ServiceNumber>{detail.number}</ServiceNumber>
      <Heading as="h2" id={headingId} className="mt-5 text-ink">
        {service.label}
      </Heading>
      <Text size="lg" className="mt-5">
        {detail.description}
      </Text>
    </>
  );

  // Every service CTA lands on Contact; the anchored `service.href` is for
  // navigating *to* this section, not away from it.
  const ctaButton = (
    <ButtonLink href={cta.primary.href} variant="secondary">
      {detail.cta}
    </ButtonLink>
  );

  if (layout === "open") {
    return (
      <Section
        id={id}
        aria-labelledby={headingId}
        spacing="lg"
        tone={tone}
        className="scroll-mt-24"
      >
        <Container>
          {/* The open layout keeps its full-width band below, but pairs the
              intro with a figure when one is supplied — otherwise the right
              half of the section is simply empty above the band. */}
          <div
            className={cn(
              visual ? "grid gap-12 lg:grid-cols-12 lg:gap-16" : undefined,
            )}
          >
            <div className={visual ? "lg:col-span-6" : "max-w-narrow"}>
              {intro}
              <AudienceTags items={detail.audience} className="mt-7" />
            </div>

            {visual && (
              <Reveal className="lg:col-span-5 lg:col-start-8">{visual}</Reveal>
            )}
          </div>

          <Reveal>
            <div className="mt-14 grid gap-10 border-t border-border-strong pt-10 lg:grid-cols-3 lg:gap-12">
              <CoverageList items={detail.coverage} label={coverageLabel} />
              <div>
                <h3 className="text-h4 text-ink">What it helps with</h3>
                <BenefitList items={detail.benefits} className="mt-4" />
              </div>
              <div>
                <h3 className="text-h4 text-ink">Where to start</h3>
                <Text size="sm" className="mt-4">
                  The right level of support depends on how the business runs
                  day to day. A short conversation is usually enough to work
                  that out.
                </Text>
                <div className="mt-6">{ctaButton}</div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    );
  }

  const visualFirst = visualSide === "start";

  return (
    <Section
      id={id}
      aria-labelledby={headingId}
      spacing="lg"
      tone={tone}
      className="scroll-mt-24"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div
            className={cn(
              "order-1 lg:col-span-5",
              visualFirst ? "lg:order-2 lg:col-start-8" : "lg:order-1",
            )}
          >
            {intro}
            <AudienceTags items={detail.audience} className="mt-7" />

            <h3 className="mt-10 text-h4 text-ink">What it helps with</h3>
            <BenefitList items={detail.benefits} className="mt-4" />

            <div className="mt-9">{ctaButton}</div>
          </div>

          <Reveal
            className={cn(
              "order-2 lg:col-span-6",
              visualFirst ? "lg:order-1 lg:col-start-1" : "lg:col-start-7",
            )}
          >
            {visual}
            <CoverageList
              items={detail.coverage}
              label={coverageLabel}
              className={visual ? "mt-12" : undefined}
            />
            {detail.note ? (
              <p className="mt-5 text-caption text-ink-tertiary">
                {detail.note}
              </p>
            ) : null}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
