import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { ConsultationForm } from "@/components/contact/consultation-form";
import { contact } from "@/lib/site-config";

const steps = [
  {
    number: "01",
    title: "Tell Us About Your Business",
    body: "A few basic details about your business and current situation.",
  },
  {
    number: "02",
    title: "Share What You Need",
    body: "Which areas of bookkeeping, tax, payroll support, accounting, reporting or catch-up work you are considering.",
  },
  {
    number: "03",
    title: "Discuss the Next Step",
    body: "We can use the information you provide to understand the conversation you need to have next.",
  },
];

export function ContactConsultation() {
  return (
    <Section spacing="lg" tone="muted" bordered>
      <Container>
        {/* Source order puts the form second so it is the next thing after the
            intro on a phone. On desktop the two prose blocks are placed back
            into a single left column beside it. */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:row-start-1">
            <Eyebrow>Consultation</Eyebrow>
            <Heading as="h2" className="mt-4 text-ink">
              Start With a Conversation
            </Heading>
            <Text className="mt-5" measure>
              Every business has a different financial starting point. Share a
              few details about your situation and what you are looking for, and
              we can start the conversation from there.
            </Text>

            {/* Numerals sit inline with the title here. The same three-part
                shape appears again in "What Happens Next", so this one is kept
                compact and the later one is set horizontally. */}
            <ol className="mt-10 border-t border-border">
              {steps.map((step) => (
                <li key={step.number} className="border-b border-border py-5">
                  <h3 className="flex items-baseline gap-3 text-h4 text-ink">
                    <span
                      aria-hidden="true"
                      className="numeric font-serif text-body text-ink-tertiary"
                    >
                      {step.number}
                    </span>
                    {step.title}
                  </h3>
                  <Text size="sm" className="mt-1.5">
                    {step.body}
                  </Text>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-start">
            <div className="rounded-md border border-border bg-surface p-6 sm:p-8">
              <h3 className="text-h3 text-ink">Consultation Inquiry</h3>
              <div className="mt-2">
                <ConsultationForm />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
            <h3 className="text-h3 text-ink">Prefer to Reach Out Directly?</h3>
            <dl className="mt-5 flex flex-col gap-4">
              <div>
                <dt className="text-eyebrow uppercase text-ink-tertiary">
                  Phone
                </dt>
                <dd className="numeric mt-1 text-body text-ink">
                  {contact.phone}
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow uppercase text-ink-tertiary">
                  Email
                </dt>
                <dd className="mt-1 text-body text-ink">{contact.email}</dd>
              </div>
              <div>
                <dt className="text-eyebrow uppercase text-ink-tertiary">
                  Office hours
                </dt>
                {contact.hours.map((entry) => (
                  <dd key={entry.days} className="mt-1 text-body text-ink">
                    {entry.days}
                    <span className="numeric text-ink-tertiary">
                      {" "}
                      — {entry.time}
                    </span>
                  </dd>
                ))}
              </div>
            </dl>

            {/* No service area row: site config still carries it as an
                unconfirmed placeholder, and printing that under a contact
                heading reads as an unfinished page rather than a disclosure. */}
            <Text size="caption" tone="tertiary" className="mt-6">
              ClearLedger is a fictional firm. The phone number and email
              address shown are non-routable placeholders reserved for
              documentation, so they are listed rather than linked.
            </Text>
          </div>
        </div>
      </Container>
    </Section>
  );
}
