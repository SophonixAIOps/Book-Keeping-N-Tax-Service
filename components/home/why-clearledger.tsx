import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import {
  LedgerIcon,
  ChartIcon,
  PayrollIcon,
  CalendarIcon,
} from "@/components/icons";

const pillars = [
  {
    icon: LedgerIcon,
    title: "Accurate Records",
    body: "Keep financial information organized and carefully maintained.",
  },
  {
    icon: ChartIcon,
    title: "Reliable Reporting",
    body: "Make financial information easier to understand and use.",
  },
  {
    icon: PayrollIcon,
    title: "Personalized Support",
    body: "Accounting support shaped around your business rather than a fixed process.",
  },
  {
    icon: CalendarIcon,
    title: "Year-Round Guidance",
    body: "Help business owners stay organized beyond tax season.",
  },
];

export function WhyClearLedger() {
  return (
    <Section spacing="lg" bordered>
      <Container>
        <div className="max-w-narrow">
          <Eyebrow>Why ClearLedger</Eyebrow>
          <Heading as="h2" className="mt-4 text-ink">
            Built to give business owners peace of mind.
          </Heading>
        </div>

        <Reveal>
          {/* Rules above each pillar, not four coloured cards. */}
          <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, body }) => (
              <li key={title} className="border-t border-border-ink pt-6">
                <Icon size={22} className="text-accent" />
                <h3 className="mt-4 text-h3 text-ink">{title}</h3>
                <Text size="sm" className="mt-2">
                  {body}
                </Text>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
