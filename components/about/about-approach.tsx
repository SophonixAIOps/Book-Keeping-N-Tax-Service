import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { StatementRow } from "@/components/financial/statement-row";
import { IllustrativeNote } from "@/components/financial/illustrative-note";
import { ArrowRightIcon } from "@/components/icons";

/* One invented month, carried through all four stages. These are the same five
   entries the services page shows as a ledger extract: the site keeps a single
   illustrative month rather than inventing fresh numbers per page, so a reader
   who notices the repetition finds consistency instead of contradiction.

   The arithmetic resolves — 6,950 − 84 − 1,340 − 218.50 = 5,307.50 — and money
   out is in parentheses, the ordinary ledger convention used site-wide. */
const captured = [
  { date: "03/04", description: "Client deposit", amount: "4,200.00" },
  { date: "03/07", description: "Software subscription", amount: "(84.00)" },
  { date: "03/11", description: "Supplier invoice", amount: "(1,340.00)" },
  { date: "03/15", description: "Client deposit", amount: "2,750.00" },
  { date: "03/22", description: "Utilities", amount: "(218.50)" },
];

const organized = [
  { label: "Income", value: "6,950.00" },
  { label: "Software & tools", value: "(84.00)" },
  { label: "Suppliers", value: "(1,340.00)" },
  { label: "Utilities", value: "(218.50)" },
];

const stages = [
  {
    id: "records",
    title: "Records",
    body: "Financial activity is captured as it happens, so the year never has to be reconstructed from memory.",
    cellLabel: "As captured",
  },
  {
    id: "organization",
    title: "Organization",
    body: "Consistent bookkeeping turns that activity into a foundation that holds together month to month.",
    cellLabel: "As organized",
  },
  {
    id: "understanding",
    title: "Understanding",
    body: "Once information is organized it can be read: what came in, what went out, and what changed.",
    cellLabel: "As understood",
  },
  {
    id: "preparedness",
    title: "Preparedness",
    body: "Reporting, tax preparation and business decisions all draw on the same organized records.",
    cellLabel: "What it supports",
  },
] as const;

/** The financial expression of one stage. Each cell shows the same month at a
    different depth of resolution — five raw entries, then four categories, then
    a single figure, then a sentence. The last step is deliberately not a number:
    what the month supports is a decision, and inventing a figure for it would be
    fabricating an outcome. */
function StageCell({ id }: { id: (typeof stages)[number]["id"] }) {
  if (id === "records") {
    return (
      <ul className="border-t border-border">
        {captured.map((row) => (
          <li
            key={row.date + row.description}
            className="flex items-baseline gap-3 border-b border-border py-2.5"
          >
            <span className="numeric shrink-0 text-caption text-ink-tertiary">
              {row.date}
            </span>
            <span className="grow text-body-sm text-ink-secondary">
              {row.description}
            </span>
            <span className="numeric shrink-0 text-body-sm text-ink">
              {row.amount}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  if (id === "organization") {
    return (
      <div className="flex flex-col gap-3.5">
        {organized.map((row) => (
          <StatementRow key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
    );
  }

  if (id === "understanding") {
    return (
      <div className="flex items-baseline justify-between gap-4 border-t border-border-strong pt-5">
        <span className="text-body-sm text-ink-secondary">
          Net for the month
        </span>
        <span className="numeric font-serif text-figure text-ink">
          5,307.50
        </span>
      </div>
    );
  }

  return (
    <Text size="sm">
      The same figures support the quarterly report, the amount to set aside for
      tax, and the decision about whether the next purchase can be brought
      forward.
    </Text>
  );
}

/** The page's one financial composition. The four stages were previously prose
    alone in a narrow column, which left the site's central argument — records
    become understanding — stated but never shown. Each stage now carries the
    same month at its own depth of resolution, so the progression is visible
    rather than asserted. */
export function AboutApproach() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="max-w-narrow">
          <Eyebrow>Our approach</Eyebrow>
          <Heading as="h2" className="mt-4 text-ink">
            Accounting is more useful when it helps you understand the business
            behind the numbers.
          </Heading>
          <Text size="lg" className="mt-5">
            Each stage depends on the one before it. Skip the first and the last
            becomes guesswork.
          </Text>
        </div>

        <Reveal className="mt-14">
          <p className="text-eyebrow uppercase text-ink-tertiary">
            The same illustrative month, at each stage
          </p>

          <ol className="mt-8">
            {stages.map((stage, index) => (
              <li key={stage.id}>
                {/* Decorative: the ordered list and the copy already carry the
                    progression. Kept from the original composition because the
                    turned arrow is what makes this read as a sequence rather
                    than four unrelated bands. */}
                {index > 0 && (
                  <ArrowRightIcon
                    size={18}
                    className="my-7 rotate-90 text-accent"
                  />
                )}
                <div className="grid gap-x-8 gap-y-5 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <Heading as="h3" variant="h2" className="text-ink">
                      {stage.title}
                    </Heading>
                    <Text className="mt-3">{stage.body}</Text>
                  </div>

                  <div className="lg:col-span-6 lg:col-start-7">
                    <p className="text-eyebrow uppercase text-ink-tertiary">
                      {stage.cellLabel}
                    </p>
                    <div className="mt-4">
                      <StageCell id={stage.id} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <IllustrativeNote className="mt-10" />
        </Reveal>
      </Container>
    </Section>
  );
}
