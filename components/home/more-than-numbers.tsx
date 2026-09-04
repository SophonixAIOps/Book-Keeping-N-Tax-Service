import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { FigureStat } from "@/components/financial/figure-stat";
import { StatementRow } from "@/components/financial/statement-row";
import { SparkLine } from "@/components/financial/spark-line";
import { IllustrativeNote } from "@/components/financial/illustrative-note";

/* Invented figures, presented under an explicit "illustrative" label. */
const statement = [
  { label: "Revenue", value: "$84,240" },
  { label: "Operating expenses", value: "$24,610" },
  { label: "Payroll", value: "$7,210" },
];
const movement = [44, 47, 45, 51, 49, 56, 54, 60, 58, 64, 62, 69];

const clarifies = [
  "Where money is actually going",
  "What the business is earning",
  "What needs attention this month",
  "What needs to be prepared for",
  "How the business is performing over time",
];

export function MoreThanNumbers() {
  return (
    <Section spacing="lg" tone="muted">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Open editorial spread rather than a second bordered card. The
              figure leads on desktop, but stacks below the copy on mobile so
              the section is never introduced by an unexplained chart. */}
          <Reveal className="order-2 lg:order-1 lg:col-span-6">
            <MonthlyView />
          </Reveal>

          <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
            <Eyebrow>More than numbers</Eyebrow>
            <Heading as="h2" className="mt-4 text-ink">
              Your books should help you understand your business — not just
              record it.
            </Heading>
            <Text className="mt-5">
              Accurate bookkeeping is worth the effort because of what it lets
              you see. When records are current and correctly categorized, the
              month stops being a guess.
            </Text>

            <ul className="mt-8 border-t border-border-strong">
              {clarifies.map((item) => (
                <li
                  key={item}
                  className="border-b border-border py-3 text-body-sm text-ink-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function MonthlyView() {
  // No ledger rules here on purpose: this figure is already dense with leader
  // dots and rules, and a second grid behind it cuts through the sparkline.
  return (
    <figure>
      <figcaption className="text-eyebrow uppercase text-ink-tertiary">
        Illustrative monthly view
      </figcaption>

      <div className="mt-6 flex flex-wrap items-start gap-x-12 gap-y-6">
        <FigureStat
          value="$52,420"
          label="Net for the month"
          delta="8.2%"
          direction="up"
        />
        <FigureStat value="$31,820" label="Total expenses" />
      </div>

      <div className="mt-9 flex flex-col gap-4">
        {statement.map((row) => (
          <StatementRow key={row.label} label={row.label} value={row.value} />
        ))}
      </div>

      <div className="mt-9 border-t border-border-strong pt-6">
        <SparkLine data={movement} height={80} />
        <p className="mt-3 text-caption text-ink-tertiary">
          Monthly movement across the year
        </p>
      </div>

      <IllustrativeNote className="mt-6" />
    </figure>
  );
}
