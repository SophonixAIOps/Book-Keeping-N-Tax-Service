import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { ArrowRightIcon } from "@/components/icons";
import { services, cta } from "@/lib/site-config";

/** A firm's service directory: numbered rows and rules, not a feature grid. */
export function ServicesOverview() {
  return (
    <Section spacing="lg" bordered>
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Eyebrow>What we handle</Eyebrow>
            <Heading as="h2" className="mt-4 text-ink">
              Financial clarity starts with the right foundation.
            </Heading>
          </div>
          <Text measure className="lg:col-span-5">
            We help business owners keep their books organized, stay prepared
            for tax obligations, and understand where the business stands.
          </Text>
        </div>

        <Reveal>
          <ul className="mt-14 border-t border-border">
            {services.map((service, index) => (
              <li key={service.label}>
                <Link
                  href={service.href}
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-2 border-b border-border py-7 transition-colors [transition-duration:var(--duration-fast)] hover:bg-surface-muted lg:grid-cols-[4rem_20rem_1fr_auto] lg:gap-x-8"
                >
                  <span className="numeric text-caption text-ink-tertiary transition-colors [transition-duration:var(--duration-fast)] group-hover:text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="font-serif text-h2 leading-tight text-ink">
                    {service.label}
                  </span>

                  <span className="col-start-2 text-body-sm text-ink-secondary lg:col-start-3 lg:max-w-measure">
                    {service.summary}
                  </span>

                  <ArrowRightIcon
                    size={20}
                    className="col-start-3 row-start-1 self-center text-ink-tertiary transition-[color,transform] [transition-duration:var(--duration-fast)] [transition-timing-function:var(--ease-out-soft)] group-hover:translate-x-1 group-hover:text-accent lg:col-start-4"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Link
          href={cta.secondary.href}
          className="group mt-10 inline-flex items-center gap-2 text-h4 text-accent transition-colors [transition-duration:var(--duration-fast)] hover:text-accent-hover"
        >
          {cta.secondary.label}
          <ArrowRightIcon
            size={18}
            className="transition-transform [transition-duration:var(--duration-fast)] [transition-timing-function:var(--ease-out-soft)] group-hover:translate-x-1"
          />
        </Link>
      </Container>
    </Section>
  );
}
