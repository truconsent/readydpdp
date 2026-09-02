const cfg = require('./config');

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// pillar: which content-pillar colour this nav item's active/hover state picks up.
// green = Services (brand default), amber = Frameworks & Readiness,
// blue = Industries, coral = Resources & Insights (glossary/FAQ/insights/comparisons).
const NAV = [
  { label: 'Home', href: '/', pillar: 'green' },
  { label: 'Services', href: '/services/', pillar: 'green' },
  { label: 'DPDP Readiness', href: '/readiness/', pillar: 'amber' },
  { label: 'Resources', href: '/resources/', pillar: 'coral' },
  { label: 'Industries', href: '/industries/', pillar: 'blue' },
  { label: 'Insights', href: '/insights/', pillar: 'coral' },
  { label: 'Contact', href: '/contact/', pillar: 'green' }
];

// Text-only brand mark, by deliberate decision (an icon mark was tried and
// reverted — see dpdp-untangled-brand.md). Favicon is a single bold "D",
// not a pictorial glyph.
const FAVICON = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#000000"/><text x="32" y="43" font-family="Arial, sans-serif" font-weight="800" font-size="34" fill="#76E000" text-anchor="middle">D</text></svg>`
)}`;

// Wordmark: "DPDP" in Syne 800 with a short brand-green rule beneath it,
// followed by "untangled." in Fraunces italic, lowercase, muted grey.
function wordmarkHtml() {
  return `<span class="wordmark">
      <span class="wordmark-dpdp-group">
        <span class="wordmark-dpdp">DPDP</span>
        <span class="wordmark-rule" aria-hidden="true"></span>
      </span>
      <span class="wordmark-untangled">untangled.</span>
    </span>`;
}

function brandLockupHtml() {
  return `<a class="brand" href="/" aria-label="${esc(cfg.brand)} — home">
      ${wordmarkHtml()}
    </a>`;
}

function jsonLdBlock(objs) {
  if (!objs || !objs.length) return '';
  return objs.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
}

function breadcrumbJsonLd(items) {
  // items: [{name, url}]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: cfg.domain + it.url
    }))
  };
}

function breadcrumbHtml(items) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${items.map((it, i) => {
    if (i === items.length - 1) return `<li aria-current="page">${esc(it.name)}</li>`;
    return `<li><a href="${it.url}">${esc(it.name)}</a></li>`;
  }).join('<li class="sep">/</li>')}</ol></nav>`;
}

function relatedLinksHtml(title, items) {
  if (!items || !items.length) return '';
  return `<section class="related">
    <h2>${esc(title)}</h2>
    <div class="related-grid">
      ${items.map(it => `<a class="related-card" href="${it.url}"><span class="related-eyebrow">${esc(it.kicker || '')}</span><span class="related-title">${esc(it.label)}</span></a>`).join('\n')}
    </div>
  </section>`;
}

// Accurate on purpose: Rules notified 14 Nov 2025; consent-manager
// registration effective 14 Nov 2026; substantive obligations (notice,
// security, breach reporting, principal rights) effective 14 May 2027.
// Never claim substantive obligations are "active" before that date.
function statusTicker() {
  return `<div class="status-ticker">
    <span class="status-dot" aria-hidden="true"></span>
    <span class="status-ticker-text"><strong>DPDP Rules 2025 notified.</strong> Substantive obligations phase in 14 Nov 2026 – 14 May 2027 — readiness work starts now, not later.</span>
    <a href="/#diagnostic" class="status-ticker-link">Run the readiness diagnostic →</a>
  </div>`;
}

function navHtml(currentPath) {
  return `${statusTicker()}
  <header class="site-header">
    <div class="header-inner">
      ${brandLockupHtml()}
      <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="primaryNav" aria-label="Toggle navigation menu">
        <span></span><span></span><span></span>
      </button>
      <nav class="primary-nav" id="primaryNav" aria-label="Primary">
        <ul>
          ${NAV.map(n => `<li><a class="nav-pillar-${n.pillar}" href="${n.href}"${currentPath === n.href ? ' aria-current="page"' : ''}>${esc(n.label)}</a></li>`).join('\n')}
        </ul>
        <a class="btn btn-primary nav-cta" href="/contact/">Book a Free Consulting Call</a>
      </nav>
    </div>
  </header>`;
}

