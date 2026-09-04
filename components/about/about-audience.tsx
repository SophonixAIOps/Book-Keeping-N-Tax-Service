import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { ArrowRightIcon } from "@/components/icons";

/* Positioning, not proof: these describe situations the work is shaped around.
   No client counts, names or industries served are claimed. */
const audiences = [
  {
    title: "Small Businesses",
    body: "Owners who need organized books and a clearer view of where the business stands.",
  },
  {
    title: "Freelancers",
    body: "Independent professionals who need their business activity kept in order.",
  },
  {
    title: "Contractors",
    body: "Businesses with project-based or uneven financial activity across the year.",
  },
  {
    title: "Startups",
    body: "Growing businesses establishing financial foundations they can rely on later.",
  },
  {
    title: "Landlords",
    body: "Property owners who need rental-related records kept separate and current.",
  },
  {
    title: "Individuals",
    body: "People who need help preparing and organizing their financial information.",
  },
];

export function AboutAudience() {
  return (
    <Section spacing="lg" tone="accentSoft">
      <Container>
        <div className="max-w-narrow">
          <Eyebrow>Who we help</Eyebrow>
          <Heading as="h2" className="mt-4 text-ink">
            Built around the realities of small business.
          </Heading>
          <Text size="lg" className="mt-5">
            The practice is shaped around owner-led businesses and individuals
            who need their financial information kept in order. These are the
            situations the work is built for — not a closed list.
          </Text>
        </div>

        <Reveal>
          {/* Deliberately the lightest composition on the page: no rules, no
              numbers, just a compact glossary of who the work is for. */}
          <dl className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((audience) => (
              <div key={audience.title}>
                <dt className="text-h4 text-ink">{audience.title}</dt>
                <dd className="mt-2 text-body-sm text-ink-secondary">
                  {audience.body}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Link
          href="/services"
          className="group mt-12 inline-flex items-center gap-2 text-h4 text-accent transition-colors [transition-duration:var(--duration-fast)] hover:text-accent-hover"
        >
          See what each service involves
          <ArrowRightIcon
            size={18}
            className="transition-transform [transition-duration:var(--duration-fast)] [transition-timing-function:var(--ease-out-soft)] group-hover:translate-x-1"
          />
        </Link>
      </Container>
    </Section>
  );
}
