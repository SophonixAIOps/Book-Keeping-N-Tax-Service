import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { LedgerLines } from "@/components/financial/ledger-lines";
import { StatementRow } from "@/components/financial/statement-row";
import { SparkLine } from "@/components/financial/spark-line";
import { IllustrativeNote } from "@/components/financial/illustrative-note";
import { cta } from "@/lib/site-config";

/* Invented for demonstration. Shown inside a panel that labels itself as
   illustrative, so it can never read as a real client's figures. */
const summary = [
  { label: "Revenue", value: "$84,240" },
  { label: "Expenses", value: "$31,820" },
];
const netValue = "$52,420";
const trend = [38, 41, 39, 46, 44, 52, 49, 58, 55, 63, 61, 68];

export function HomeHero() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <LedgerLines
        rowHeight={40}
        className="absolute inset-x-0 top-0 h-2/3 opacity-45"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Heading as="h1" variant="display" className="text-ink">
              Clear Books. Confident Business Decisions.
            </Heading>

            <Text size="lg" measure className="mt-6">
              Professional bookkeeping and tax services that give small
              businesses the clarity, accuracy, and confidence to move forward.
            </Text>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={cta.primary.href} size="lg">
                {cta.primary.label}
              </ButtonLink>
              <ButtonLink
                href={cta.secondary.href}
                variant="secondary"
                size="lg"
              >
                {cta.secondary.label}
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <ReportPanel />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** An abstract picture of organised financial information — the state a client
    arrives at, rather than a dashboard they would ever log into. */
function ReportPanel() {
  return (
    <figure className="rounded-lg border border-border bg-surface shadow-raised">
      <figcaption className="flex items-baseline justify-between gap-4 border-b border-border px-6 py-4">
        <span className="text-eyebrow uppercase text-ink-tertiary">
          Monthly summary
        </span>
        <span className="text-caption text-ink-tertiary">Illustrative</span>
      </figcaption>

      <div className="flex flex-col gap-4 px-6 py-6">
        {summary.map((row) => (
          <StatementRow key={row.label} label={row.label} value={row.value} />
        ))}

        <hr className="border-t border-border-strong" />

        <StatementRow label="Net" value={netValue} emphasis />
      </div>

      <div className="border-t border-border px-6 py-6">
        <SparkLine data={trend} height={72} />
        <p className="mt-3 text-caption text-ink-tertiary">
          Twelve months of recorded activity
        </p>
      </div>

      <div className="border-t border-border px-6 py-4">
        <IllustrativeNote />
      </div>
    </figure>
  );
}
