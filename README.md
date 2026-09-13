# ClearLedger Accounting

A demonstration website for a fictional small-business bookkeeping and tax practice, built with Next.js (App Router), React and Tailwind CSS. Typography is Instrument Serif for display and Inter for body and UI, both self-hosted through `next/font`.

ClearLedger is not a real firm. The contact details, financial figures and client perspectives on the site are illustrative and are labelled as such in the interface.

## Local development

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run verify:ui` | Browser checks against a running server — layout, keyboard, metadata, schema and copy assertions |

`verify:ui` expects a server on http://127.0.0.1:3000. Point it elsewhere with `BASE_URL`.

## Deployment

`NEXT_PUBLIC_SITE_URL` is required for production canonical URLs, Open Graph URLs, and absolute sitemap URLs.

```env
NEXT_PUBLIC_SITE_URL=https://your-real-deployed-domain.com
```

Set it to the origin the site is actually served from, with no trailing slash.

Without it the build deliberately omits `<link rel="canonical">` and `og:url`, and `sitemap.xml` emits root-relative paths. That is intentional: Next resolves a relative canonical against `metadataBase`, which falls back to localhost, and a localhost canonical in production markup is worse than none at all. The trade-off is that **the sitemap is only valid once the variable is set**, so treat it as a launch requirement rather than an optional extra.

No value is committed, so the default checkout has no origin configured.
