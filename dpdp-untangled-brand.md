# DPDP Untangled — Brand Reference

This is the reference doc for the DPDP Untangled brand system (rebranded from
ReadyDPDP). It exists so a future editor — human or agent — can apply the
system correctly without re-deriving any of it. If you're about to touch
`lib/templates.js`, `static/style.css`, `lib/config.js`, or add a new page,
read this first.

Source of truth for the code itself: `lib/config.js` (brand strings, domain,
colours-adjacent config) and `static/style.css` (`:root` custom properties).
This document explains the *intent* behind those values.

## Name & domain

- Brand name: **DPDP Untangled** (was ReadyDPDP). Used everywhere: page copy,
  `<title>` tags, meta descriptions, JSON-LD `Organization.name`, footer, nav.
- Domain: `https://dpdpuntangled.com` (no `www`), set in `lib/config.js`
  (`domain`). Served via `docs/CNAME` on GitHub Pages.
- The site serves from the domain root (`/`), not a subpath. `lib/config.js`
  `basePath` must stay `''` — it exists only for the historical case where the
  site lived at `truconsent.github.io/readydpdp/` (a GitHub Pages *project*
  subpath). Do not reintroduce a basePath prefix unless the site moves back
  under a subpath instead of its own domain.

## Wordmark

"**DPDP**" in **Syne**, weight 800, uppercase, tight letter-spacing (~-0.01em),
white/`--text-primary`, with a short thick brand-green rule beneath it
(~5–6px tall, rounded ends) — followed by "**untangled.**" in **Fraunces**
italic, weight 400–500, lowercase, trailing period, in a muted grey
(`--text-muted`, `#9a9a92`) — deliberately **not** the same bright white as
"DPDP", so the two halves read as distinct registers (display mark vs.
editorial signature).

Implementation: `lib/templates.js` → `wordmarkHtml()` / `brandLockupHtml()`.
Markup shape:

```html
<a class="brand" href="/">
  <svg class="brand-icon">...</svg>
  <span class="wordmark">
    <span class="wordmark-dpdp-group">
      <span class="wordmark-dpdp">DPDP</span>
      <span class="wordmark-rule"></span>
    </span>
    <span class="wordmark-untangled">untangled.</span>
  </span>
</a>
```

This is built as inline HTML/SVG, not a raster/`<img>` logo file, specifically
so the two halves can carry two different typefaces and colours. Don't
collapse it back into a single `<img src="logo.svg">` — that's what
`static/logo.svg` is for instead (see Icon mark, below): the icon *alone*, not
the full lockup.

## Icon mark — "a knot resolving into a line"

Exact path (do not redraw or reinterpret this):

```
M10,38 C5,28 20,22 16,33 C12,43 27,39 24,28 C21,16 38,20 34,31 L48,24
```

inside `viewBox="0 0 56 56"`. Rendering rules:

- `stroke`: brand green `#76E000`
- `stroke-width`: `6` at small/inline sizes (header/footer lockup), `7` at
  favicon/app-icon scale
- `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"`

Used in two contexts:
1. **Beside the wordmark** — header/footer brand lockup (see above).
2. **Alone, no text** — favicon and any app-icon-style context, on a black or
   transparent ground. `lib/templates.js` → `FAVICON` (inline data-URI SVG,
   black rounded-square ground, stroke-width 7) and `static/logo.svg` (same
   treatment, used as the JSON-LD `Organization.logo` asset).

The canonical copy of this path lives in `lib/templates.js` as `ICON_PATH`.
If it ever needs to change, update it there and keep this doc in sync.

## Fonts — a disciplined 3-family system

| Typeface | Where | Weight/style |
|---|---|---|
| **Syne** | Logo/wordmark "DPDP" **only** — never page headings | 800, uppercase |
| **Fraunces** | General page H1/H2 (upright/regular); italic reserved for the tagline and pull-quote/statement moments | 400–600 upright; 400–500 italic for taglines |
| **Inter** | Body copy and UI chrome — nav, buttons, cards, forms, h3/component labels | 400–800 |

**Do not blur this scoping.** Concretely:
- Applying Syne to a page H1 (e.g. "About us") is wrong — Syne is the logo
  face only. With ~280 pages of body content, a display face at that weight
  applied site-wide would read as heavy and inconsistent.
- Applying italic Fraunces to a normal page heading is wrong — italic is a
  deliberate, scoped accent for the tagline ("DPDP, untangled.") and
  pull-quote/statement moments, not a general heading style. General H1/H2 use
  Fraunces **upright**.
- `h3`, nav links, buttons, form labels, card copy stay Inter — that's "UI
  chrome," not editorial content.

CSS custom properties (`static/style.css` `:root`): `--font-display` (Syne),
`--font-heading` (Fraunces), `--font-body` (Inter). Utility classes:
`.tagline-italic` (italic + medium weight, for the one deliberate italic use),
`.lede-secondary` / `.footer-tagline-secondary` (Fraunces italic, muted, for
the secondary tagline line specifically).

