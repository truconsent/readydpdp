# ReadyDPDP

**Get DPDP Ready.**

ReadyDPDP is a consulting and advisory microsite for a DPDP Act 2023 compliance practice — a sister brand to [truConsent](https://truconsent.io) (India's Privacy Intelligence Suite, IITM-incubated). Where truConsent is the software platform, ReadyDPDP is the human advisory layer: DPDP Gap Assessments, DPO-as-a-Service, consent architecture design, and the structured **DPDR** (Digital Personal Data Register) and **CDJR** (Customer Data Journey Registry) methodology that underpins a defensible DPDPA compliance programme. Footer byline: "Powered by truConsent."

This repository contains a small Node.js static-site **generator** (`generate.js` + `data/*.js` + `lib/*.js`) and its generated static HTML output (`docs/`), which is served directly via GitHub Pages.

## Why the name

**ReadyDPDP** ties directly into the site's centerpiece — the DPDP Readiness Levels maturity model — giving a natural, recurring call to action ("Find your DPDP Readiness Level," "Get DPDP Ready"). It's short, SEO-native (contains the exact term "DPDP" people search for), and ownable as a standalone consulting brand distinct from the truConsent product.

## Structure

```
readydpdp/
├── generate.js          # main generator script — run this to (re)build the site
├── lib/
│   ├── config.js        # site-wide config: brand name, domain, contact details
│   └── templates.js      # HTML layout shell, nav, footer, breadcrumb/related-link helpers
├── data/                 # all page content, as plain JS data arrays/objects
│   ├── services.js       # 15 consulting services
│   ├── readiness.js      # 6 DPDP Readiness Levels (0–5)
│   ├── gapAssessment.js  # Gap Assessment deep-dive sub-pages
│   ├── frameworks.js     # DPDR & CDJR proprietary methodology content
│   ├── industries.js     # 13 industry risk profiles
│   ├── glossary.js       # 68 DPDPA glossary terms
│   ├── faqs.js           # 103 FAQs across 14 categories
│   ├── insights.js       # 21 blog/insights articles
│   └── comparisons.js    # 4 comparison pages
├── static/               # source assets (CSS, nav JS, logo/OG SVGs) copied into docs/assets/
└── docs/                  # GENERATED static site output — served by GitHub Pages (main branch, /docs)
```

## Regenerating the site

```bash
node generate.js
```

This wipes and rebuilds `docs/` from scratch: every HTML page, `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, and `docs/.nojekyll` (so GitHub Pages serves the plain HTML without Jekyll processing). No `npm install` is required — the generator uses only Node core modules (`fs`, `path`).

To change site content, edit the relevant file under `data/`, or `lib/config.js` for brand/domain/contact settings, then re-run `node generate.js`.

## What's included

- **~280 static HTML pages**: homepage, services hub + 15 service pages, DPDP Readiness Levels hub + 6 level pages, Gap Assessment deep-dive hub + 6 sub-pages, DPDR & CDJR framework hubs + 12 field/concept pages, industries hub + 13 sector pages, glossary hub + 68 term pages, FAQ hub + 14 category hubs + 103 individual FAQ pages, insights hub + 21 articles, comparisons hub + 4 pages, resources hub, about, contact, careers, privacy policy, terms of service, cookie policy, and a 404 page.
- **SEO/technical hygiene**: unique `<title>`/meta description/canonical per page, Open Graph + Twitter card tags, JSON-LD (`Organization`, `Service`, `FAQPage`, `BreadcrumbList`, `Article`, `DefinedTerm`), `sitemap.xml` covering every generated page, `robots.txt`, `llms.txt`, and a full-content `llms-full.txt` export for LLM ingestion.
- **Navigation**: Home · Services · DPDP Readiness · Resources · Industries · Insights · Contact (7 items — Resources is the hub for Glossary/FAQs/Frameworks/Comparisons/Insights).
- **Brand system**: reused faithfully from truConsent's visual identity — black/near-black backgrounds, dark-green-tinted cards with a brand-green (`#76E000`) border, a thick green rule under section titles, Inter typography, high-contrast dark theme throughout.
- **Programmatic cross-linking**: glossary, FAQ, industry, and framework pages each surface 2–4 related pages generated from the underlying data model (by category/tag), so the site is a connected graph rather than orphaned pages.

## Placeholder production domain

`https://www.readydpdp.com` is used consistently across canonical URLs, sitemap, Open Graph tags, and `llms.txt`. Update `lib/config.js` (`domain`) and regenerate if the real production domain differs.
