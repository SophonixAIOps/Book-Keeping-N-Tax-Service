import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { Wordmark } from "@/components/layout/wordmark";
import { ArrowRightIcon } from "@/components/icons";
import {
  footerNav,
  services,
  contact,
  cta,
  siteConfig,
} from "@/lib/site-config";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-eyebrow uppercase text-ink-inverse/50">{children}</h3>
  );
}

const linkStyles =
  "text-body-sm text-ink-inverse/75 transition-colors [transition-duration:var(--duration-fast)] hover:text-ink-inverse";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink-surface text-ink-inverse">
      <Container>
        {/* Deliberately a quiet single line, not a second CTA band: every page
            already closes on a full-weight consultation prompt directly above
            the footer, and two heavy dark bands in a row read as a repeat. */}
        <div className="flex flex-col gap-3 border-b border-ink-inverse/12 py-10 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
          <Heading as="h2" variant="h4" className="text-ink-inverse">
            {cta.closingHeading}
          </Heading>
          <Link
            href={cta.primary.href}
            className="group inline-flex shrink-0 items-center gap-2 text-body-sm text-ink-inverse/75 transition-colors [transition-duration:var(--duration-fast)] hover:text-ink-inverse"
          >
            {cta.primary.label}
            <ArrowRightIcon
              size={16}
              className="transition-transform [transition-duration:var(--duration-fast)] group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Wordmark tone="inverse" />
            <Text size="sm" className="mt-5 max-w-xs text-ink-inverse/60">
              {siteConfig.tagline}
            </Text>
          </div>

          <nav aria-label="Footer">
            <ColumnHeading>Navigate</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {footerNav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkStyles}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnHeading>Services</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link href={service.href} className={linkStyles}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a href={contact.phoneHref} className={linkStyles}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className={linkStyles}>
                  {contact.email}
                </a>
              </li>
            </ul>

            <h4 className="mt-7 text-eyebrow uppercase text-ink-inverse/50">
              Office hours
            </h4>
            <dl className="mt-4 flex flex-col gap-2">
              {contact.hours.map((entry) => (
                <div key={entry.days} className="flex flex-col">
                  <dt className="text-body-sm text-ink-inverse/75">
                    {entry.days}
                  </dt>
                  <dd className="text-caption text-ink-inverse/50 numeric">
                    {entry.time}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-caption text-ink-inverse/50">
              {contact.serviceArea}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-ink-inverse/12 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-ink-inverse/50">
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
          <p className="text-caption text-ink-inverse/50">
            A fictional firm created for demonstration purposes.
          </p>
        </div>
      </Container>
    </footer>
  );
}