function footerHtml() {
  return `<footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-col footer-brand">
        ${brandLockupHtml()}
        <p class="footer-tagline">${esc(cfg.tagline)}</p>
        <p class="footer-tagline-secondary">${esc(cfg.secondaryTagline)}</p>
        <p class="footer-byline">${esc(cfg.byline)}</p>
      </div>
      <div class="footer-col">
        <h3>Services</h3>
        <ul>
          <li><a href="/services/">All Services</a></li>
          <li><a href="/services/consent-management-platform-codebase-deployment/">Consent Platform — Own It</a></li>
          <li><a href="/services/dpdp-gap-assessment/">DPDP Gap Assessment</a></li>
          <li><a href="/services/dpo-as-a-service/">DPO-as-a-Service</a></li>
          <li><a href="/services/data-protection-impact-assessment/">DPIA</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Resources</h3>
        <ul>
          <li><a href="/resources/">Resource Hub</a></li>
          <li><a href="/glossary/">Glossary</a></li>
          <li><a href="/faq/">FAQs</a></li>
          <li><a href="/frameworks/dpdr/">DPDR Framework</a></li>
          <li><a href="/frameworks/cdjr/">CDJR Framework</a></li>
          <li><a href="/insights/">Insights</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Company</h3>
        <ul>
          <li><a href="/industries/">Industries</a></li>
          <li><a href="/readiness/">Readiness Levels</a></li>
          <li><a href="/careers/">Careers</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Legal</h3>
        <ul>
          <li><a href="/privacy-policy/">Privacy Policy</a></li>
          <li><a href="/terms-of-service/">Terms of Service</a></li>
          <li><a href="/cookie-policy/">Cookie Policy</a></li>
          <li><a href="/sitemap.xml">Sitemap</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${cfg.year} ${esc(cfg.brand)}. All rights reserved. ${esc(cfg.byline)}.</p>
    </div>
  </footer>`;
}

// 4th family, added deliberately and narrowly: IBM Plex Mono for stat
// numbers, eyebrow-adjacent tags, and the diagnostic tool's labels only —
// the "engineered/technical" texture that pairs with the CMP flagship's
// product-voice tonality. Never used for headings or body copy.
const FONTS_LINK = `<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500&family=IBM+Plex+Mono:wght@500;600&family=Inter:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" />`;

function layout({ title, description, path, bodyHtml, jsonLd = [], ogType = 'website', articleMeta = null }) {
  const canonical = cfg.domain + path;
  const jsonLdAll = jsonLd;
  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<link rel="canonical" href="${canonical}" />
<link rel="icon" href="${FAVICON}" type="image/svg+xml" />
<meta name="robots" content="index, follow" />
<meta name="author" content="${esc(cfg.brand)}" />
<meta name="view-transition" content="same-origin" />
<meta property="og:type" content="${ogType}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:site_name" content="${esc(cfg.brand)}" />
<meta property="og:image" content="${cfg.domain}/assets/og-image.svg" />
${articleMeta && articleMeta.publishedTime ? `<meta property="article:published_time" content="${articleMeta.publishedTime}" />` : ''}
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${cfg.domain}/assets/og-image.svg" />
${FONTS_LINK}
<link rel="stylesheet" href="/assets/style.css" />
${jsonLdBlock(jsonLdAll)}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${navHtml(path)}
<main id="main">
${bodyHtml}
</main>
${footerHtml()}
<script src="/assets/nav.js"></script>
</body>
</html>`;
}

module.exports = { layout, esc, breadcrumbHtml, breadcrumbJsonLd, relatedLinksHtml, NAV, cfg };
