import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/typography";
import { Wordmark } from "@/components/layout/wordmark";
import { FooterClosing } from "@/components/layout/footer-closing";
import { footerNav, services, contact, siteConfig } from "@/lib/site-config";

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
        <FooterClosing />

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
            {/* Listed, not linked. Both values are non-routable placeholders,
                so a `tel:`/`mailto:` here would hand the visitor a channel
                that cannot answer — the Contact page says as much in words. */}
            <ul className="mt-5 flex flex-col gap-3">
              <li className="text-body-sm text-ink-inverse/75">
                {contact.phone}
              </li>
              <li className="text-body-sm text-ink-inverse/75">
                {contact.email}
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

            {/* No service-area line: `location.serviceArea` is null until a
                real one exists, and an unconfirmed one printed here reads as a
                vague claim rather than an absent fact. */}
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
