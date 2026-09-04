import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

/* Stated as ordinary circumstances rather than warnings. Nothing here asserts
   a consequence the practice cannot know — no lost money, no risk claims. */
const realities = [
  "Records fall behind during a busy season.",
  "There isn’t always time to maintain everything in-house.",
  "Disorganized records make tax preparation harder than it needs to be.",
  "Scattered or outdated information is difficult to read anything into.",
];

export function AboutPurpose() {
  return (
    <Section spacing="lg" tone="surface" bordered>
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>Why we exist</Eyebrow>
            <Heading as="h2" className="mt-4 text-ink">
              Running a business is demanding enough. Your finances shouldn’t
              add unnecessary complexity.
            </Heading>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Text size="lg">
              Most of the difficulty around financial records has little to do
              with accounting itself. It comes from everything else a business
              needs on any given day — work to deliver, people to pay, decisions
              that cannot wait until the paperwork is sorted.
            </Text>
            <Text className="mt-5">
              So records slip. A month gets skipped, a system changes, receipts
              collect somewhere they were never meant to. None of it is unusual,
              and none of it means a business is being run badly.
            </Text>
          </div>
        </div>

        <Reveal>
          {/* Hung off one common rule with vertical dividers between them,
              like columns on a ruled page rather than four separate blocks. */}
          <ul className="mt-16 grid gap-x-8 gap-y-6 border-t border-border-strong pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {realities.map((item) => (
              <li
                key={item}
                // Items in the first row hang off the band rule itself; only
                // wrapped rows get their own separator.
                className="border-t border-border pt-4 text-body-sm text-ink-secondary first:border-t-0 first:pt-0 sm:nth-2:border-t-0 sm:nth-2:pt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 max-w-narrow">
          <p className="font-serif text-h2 text-ink">
            ClearLedger exists to make financial information easier to
            understand, easier to manage, and less stressful for the people
            running a business.
          </p>
          <Text className="mt-5" measure>
            Not by promising an outcome, but by handling the ordinary work
            carefully: records kept current, questions answered in plain
            language, and a clear view of the financial side of the business
            when it is needed.
          </Text>
        </div>
      </Container>
    </Section>
  );
}
