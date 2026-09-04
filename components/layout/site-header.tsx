import { Wordmark } from "@/components/layout/wordmark";
import { DesktopNav } from "@/components/navigation/desktop-nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { ButtonLink } from "@/components/ui/button";
import { cta } from "@/lib/site-config";

/** Server component: only the two nav pieces that need pathname or state are
    client components, which keeps the header's JS payload minimal. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-canvas">
      <div className="gutter mx-auto flex h-16 max-w-page items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Main" className="hidden md:block">
          <DesktopNav />
        </nav>

        <div className="hidden md:block">
          <ButtonLink href={cta.primary.href} size="sm">
            {cta.primary.label}
          </ButtonLink>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