Loaded via Google Fonts `<link>` in `lib/templates.js` (`FONTS_LINK`):
Fraunces (`ital,wght@0,400;0,500;0,600;1,400;1,500`), Inter
(`wght@400;500;600;700;800`), Syne (`wght@700;800`).

## Colours

Black stays the primary background. Brand green stays reserved for the logo
rule, primary CTAs, and the **Services** content pillar (including all 4
service lines — the lines are a sub-grouping within Services, not separate
colour-coded pillars).

| Token | Hex | Role |
|---|---|---|
| `--bg-primary` | `#000000` | Primary background |
| `--bg-secondary` / `--panel` / `--panel-alt` | `#111111` / `#0c0d0b` / `#111210` | Near-black panel tones |
| `--brand-green` | `#76E000` | Logo rule, primary CTAs, Services pillar (all 4 service lines) |
| `--pillar-amber` | `#E8A33D` | Frameworks & Readiness (DPDR, CDJR, the 6 Readiness Levels) |
| `--pillar-blue` | `#5B8DEF` | Industries |
| `--pillar-coral` | `#E2694A` | Resources & Insights (glossary, FAQ, articles, downloads) |
| `--text-primary` | `#FFFFFF` | Primary text, "DPDP" in the wordmark |
| `--text-muted` | `#9a9a92` | "untangled.", secondary tagline line |

Nav items pick up their pillar colour on hover/active via
`.nav-pillar-{amber,blue,coral}` classes in `lib/templates.js` (`NAV` array →
`pillar` field) and `static/style.css`. Home/Services/Contact stay green
(default) since they aren't one of the 3 secondary pillars.

## Tagline

- **Primary** (hero, set in Fraunces italic): **"DPDP, untangled."**
- **Secondary** (pairs with the primary underneath it, homepage hero and
  footer only — do not use standalone elsewhere): **"Compliance you can
  operate, not just file away."**

Both live in `lib/config.js` as `tagline` and `secondaryTagline`.

## Service taxonomy — 4 lines

`data/services.js` exports the services array plus `module.exports.LINES`
(the 4 line definitions: `key`, `name`, `intro`). Each service object carries
a `line` field. The Services hub (`generate.js` → `buildServices()`) groups
services by line, in this order:

1. **Assessments** — DPDP Gap Assessment, DPIA, Vendor/Data Processor Due
   Diligence, Compliance Audit & Certification Support.
2. **Tech Architecture & Build** — **flagship: Consent Management Platform —
   Codebase & Deployment** (an outright-owned CMP codebase + deployment, no
   recurring licence fee — the commercial centre of gravity right now), plus
   Consent Management Advisory (Consent Architecture Design), Data Principal
   Rights Fulfillment Setup, Cross-Border Data Transfer Advisory, Legacy Data
   Remediation (the DPDR/CDJR data-discovery build-out work).
3. **Training & Enablement** — Employee Training & Awareness, Board &
   Leadership DPDP Briefings.
4. **Advisory & Ongoing Support** — DPO-as-a-Service, Breach Response &
   Notification Readiness, Incident Response Retainer, Significant Data
   Fiduciary (SDF) Compliance, Policy & Notice Drafting.

The flagship service gets a visually distinct full-width `.card--flagship`
treatment inside its line's grid on the Services hub, plus dedicated homepage
visibility (a hero CTA button and a standalone "Own your consent
infrastructure" section) — it is not just another service card three clicks
deep.

## Tonality — a scoped exception, not a site-wide rewrite

The **Tech Architecture & Build** line — especially the CMP flagship page —
reads more like a **software product page**: feature-bullet lists, shorter
punchier sentences, concrete technical specifics (what's in the codebase,
deployment model, ownership terms), energetic but not hype-y. This is
implemented in `generate.js` `buildServices()` via an `if (s.flagship)`
branch that renders a distinct body template (feature-row bullets, an
"Ownership & deployment" callout, "What's included" list) instead of the
standard advisory-service template.

**Everything else keeps its existing advisory/expert voice, unchanged**:
Assessments, Training & Enablement, Advisory & Ongoing Support, and all
existing content (Readiness Levels, Frameworks, Industries, Glossary, FAQ,
Insights). Do not extend the product-page voice beyond the flagship page (and,
loosely, its immediate Tech Architecture & Build siblings) without a deliberate
decision to do so — it's a scoped exception, not a new site-wide tone.

## What's still pending a full pass

As of the DPDP Untangled rebrand's first pass, only the homepage, shared
header/nav/footer, Services hub, the CMP flagship page, and one representative
page each from Assessments and Training were rebuilt/verified against this
system. The remaining ~270 pages (Readiness Levels, Frameworks, Industries,
Glossary, FAQ, Insights, Comparisons, and the 10 non-flagship services not
explicitly touched) still carry old ReadyDPDP-era body copy and are rendered
through the *new* shared header/footer, but their own content has not been
retouched. That is a deliberate, explicit deferral — not an oversight — and is
the next pass's scope.
