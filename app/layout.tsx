import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/site-config";
import { siteTitle, siteUrl } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/* Social images are deliberately absent, and `metadataBase` only appears once
   `NEXT_PUBLIC_SITE_URL` is supplied at build time: this demo has no canonical
   domain yet, and inventing one would put a fictional URL in the markup. */
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: siteTitle,
    template: `%s — ${siteConfig.legalName}`,
  },
  description: siteConfig.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  /* `globals.css` sets `scroll-behavior: smooth` for in-page anchors. Next 16 no
     longer neutralises that during route transitions unless it is told to, so
     without `data-scroll-behavior` a route change animates the scroll to top. */
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main-content"
          className="absolute left-4 top-4 z-60 inline-flex h-11 -translate-y-24 items-center rounded-md border border-border-ink bg-surface px-4 text-button text-ink transition-transform [transition-duration:var(--duration-fast)] focus-visible:translate-y-0"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
