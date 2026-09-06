import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Heading, Text, Eyebrow } from "@/components/ui/typography";
import { Divider } from "@/components/ui/divider";
import { Reveal } from "@/components/ui/reveal";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { LedgerLines } from "@/components/financial/ledger-lines";
import { FigureStat } from "@/components/financial/figure-stat";
import { StatementRow } from "@/components/financial/statement-row";
import { SparkLine } from "@/components/financial/spark-line";
import { IllustrativeNote } from "@/components/financial/illustrative-note";
import {
  LedgerIcon,
  CalculatorIcon,
  DocumentIcon,
  ChartIcon,
  PayrollIcon,
  TaxIcon,
  BusinessIcon,
  CalendarIcon,
  CheckIcon,
  CheckCircleIcon,
  ShieldIcon,
  ArrowRightIcon,
  TrendUpIcon,
  TrendDownIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "Internal reference for the ClearLedger design system: colour, typography, spacing, surfaces, controls and financial primitives.",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  return (
    <>
      <Section spacing="lg" className="relative overflow-hidden">
        <LedgerLines className="absolute inset-x-0 top-0 h-full opacity-60" />
        <Container className="relative">
          <Eyebrow>ClearLedger Accounting — Phase 0</Eyebrow>
          <Heading as="h1" variant="display" className="mt-5 max-w-narrow">
            Design system reference
          </Heading>
          <Text size="lg" measure className="mt-6">
            The visual foundation for the ClearLedger site: colour, typography,
            spacing, surfaces, controls and the financial visual language. This
            page documents the system — it is not a marketing page.
          </Text>
        </Container>
      </Section>

      <Spec
        id="color"
        title="Colour"
        note="Contrast ratios measured against the ivory canvas."
      >
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          <SwatchGroup title="Surfaces">
            <Swatch className="bg-canvas" name="canvas" hex="#FBFAF6" />
            <Swatch className="bg-surface" name="surface" hex="#FFFFFF" />
            <Swatch
              className="bg-surface-muted"
              name="surface-muted"
              hex="#F3F1EA"
            />
            <Swatch
              className="bg-surface-sunken"
              name="surface-sunken"
              hex="#EDEAE1"
            />
            <Swatch className="bg-ink-surface" name="ink-surface" hex="#141715" />
          </SwatchGroup>

          <SwatchGroup title="Text">
            <Swatch className="bg-ink" name="ink" hex="#1A1C1A" meta="16.1:1" />
            <Swatch
              className="bg-ink-secondary"
              name="ink-secondary"
              hex="#5A5F59"
              meta="6.2:1"
            />
            <Swatch
              className="bg-ink-tertiary"
              name="ink-tertiary"
              hex="#6B7068"
              meta="4.8:1"
            />
            <Swatch
              className="bg-ink-inverse"
              name="ink-inverse"
              hex="#F7F6F1"
            />
          </SwatchGroup>

          <SwatchGroup title="Accent">
            <Swatch
              className="bg-accent"
              name="accent"
              hex="#1F3D2F"
              meta="11.4:1"
            />
            <Swatch
              className="bg-accent-hover"
              name="accent-hover"
              hex="#163024"
            />
            <Swatch
              className="bg-accent-active"
              name="accent-active"
              hex="#0F2419"
            />
            <Swatch
              className="bg-accent-soft"
              name="accent-soft"
              hex="#ECF0EB"
            />
            <Swatch
              className="bg-accent-border"
              name="accent-border"
              hex="#C8D4C7"
            />
          </SwatchGroup>

          <SwatchGroup title="Borders">
            <Swatch className="bg-border" name="border" hex="#E3E0D8" />
            <Swatch
              className="bg-border-strong"
              name="border-strong"
              hex="#CFCBC0"
            />
          </SwatchGroup>

          <SwatchGroup title="Status">
            <Swatch className="bg-positive" name="positive" hex="#2E6B4F" />
            <Swatch className="bg-negative" name="negative" hex="#9A4A32" />
          </SwatchGroup>

          <SwatchGroup title="Disabled">
            <Swatch
              className="bg-disabled-surface"
              name="disabled-surface"
              hex="#E8E5DD"
            />
            <Swatch
              className="bg-disabled-ink"
              name="disabled-ink"
              hex="#9A9D96"
            />
          </SwatchGroup>
        </div>
      </Spec>

      <Spec
        id="typography"
        title="Typography"
        note="Instrument Serif for display through h2; Inter for h3, h4, UI and body. Sizes are fluid via clamp()."
        tone="muted"
      >
        <div className="flex flex-col gap-8">
          <TypeRow token="text-display · serif">
            <span className="font-serif text-display">Financial clarity</span>
          </TypeRow>
          <TypeRow token="text-h1 · serif">
            <span className="font-serif text-h1">
              Bookkeeping, done properly
            </span>
          </TypeRow>
          <TypeRow token="text-h2 · serif">
            <span className="font-serif text-h2">
              Services built around your year
            </span>
          </TypeRow>
          <TypeRow token="text-h3 · sans 600">
            <span className="text-h3">Monthly reconciliation</span>
          </TypeRow>
          <TypeRow token="text-h4 · sans 600">
            <span className="text-h4">What is included</span>
          </TypeRow>
          <TypeRow token="text-body-lg">
            <p className="text-body-lg text-ink-secondary max-w-measure">
              Clear books, filed on time, explained in plain language.
            </p>
          </TypeRow>
          <TypeRow token="text-body">
            <p className="text-body text-ink-secondary max-w-measure">
              Clear books, filed on time, explained in plain language.
            </p>
          </TypeRow>
          <TypeRow token="text-body-sm">
            <p className="text-body-sm text-ink-secondary max-w-measure">
              Clear books, filed on time, explained in plain language.
            </p>
          </TypeRow>
          <TypeRow token="text-eyebrow">
            <Eyebrow>Tax preparation</Eyebrow>
          </TypeRow>
          <TypeRow token="text-caption">
            <p className="text-caption text-ink-tertiary">
              Illustrative example, not a client result.
            </p>
          </TypeRow>
          <TypeRow token="text-figure · serif · tabular">
            <span className="font-serif text-figure numeric">$84,240</span>
          </TypeRow>
        </div>
      </Spec>

      <Spec
        id="buttons"
        title="Buttons"
        note="Primary CTA is 'Schedule a Consultation'; secondary is 'Explore Our Services'. Heights of 44px and above meet touch-target guidance."
      >
        <div className="flex flex-col gap-10">
          <div>
            <SpecLabel>Variants</SpecLabel>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Schedule a Consultation</Button>
              <Button variant="secondary">Explore Our Services</Button>
              <Button variant="ghost">
                View pricing
                <ArrowRightIcon size={16} />
              </Button>
            </div>
          </div>

          <div>
            <SpecLabel>Sizes</SpecLabel>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small · 36px</Button>
              <Button size="md">Medium · 44px</Button>
              <Button size="lg">Large · 48px</Button>
            </div>
          </div>

          <div>
            <SpecLabel>States</SpecLabel>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
            </div>
            <Text size="caption" tone="tertiary" className="mt-3">
              Hover, active and focus states are interactive — tab through the
              row above to see the focus ring.
            </Text>
          </div>

          <div>
            <SpecLabel>Mobile behaviour</SpecLabel>
            <div className="max-w-xs">
              <Button fullWidth size="lg">
                Schedule a Consultation
              </Button>
            </div>
            <Text size="caption" tone="tertiary" className="mt-3">
              Primary CTAs go full-width below the sm breakpoint.
            </Text>
          </div>

          <div className="on-dark rounded-lg bg-ink-surface p-8">
            <SpecLabel className="text-ink-inverse/60">
              On inverted surfaces
            </SpecLabel>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Schedule a Consultation</Button>
              <Button variant="inverse">Explore Our Services</Button>
            </div>
          </div>
        </div>
      </Spec>

      <Spec
        id="surfaces"
        title="Surfaces & borders"
        note="Hairline borders carry the structure. Shadows stay minimal and radii small."
        tone="muted"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SurfaceCard
            title="Hairline border"
            className="border border-border bg-surface"
          />
          <SurfaceCard
            title="Strong border"
            className="border border-border-strong bg-surface"
          />
          <SurfaceCard
            title="Accent wash"
            className="border border-accent-border bg-accent-soft"
          />
          <SurfaceCard
            title="Subtle shadow"
            className="border border-border bg-surface shadow-subtle"
          />
          <SurfaceCard
            title="Raised shadow"
            className="border border-border bg-surface shadow-raised"
          />
          <SurfaceCard
            title="Sunken"
            className="border border-border bg-surface-sunken"
          />
        </div>

        <div className="mt-10">
          <SpecLabel>Radius scale</SpecLabel>
          <div className="flex flex-wrap items-end gap-5">
            {(
              [
                ["rounded-xs", "2px"],
                ["rounded-sm", "3px"],
                ["rounded-md", "4px"],
                ["rounded-lg", "6px"],
                ["rounded-xl", "10px"],
              ] as const
            ).map(([cls, size]) => (
              <div key={cls} className="flex flex-col items-center gap-2">
                <div
                  className={`size-14 border border-border-strong bg-surface ${cls}`}
                />
                <span className="text-caption text-ink-tertiary numeric">
                  {size}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <SpecLabel>Editorial rules</SpecLabel>
          <div className="flex flex-col gap-4">
            <Divider weight="hairline" />
            <Divider weight="strong" />
            <Divider weight="ink" />
          </div>
        </div>
      </Spec>

      <Spec
        id="financial"
        title="Financial visual language"
        note="Storytelling motifs drawn from ledgers and statements — deliberately not a dashboard."
      >
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SpecLabel>Figures</SpecLabel>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <FigureStat
                value="$84,240"
                label="Revenue tracked"
                delta="12.4%"
                direction="up"
              />
              <FigureStat
                value="$31,820"
                label="Expenses categorised"
                delta="3.1%"
                direction="down"
              />
              <FigureStat value="$52,420" label="Net position" />
            </div>
            <IllustrativeNote className="mt-6" />
          </div>

          <div>
            <SpecLabel>Statement rows</SpecLabel>
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-7">
              <StatementRow label="Gross revenue" value="$84,240" />
              <StatementRow label="Operating expenses" value="$31,820" />
              <Divider />
              <StatementRow label="Net position" value="$52,420" emphasis />
            </div>
            <IllustrativeNote className="mt-4" />
          </div>

          <div>
            <SpecLabel>Trend line</SpecLabel>
            <div className="rounded-lg border border-border bg-surface p-7">
              <Eyebrow>Monthly activity</Eyebrow>
              <SparkLine
                className="mt-5"
                data={[18, 24, 21, 30, 27, 36, 33, 42, 45, 41, 52, 58]}
                height={72}
              />
            </div>
            <IllustrativeNote className="mt-4" />
          </div>

          <div>
            <SpecLabel>Ledger ruling</SpecLabel>
            <div className="relative h-52 overflow-hidden rounded-lg border border-border bg-surface">
              <LedgerLines className="absolute inset-0" fade={false} />
              <div className="relative p-7">
                <Eyebrow>Accounting paper</Eyebrow>
                <Text size="sm" className="mt-3 max-w-xs">
                  Used as a background texture behind editorial content.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Spec>

      <Spec
        id="icons"
        title="Iconography"
        note="Linear, 24px grid, 1.5 stroke, currentColor. Decorative by default."
        tone="muted"
      >
        <div className="grid grid-cols-3 gap-y-8 sm:grid-cols-5 lg:grid-cols-7">
          {(
            [
              [LedgerIcon, "ledger"],
              [CalculatorIcon, "calculator"],
              [DocumentIcon, "document"],
              [ChartIcon, "chart"],
              [PayrollIcon, "payroll"],
              [TaxIcon, "tax"],
              [BusinessIcon, "business"],
              [CalendarIcon, "calendar"],
              [CheckIcon, "check"],
              [CheckCircleIcon, "check-circle"],
              [ShieldIcon, "shield"],
              [ArrowRightIcon, "arrow-right"],
              [TrendUpIcon, "trend-up"],
              [TrendDownIcon, "trend-down"],
            ] as const
          ).map(([IconComponent, name]) => (
            <div
              key={name}
              className="flex flex-col items-center gap-3 text-accent"
            >
              <IconComponent size={24} />
              <span className="text-caption text-ink-tertiary">{name}</span>
            </div>
          ))}
        </div>
      </Spec>

      <Spec
        id="forms"
        title="Form controls"
        note="Labels are always visible; hints and errors are wired to controls via aria-describedby."
      >
        <div className="grid max-w-narrow gap-6 md:grid-cols-2">
          <Field label="Full name" htmlFor="ds-name">
            <Input id="ds-name" name="name" placeholder="Jane Whitfield" />
          </Field>

          <Field label="Business type" htmlFor="ds-type">
            <Select id="ds-type" name="type" defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              <option value="sole">Sole proprietor</option>
              <option value="llc">LLC</option>
              <option value="scorp">S-Corp</option>
            </Select>
          </Field>

          <Field
            label="Email address"
            htmlFor="ds-email"
            hint="Used only to reply to your enquiry."
            className="md:col-span-2"
          >
            <Input
              id="ds-email"
              name="email"
              type="email"
              placeholder="jane@example.com"
              aria-describedby="ds-email-hint"
            />
          </Field>

          <Field
            label="Phone"
            htmlFor="ds-phone"
            error="Enter a valid phone number."
            className="md:col-span-2"
          >
            <Input
              id="ds-phone"
              name="phone"
              defaultValue="555"
              aria-invalid="true"
              aria-describedby="ds-phone-error"
            />
          </Field>

          <Field
            label="How can we help?"
            htmlFor="ds-message"
            className="md:col-span-2"
          >
            <Textarea
              id="ds-message"
              name="message"
              placeholder="Tell us about your business."
            />
          </Field>

          <Field
            label="Disabled field"
            htmlFor="ds-disabled"
            className="md:col-span-2"
          >
            <Input id="ds-disabled" disabled defaultValue="Unavailable" />
          </Field>
        </div>
      </Spec>

      <Spec
        id="layout"
        title="Layout"
        note="Fluid gutters from 20px to 40px; four content widths."
        tone="muted"
      >
        <div className="flex flex-col gap-4">
          {(
            [
              ["wide", "1360px", "max-w-wide"],
              ["page", "1200px", "max-w-page"],
              ["narrow", "832px", "max-w-narrow"],
              ["measure", "608px", "max-w-measure"],
            ] as const
          ).map(([name, size, cls]) => (
            <div
              key={name}
              className={`${cls} border border-accent-border bg-accent-soft px-4 py-3`}
            >
              <span className="text-caption text-ink-secondary numeric">
                {name} · {size}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <SpecLabel>Section rhythm</SpecLabel>
          <Text size="sm" measure>
            Vertical padding scales fluidly: section-sm 40→64px, section-md
            56→96px, section-lg 72→128px.
          </Text>
        </div>
      </Spec>

      <Spec
        id="motion"
        title="Motion"
        note="Reveals are subtle and short. Everything below is disabled automatically under prefers-reduced-motion."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {[0, 90, 180].map((delay) => (
            <Reveal
              key={delay}
              delay={delay}
              className="rounded-lg border border-border bg-surface p-7"
            >
              <Eyebrow>Delay {delay}ms</Eyebrow>
              <Text size="sm" className="mt-3">
                Fades up 12px over 620ms on a soft ease-out.
              </Text>
            </Reveal>
          ))}
        </div>
      </Spec>

      <Section spacing="sm" tone="ink" bordered>
        <Container>
          <Text size="sm" tone="inverse" className="opacity-70">
            ClearLedger Accounting is a fictional firm created for demonstration
            purposes. All figures on this page are illustrative.
          </Text>
        </Container>
      </Section>
    </>
  );
}

/* ---------- page-local documentation helpers ---------- */

function Spec({
  id,
  title,
  note,
  tone = "canvas",
  children,
}: {
  id: string;
  title: string;
  note?: string;
  tone?: "canvas" | "muted";
  children: React.ReactNode;
}) {
  return (
    <Section spacing="md" tone={tone} bordered id={id}>
      <Container>
        <Heading as="h2" variant="h2">
          {title}
        </Heading>
        {note && (
          <Text size="sm" measure className="mt-3">
            {note}
          </Text>
        )}
        <div className="mt-10">{children}</div>
      </Container>
    </Section>
  );
}

function SpecLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-eyebrow uppercase text-ink-tertiary mb-5 ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

function SwatchGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <SpecLabel>{title}</SpecLabel>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function Swatch({
  className,
  name,
  hex,
  meta,
}: {
  className: string;
  name: string;
  hex: string;
  meta?: string;
}) {
  return (
    <div className="flex items-center gap-3.5">
      <span
        className={`size-9 shrink-0 rounded-sm border border-border-strong ${className}`}
      />
      <span className="flex flex-col">
        <span className="text-body-sm text-ink">{name}</span>
        <span className="text-caption text-ink-tertiary numeric">
          {hex}
          {meta ? ` · ${meta}` : ""}
        </span>
      </span>
    </div>
  );
}

function TypeRow({
  token,
  children,
}: {
  token: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-[13rem_1fr] lg:items-baseline lg:gap-8">
      <span className="text-caption text-ink-tertiary numeric">{token}</span>
      <div>{children}</div>
    </div>
  );
}

function SurfaceCard({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  return (
    <div className={`rounded-lg p-7 ${className}`}>
      <span className="text-body-sm text-ink">{title}</span>
    </div>
  );
}
