import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { CheckIcon } from "@/components/icons";

/* Values the practice holds itself to — deliberately not proof claims. No
   client counts, ratings, awards or years in business are asserted anywhere. */
const values = ["Accurate", "Organized", "Confidential", "Client-Focused"];

export function TrustStrip() {
  return (
    <Section spacing="sm" tone="muted" bordered>
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-8">
          {values.map((value) => (
            <li
              key={value}
              className="flex items-center gap-2.5 text-body-sm font-medium text-ink"
            >
              <CheckIcon size={16} className="shrink-0 text-accent" />
              {value}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
