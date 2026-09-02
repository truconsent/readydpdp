# DPDP Untangled

**DPDP, untangled.**

DPDP Untangled (formerly ReadyDPDP) is a consulting and consent-technology
practice for DPDP Act 2023 compliance — a sister brand to
[truConsent](https://truconsent.io) (India's Privacy Intelligence Suite,
IITM-incubated). It combines an advisory layer — DPDP Gap Assessments,
DPO-as-a-Service, consent architecture, and the structured **DPDR** (Digital
Personal Data Register) and **CDJR** (Customer Data Journey Registry)
methodology — with a real productised offering: an outright-ownable
**Consent Management Platform, sold as a codebase and deployment** rather than
a rented subscription. Footer byline: "Powered by truConsent."

This repository contains a small Node.js static-site **generator**
(`generate.js` + `data/*.js` + `lib/*.js`) and its generated static HTML output
(`docs/`), served directly via GitHub Pages at the custom domain
[dpdpuntangled.com](https://dpdpuntangled.com).

See **[`dpdp-untangled-brand.md`](./dpdp-untangled-brand.md)** for the full
brand reference — wordmark spec, icon SVG path, font scoping rules, colour
table, tagline, service-line taxonomy, and the tonality rule. Read that before
touching `lib/templates.js`, `static/style.css`, or `lib/config.js`.

## Why the name

**DPDP Untangled** frames the practice's actual work: taking a genuinely
tangled compliance problem — scattered consent flows, undocumented data
holdings, a law with its own India-specific structure — and giving an
organisation something operable, not just a policy document. It also reads
naturally across both halves of the business: advisory work untangles a
compliance programme; the Consent Management Platform untangles the
underlying data plumbing itself.

## Structure

```
dpdp-untangled/
├── generate.js          # main generator script — run this to (re)build the site
├── lib/
│   ├── config.js        # site-wide config: brand name, domain, contact details
│   └── templates.js      # HTML layout shell, wordmark/icon lockup, nav, footer, breadcrumb/related-link helpers
├── data/                 # all page content, as plain JS data arrays/objects
│   ├── services.js       # 16 services (15 advisory + the CMP flagship), grouped into 4 service lines
│   ├── readiness.js      # 6 DPDP Readiness Levels (0–5)
│   ├── gapAssessment.js  # Gap Assessment deep-dive sub-pages
│   ├── frameworks.js     # DPDR & CDJR proprietary methodology content
│   ├── industries.js     # 13 industry risk profiles
│   ├── glossary.js       # 68 DPDPA glossary terms
│   ├── faqs.js           # 103 FAQs across 14 categories
│   ├── insights.js       # 21 blog/insights articles
│   └── comparisons.js    # 4 comparison pages
├── static/               # source assets (CSS, nav JS, logo/OG SVGs) copied into docs/assets/
├── dpdp-untangled-brand.md  # brand reference doc — wordmark, icon, fonts, colours, taxonomy, tonality
└── docs/                  # GENERATED static site output — served by GitHub Pages (main branch, /docs)
```

## Regenerating the site

```bash
node generate.js
```

This wipes and rebuilds `docs/` from scratch: every HTML page, `sitemap.xml`,
`robots.txt`, `llms.txt`, `llms-full.txt`, `docs/CNAME` (custom domain for
GitHub Pages), and `docs/.nojekyll` (so GitHub Pages serves the plain HTML
without Jekyll processing). No `npm install` is required — the generator uses
only Node core modules (`fs`, `path`).

To change site content, edit the relevant file under `data/`, or
`lib/config.js` for brand/domain/contact settings, then re-run
`node generate.js`.

## What's included

- **~290 static HTML pages**: homepage, services hub (grouped into
  Assessments / Tech Architecture & Build / Training & Enablement / Advisory &
  Ongoing Support) + 16 service pages including the CMP Codebase & Deployment
  flagship, DPDP Readiness Levels hub + 6 level pages, Gap Assessment
  deep-dive hub + 6 sub-pages, DPDR & CDJR framework hubs + 12 field/concept
  pages, industries hub + 13 sector pages, glossary hub + 68 term pages, FAQ
  hub + 14 category hubs + 103 individual FAQ pages, insights hub + 21
  articles, comparisons hub + 4 pages, resources hub, contact, careers,
  privacy policy, terms of service, cookie policy, and a 404 page. There is no
  About/Team page by design.
- **SEO/technical hygiene**: unique `<title>`/meta description/canonical per
  page, Open Graph + Twitter card tags, JSON-LD (`Organization`, `Service`,
  `Product` on the flagship page, `FAQPage`, `BreadcrumbList`, `Article`,
  `DefinedTerm`), `sitemap.xml` covering every generated page, `robots.txt`,
  `llms.txt`, and a full-content `llms-full.txt` export for LLM ingestion.
- **Navigation**: Home · Services · DPDP Readiness · Resources · Industries ·
  Insights · Contact (7 items — Resources is the hub for
  Glossary/FAQs/Frameworks/Comparisons/Insights). Nav items outside the
  Services pillar pick up their content-pillar colour on hover/active (amber /
  blue / coral — see the brand doc).
- **Brand system**: black/near-black backgrounds, a Syne wordmark + "knot
  resolving into a line" icon mark, Fraunces for page headings and the
  tagline, Inter for body copy and UI chrome, brand green (`#76E000`) plus
  three secondary content-pillar colours. Full spec in
  `dpdp-untangled-brand.md`.
- **Programmatic cross-linking**: glossary, FAQ, industry, and framework pages
  each surface 2–4 related pages generated from the underlying data model (by
  category/tag), so the site is a connected graph rather than orphaned pages.

## Production domain

`https://dpdpuntangled.com` is set in `lib/config.js` (`domain`) and flows
into canonical URLs, `sitemap.xml`, Open Graph tags, and `llms.txt`.
`docs/CNAME` tells GitHub Pages to serve this custom domain — DNS at the
domain's registrar still needs to be pointed at GitHub Pages
(`truconsent.github.io`) before the domain actually resolves; that's a manual
step outside this repository. Until DNS is switched, the site remains
reachable at `https://truconsent.github.io/dpdp-untangled/`.

`lib/config.js`'s `basePath` should stay `''` — the site serves from the
domain root, not a subpath. See `dpdp-untangled-brand.md` for why this matters
and what regresses if it's set incorrectly.

## Rebrand status (from ReadyDPDP)

The rename, visual system, and new service taxonomy have been applied to the
homepage, shared header/nav/footer, Services hub, the CMP flagship page, and
spot-checked on one Assessments and one Training page. The remaining ~270
pages (Readiness Levels, Frameworks, Industries, Glossary, FAQ, Insights,
Comparisons, and the other 10 non-flagship services) still carry ReadyDPDP-era
body copy for now — they render correctly through the new shared header/footer,
but their own content is scheduled for a follow-up pass.
