const cfg = require('./config');

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'DPDP Readiness', href: '/readiness/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'Contact', href: '/contact/' }
];

const FAVICON = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#000000"/><path d="M32 10 L52 18 V32 C52 45 43 53 32 57 C21 53 12 45 12 32 V18 Z" fill="none" stroke="#76E000" stroke-width="4"/><path d="M22 33 L29 40 L43 24" fill="none" stroke="#A8F020" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
)}`;

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

function navHtml(currentPath) {
  return `<header class="site-header">
    <div class="header-inner">
      <a class="brand" href="/">
        <img src="/assets/logo.svg" alt="${esc(cfg.brand)} logo" width="28" height="28" />
        <span class="brand-name">${esc(cfg.brand)}</span>
      </a>
      <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="primaryNav" aria-label="Toggle navigation menu">
        <span></span><span></span><span></span>
      </button>
      <nav class="primary-nav" id="primaryNav" aria-label="Primary">
        <ul>
          ${NAV.map(n => `<li><a href="${n.href}"${currentPath === n.href ? ' aria-current="page" class="active"' : ''}>${esc(n.label)}</a></li>`).join('\n')}
        </ul>
        <a class="btn btn-primary nav-cta" href="/contact/">Get a Readiness Call</a>
      </nav>
    </div>
  </header>`;
}

function footerHtml() {
  return `<footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-col footer-brand">
        <a class="brand" href="/">
          <img src="/assets/logo.svg" alt="${esc(cfg.brand)} logo" width="24" height="24" />
          <span class="brand-name">${esc(cfg.brand)}</span>
        </a>
        <p class="footer-tagline">${esc(cfg.tagline)}</p>
        <p class="footer-byline">${esc(cfg.byline)}</p>
      </div>
      <div class="footer-col">
        <h3>Services</h3>
        <ul>
          <li><a href="/services/">All Services</a></li>
          <li><a href="/services/dpdp-gap-assessment/">DPDP Gap Assessment</a></li>
          <li><a href="/services/dpo-as-a-service/">DPO-as-a-Service</a></li>
          <li><a href="/services/data-protection-impact-assessment/">DPIA</a></li>
          <li><a href="/services/significant-data-fiduciary-compliance/">SDF Compliance</a></li>
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
          <li><a href="/about/">About</a></li>
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
