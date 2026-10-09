# SAZ Vida — marketing site

The landing site for **SAZ Vida**, one platform for every hospital operation: HR, Audit, Quality, Compliance,
Feedback, Licensify and the Console — one sign-in, one staff list, one audit trail.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion**, exported as a **fully static site**
so it can be hosted anywhere (Netlify, Vercel, Cloudflare Pages, S3, nginx…).

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm start          # preview ./out locally
npm run lint       # type-check
```

Node 20+ is required (22 recommended).

## Configuration

Copy `.env.example` to `.env.local` (or set these in your host's dashboard):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for canonical links, sitemap and Open Graph tags. Defaults to `https://sazvida.com`. |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Where the **Book a pilot** form POSTs JSON (e.g. a [Formspree](https://formspree.io) form URL). Empty = form shows a "not connected" notice. |
| `NEXT_PUBLIC_FORM_ACCESS_KEY` | Optional access key for services that need it in the body (e.g. Web3Forms). |

Contact details (email, phone, address) live in `src/lib/site.ts` and are hidden while empty.

## Deploying

- **Netlify** — connect the repo; `netlify.toml` already sets `npm run build` → `out`.
- **Vercel** — import the repo; Next.js is detected automatically.
- **Anywhere else** — run `npm run build` and upload the `out/` folder. Serve `404.html` for missing pages,
  and serve `opengraph-image` files as `image/png` (Netlify/Vercel configs already do this).

## Project structure

```
src/
  app/                    Routes: /, /apps/[slug], /demo, sitemap, robots, OG images
  components/
    sections/             Home page sections (Hero, Connect, AppsGrid, Console, Roles, …)
    licensify/            Licensify page and its interactive mockups
    mockups/              Reusable HTML "product UI" mockups
    ui/                   Motion primitives (Reveal, Stagger, CountUp) and stage scaling
  lib/
    apps.ts               App catalogue — names, colours, icons, which apps have pages
    licensify.ts          Demo data for the Licensify mockups
    site.ts               Site name, URL, contact details, form endpoint
```

### Adding another app page

1. Build its page component (see `src/components/licensify/LicensifyPage.tsx` as the template).
2. Register it in the `meta` map in `src/app/apps/[slug]/page.tsx`.
3. Set `hasPage: true` for the app in `src/lib/apps.ts` — the nav, footer, apps grid, sitemap and OG image pick it up automatically.

## Design notes

- **Fonts:** Plus Jakarta Sans (headings) and Inter (body), self-hosted via Fontsource — no external font requests.
- **Colours:** brand navy from the logo (`ink-*`), plus one accent per app (`app-*`) used consistently across the site.
- **Motion:** scroll-driven hero ("seven logins → one launcher") and platform section ("islands → connected hub");
  everything respects `prefers-reduced-motion`.
- **SEO:** per-page metadata and canonical URLs, Open Graph images, `sitemap.xml`, `robots.txt`, and JSON-LD
  (`Organization`, `SoftwareApplication`, `BreadcrumbList`, `FAQPage`).
