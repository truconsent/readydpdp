#!/usr/bin/env node
/**
 * ReadyDPDP static site generator.
 * Reads data/*.js, renders HTML via lib/templates.js, writes static output to docs/.
 * Run: node generate.js
 */
const fs = require('fs');
const path = require('path');

const { layout, esc, breadcrumbHtml, breadcrumbJsonLd, relatedLinksHtml, cfg } = require('./lib/templates');

const services = require('./data/services');
const readinessLevels = require('./data/readiness');
const gapAssessment = require('./data/gapAssessment');
const { dpdr, cdjr } = require('./data/frameworks');
const industries = require('./data/industries');
const glossary = require('./data/glossary');
const { categories: faqCategories, faqs } = require('./data/faqs');
const insights = require('./data/insights');
const comparisons = require('./data/comparisons');

const resources = require('./data/resources');

const ROOT = __dirname;
const DOCS = path.join(ROOT, 'docs');

// ---------- utilities ----------
const allPages = []; // { url, changefreq, priority }
const llmsFullSections = []; // { title, url, text }

// The live host today is a GitHub Pages *project* site with no custom domain
// (https://truconsent.github.io/readydpdp/) — every root-relative href="/..."
// or src="/..." in the generated markup needs the "/readydpdp" prefix or it
// 404s against the true page root. Rather than thread a basePath through every
// single link in this file, we rewrite at write-time in one place. Anything
// already absolute (https://..., mailto:, #fragment, data:) is untouched since
// it never matches the `href="/` / `src="/` pattern below.
function applyBasePath(html) {
  const bp = cfg.basePath || '';
  if (!bp) return html;
  return html.replace(/\b(href|src|action)="\/(?!\/)/g, (_m, attr) => `${attr}="${bp}/`);
}

function writePage(urlPath, html, { changefreq = 'monthly', priority = 0.6 } = {}) {
  const filePath = urlPath === '/' ? path.join(DOCS, 'index.html') : path.join(DOCS, urlPath.replace(/^\//, ''), 'index.html');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, applyBasePath(html));
  allPages.push({ url: urlPath, changefreq, priority });
}

function writeRaw(urlPath, contents) {
  const filePath = path.join(DOCS, urlPath.replace(/^\//, ''));
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents);
}

function addLlmsFullText(title, urlPath, text) {
  llmsFullSections.push({ title, url: cfg.domain + urlPath, text });
}

function paragraphs(arr) {
  return arr.map(p => `<p>${esc(p)}</p>`).join('\n');
}

function paragraphsRich(arr) {
  // allow simple markdown-ish bold via **text** -> not needed; just escape
  return paragraphs(arr);
}

function relatedItem(label, url, kicker) {
  return { label, url, kicker };
}

// ---------- shared page bits ----------
function heroSection(eyebrow, h1, lede) {
  return `<span class="eyebrow">${esc(eyebrow)}</span>
    <hr class="rule" />
    <h1>${esc(h1)}</h1>
    <p class="lede">${esc(lede)}</p>`;
}

function ctaBand(text = 'Not sure where you stand on DPDP readiness?', buttonText = 'Book a Free Consulting Call', href = '/contact/') {
  return `<div class="cta-band"><div class="container">
    <h2>${esc(text)}</h2>
    <p>Talk to a ReadyDPDP consultant about your specific data footprint — no obligation, no sales script.</p>
    <a class="btn btn-primary" href="${href}">${esc(buttonText)}</a>
  </div></div>`;
}

function breadcrumbsFor(items) {
  return breadcrumbHtml(items);
}

// ---------- visual components (replace card-grid-everywhere with the right shape) ----------

// Readiness ladder: CSS-only stepped/staircase diagram for the 6 DPDP Readiness Levels.
function readinessLadder(levels, currentLevel) {
  const heights = [58, 84, 110, 136, 162, 188];
  return `<div class="ladder-wrap"><div class="ladder">
    ${levels.map(l => `<a class="ladder-step${l.level === currentLevel ? ' current' : ''}" href="/readiness/${l.slug}/">
      <div class="ladder-step-bar" style="height:${heights[l.level] || 60}px;">${l.level}</div>
      <div class="ladder-step-label">
        <span class="ladder-step-name">${esc(l.name)}</span>
        <span class="ladder-step-num">Level ${l.level}</span>
      </div>
    </a>`).join('\n')}
  </div></div>`;
}

// Framework flow diagrams: horizontal SVG process steps with arrow connectors.
function svgWrapText(label, x, yStart, maxChars = 15, lineHeight = 14) {
  const words = label.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (test.length > maxChars && cur) { lines.push(cur); cur = w; } else { cur = test; }
  }
  if (cur) lines.push(cur);
  return lines.map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lineHeight}">${esc(line)}</tspan>`).join('');
}

function flowDiagramSvg(steps) {
  const n = steps.length;
  const width = 1080;
  const height = 176;
  const boxW = 148;
  const boxH = 92;
  const gap = (width - n * boxW) / (n + 1);
  const y = 34;
  let boxes = '';
  let arrows = '';
  steps.forEach((s, i) => {
    const x = gap + i * (boxW + gap);
    const cx = x + boxW / 2;
    boxes += `<g>
      <rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="10" fill="#162316" stroke="#76E000" stroke-width="1.5" />
      <text x="${cx}" y="${y + 22}" text-anchor="middle" fill="#76E000" font-family="Inter, Arial, sans-serif" font-size="11.5" font-weight="800" letter-spacing="0.06em">STEP ${i + 1}</text>
      <text x="${cx}" y="${y + 44}" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="700">${svgWrapText(s.label, cx, y + 44)}</text>
    </g>`;
    if (i < n - 1) {
      const x1 = x + boxW;
      const x2 = x1 + gap;
      const midY = y + boxH / 2;
      arrows += `<line x1="${x1 + 4}" y1="${midY}" x2="${x2 - 10}" y2="${midY}" stroke="#76E000" stroke-width="2" marker-end="url(#flowArrow)"/>`;
    }
  });
  return `<div class="flow-diagram"><svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Process flow diagram: ${esc(steps.map(s => s.label).join(' then '))}">
    <defs><marker id="flowArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#76E000"/></marker></defs>
    ${arrows}
    ${boxes}
  </svg></div>`;
}

// Phase timeline: CSS flex timeline with a connecting line.
function phaseTimelineHtml(phases) {
  return `<div class="phase-timeline-wrap"><div class="phase-timeline">
    ${phases.map((p, i) => `<div class="phase-timeline-item">
      <div class="phase-timeline-dot">${i + 1}</div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
    </div>`).join('\n')}
  </div></div>`;
}

// Comparison matrix: real <table>, not a card grid. cell values: 'yes' | 'no' | 'partial'.
function cmpSymbol(v) {
  if (v === 'yes') return '<span class="cmp-yes">✓</span>';
  if (v === 'partial') return '<span class="cmp-partial">~</span>';
  return '<span class="cmp-no">✗</span>';
}
function comparisonTableHtml(c) {
  return `<div class="comparison-table-wrap">
    <table class="comparison-table">
      <thead><tr><th>Criteria</th><th class="us-col">ReadyDPDP</th><th>${esc(c.altLabel)}</th></tr></thead>
      <tbody>
        ${c.matrix.map(m => `<tr><td>${esc(m.criterion)}</td><td class="cmp-cell us-col">${cmpSymbol(m.us)}</td><td class="cmp-cell">${cmpSymbol(m.them)}</td></tr>`).join('\n')}
      </tbody>
    </table>
  </div>
  <p class="comparison-legend"><span><span class="cmp-yes">✓</span> Yes</span><span><span class="cmp-partial">~</span> Partial / depends on scope</span><span><span class="cmp-no">✗</span> No</span></p>`;
}

// Feature row — borderless, numbered, hairline top rule. Default replacement
// for the bordered .card as a "3-4 things" value-prop layout.
function featureRowList(items) {
  return `<div class="feature-row-list">
    ${items.map((it, i) => `<div class="feature-row-item">
      <span class="feature-row-index">0${i + 1}</span>
      <h3>${esc(it.title)}</h3>
      <p>${esc(it.body)}</p>
    </div>`).join('\n')}
  </div>`;
}

// Stat-led row — oversized numeral/mark, vertical hairline dividers, no box.
function statLedRow(items) {
  return `<div class="stat-led-row">
    ${items.map(it => `<div class="stat-led-item">
      <span class="stat-led-num">${esc(it.num)}</span>
      <h3>${esc(it.title)}</h3>
      <p>${esc(it.body)}</p>
    </div>`).join('\n')}
  </div>`;
}

// Chip-stack — compact numbered field list, used inside a split-feature visual slot.
function chipStackHtml(kicker, items) {
  return `<div class="chip-stack">
    <span class="chip-stack-kicker">${esc(kicker)}</span>
    ${items.map((it, i) => `<div class="chip-row"><span class="chip-num">${i + 1}</span><span>${esc(it)}</span></div>`).join('\n')}
  </div>`;
}

// Split feature — asymmetric visual+text row, alternates sides via reverse:true.
function splitFeatureHtml({ visualHtml, kicker, title, body, linkLabel, linkHref, reverse }) {
  return `<div class="split-feature${reverse ? ' reverse' : ''}">
    <div class="split-feature-visual">${visualHtml}</div>
    <div class="split-feature-text">
      <span class="eyebrow">${esc(kicker)}</span>
      <h3>${esc(title)}</h3>
      <p>${esc(body)}</p>
      ${linkHref ? `<a class="card-link" href="${linkHref}">${esc(linkLabel)} →</a>` : ''}
    </div>
  </div>`;
}

// =====================================================================
// HOMEPAGE
// =====================================================================
function buildHome() {
  const body = `
  <section class="hero">
    <div class="container hero-grid">
      <div>
        <span class="eyebrow">DPDP Act 2023 Readiness &amp; Compliance Advisory</span>
        <hr class="rule" />
        <h1>Get DPDP Ready.</h1>
        <p class="lede">ReadyDPDP is the consulting practice that turns the DPDP Act 2023 from a legal document into an operating system for how your organisation actually handles personal data — assessed, architected, and sustained, not just documented.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="/readiness/">Find Your DPDP Readiness Level</a>
          <a class="btn btn-secondary" href="/services/dpdp-gap-assessment/">Start with a Gap Assessment</a>
        </div>
        <div class="hero-stats">
          <div class="stat"><b>15</b><span>Specialist advisory services</span></div>
          <div class="stat"><b>6</b><span>DPDP Readiness Levels mapped</span></div>
          <div class="stat"><b>13</b><span>Industry risk profiles covered</span></div>
        </div>
      </div>
      <div class="hero-card">
        <h3>What a Gap Assessment gets you</h3>
        <ol>
          <li>A DPDP Readiness Level rating for your organisation</li>
          <li>A prioritised, resourced remediation roadmap</li>
          <li>Evidence-based findings, not policy-review guesswork</li>
          <li>A board-ready executive summary</li>
        </ol>
        <a class="btn btn-primary" href="/contact/" style="margin-top:10px;display:inline-block;">Book a Free Consulting Call</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <span class="eyebrow">Why organisations engage us</span>
      <hr class="rule" />
      <h2>DPDPA compliance built to be operated, not just documented</h2>
      ${featureRowList([
        { title: 'Evidence, not assumption', body: 'We test your consent flows, contracts and systems directly instead of taking your privacy policy\'s word for it.' },
        { title: 'Sequenced, not overwhelming', body: 'Every finding is scored for regulatory exposure and remediation effort, so you always know what to fix first.' },
        { title: 'Built to be sustained', body: 'From DPO-as-a-Service to incident retainers, we stay engaged through the parts of compliance that never really finish.' }
      ])}
    </div>
  </section>

  <section class="section" style="background:var(--bg-secondary);border-top:1px solid #1a1a1a;border-bottom:1px solid #1a1a1a;">
    <div class="container">
      <span class="eyebrow">DPDP Readiness Levels</span>
      <hr class="rule" />
      <h2>Where does your organisation actually stand?</h2>
      <p class="lede">A six-level maturity model, from Unaware to Optimised — used to benchmark where you are and exactly what closing the next level requires.</p>
      <div class="grid grid-4" style="margin-top:24px;">
        ${readinessLevels.slice(0, 4).map(l => `<a class="card" href="/readiness/${l.slug}/" style="text-decoration:none;">
          <span class="level-badge">${l.level}</span>
          <h3 style="margin-top:12px;">${esc(l.name)}</h3>
          <p>${esc(l.summary.slice(0, 90))}${l.summary.length > 90 ? '…' : ''}</p>
        </a>`).join('\n')}
      </div>
      <p style="margin-top:20px;"><a class="btn btn-secondary" href="/readiness/">See all 6 Readiness Levels →</a></p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <span class="eyebrow">Services</span>
      <hr class="rule" />
      <h2>Fifteen ways we help you close the gap</h2>
      <div class="grid grid-3" style="margin-top:24px;">
        ${services.slice(0, 6).map(s => `<div class="card"><h3>${esc(s.name)}</h3><p>${esc(s.short)}</p><a class="card-link" href="/services/${s.slug}/">Learn more →</a></div>`).join('\n')}
      </div>
      <p style="margin-top:20px;"><a class="btn btn-secondary" href="/services/">View all 15 services →</a></p>
    </div>
  </section>

  <section class="section" style="background:var(--bg-secondary);border-top:1px solid #1a1a1a;">
    <div class="container">
      <span class="eyebrow">Methodology</span>
      <hr class="rule" />
      <h2>Two registers. One defensible compliance architecture.</h2>
      ${splitFeatureHtml({
        visualHtml: chipStackHtml('DPDR core fields', dpdr.fields.map(f => f.name)),
        kicker: 'Register 1',
        title: 'DPDR — Digital Personal Data Register',
        body: 'The field-level inventory of every personal data element you hold, why you hold it, and when it must be purged.',
        linkLabel: 'Explore the DPDR', linkHref: '/frameworks/dpdr/'
      })}
      ${splitFeatureHtml({
        visualHtml: chipStackHtml('CDJR core fields', cdjr.fields.filter(f => f.slug !== 'interview-driven-vs-scan-driven').map(f => f.name)),
        kicker: 'Register 2',
        title: 'CDJR — Customer Data Journey Registry',
        body: 'Every consent collection point across your customer journey, mapped to purpose and kept current.',
        linkLabel: 'Explore the CDJR', linkHref: '/frameworks/cdjr/',
        reverse: true
      })}
    </div>
  </section>

  <section class="section">
    <div class="container">
      <span class="eyebrow">Insights</span>
      <hr class="rule" />
      <h2>Latest thinking on DPDPA compliance</h2>
      <p class="lede">${insights.length} articles — Rules explainers, penalty breakdowns, sector deep-dives, and practical readiness guidance from our advisory team.</p>
      <div class="grid grid-3" style="margin-top:24px;">
        ${[...insights].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3).map(a => `<a class="card" href="/insights/${a.slug}/" style="text-decoration:none;"><span class="tag">${esc(a.date)}</span><h3 style="margin-top:8px;">${esc(a.title)}</h3><p>${esc(a.dek)}</p></a>`).join('\n')}
      </div>
      <p style="margin-top:20px;"><a class="btn btn-secondary" href="/insights/">Read all ${insights.length} Insights articles →</a></p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <span class="eyebrow">Why ReadyDPDP</span>
      <hr class="rule" />
      <h2>Built specifically for the DPDP Act — not retrofitted from GDPR</h2>
      ${statLedRow([
        { num: '01', title: 'DPDPA-native methodology', body: 'Our readiness model, registers and playbooks are built around India\'s specific law, not adapted from someone else\'s.' },
        { num: '02', title: 'Backed by a real platform team', body: 'Powered by truConsent, an IITM-incubated Privacy Intelligence Suite — our advisory work is grounded in what actually gets built.' },
        { num: '03', title: 'Sector-specific depth', body: 'BFSI, healthcare, EdTech and e-commerce risk profiles we\'ve actually mapped, not generic checklists applied everywhere.' }
      ])}
    </div>
  </section>

  ${ctaBand()}
  `;

  const jsonLd = [{
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: cfg.brand,
    url: cfg.domain,
    logo: cfg.domain + '/assets/logo.svg',
    description: cfg.longTagline,
    slogan: cfg.tagline,
    sameAs: [cfg.socials.linkedin, cfg.socials.twitter],
    address: { '@type': 'PostalAddress', addressLocality: cfg.addressLocality, addressRegion: cfg.addressRegion, addressCountry: cfg.addressCountry },
    parentOrganization: { '@type': 'Organization', name: 'truConsent' }
  }, {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: cfg.brand,
    url: cfg.domain
  }];

  const html = layout({
    title: `${cfg.brand} — Get DPDP Ready. | DPDP Act 2023 Compliance Advisory`,
    description: `ReadyDPDP is India's DPDP Act 2023 readiness and compliance advisory practice — gap assessments, DPO-as-a-Service, consent architecture, and sector-specific DPDPA compliance programmes. Powered by truConsent.`,
    path: '/',
    bodyHtml: body,
    jsonLd
  });
  writePage('/', html, { changefreq: 'weekly', priority: 1.0 });
  addLlmsFullText('Homepage', '/', 'ReadyDPDP — Get DPDP Ready. DPDP Act 2023 readiness and compliance advisory practice, powered by truConsent.');
}

// =====================================================================
// SERVICES
// =====================================================================
function buildServices() {
  // hub
  const hubBody = `
  <div class="container">
    ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services/' }])}
    ${heroSection('Services', 'DPDP Compliance Services', 'Fifteen specialist services covering every stage of DPDP Act 2023 compliance — from first assessment to sustained governance.')}
    <div class="grid grid-3" style="margin-top:12px;">
      ${services.map(s => `<div class="card"><h3>${esc(s.name)}</h3><p>${esc(s.short)}</p><a class="card-link" href="/services/${s.slug}/">Learn more →</a></div>`).join('\n')}
    </div>
  </div>
  ${ctaBand()}`;
  writePage('/services/', layout({
    title: `DPDP Compliance Services | ${cfg.brand}`,
    description: 'Fifteen specialist DPDP Act 2023 compliance services: Gap Assessment, DPO-as-a-Service, Consent Management Advisory, DPIA, SDF Compliance and more.',
    path: '/services/',
    bodyHtml: hubBody,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services/' }])]
  }), { priority: 0.9 });
  addLlmsFullText('Services Hub', '/services/', services.map(s => `${s.name}: ${s.short}`).join('\n'));

  services.forEach((s, idx) => {
    const others = services.filter(x => x.slug !== s.slug);
    const related = others.sort(() => 0.5 - Math.random()).slice(0, 4).map(x => relatedItem(x.name, `/services/${x.slug}/`, 'Service'));
    const relatedIndustries = industries.filter(ind => ind.servicesNeeded.includes(s.slug)).slice(0, 3);

    const body = `
    <div class="container">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services/' }, { name: s.name, url: `/services/${s.slug}/` }])}
      ${heroSection('Service', s.name, s.short)}
      <div class="grid" style="grid-template-columns: 2fr 1fr; gap:32px; margin-top:8px;">
        <div>
          <h2>What it is</h2>
          <hr class="rule" />
          ${paragraphs([s.whatItIs])}
          <h2 style="margin-top:32px;">Who needs this</h2>
          <hr class="rule" />
          <p>${esc(s.who)}</p>
          <h2 style="margin-top:32px;">Our process</h2>
          <hr class="rule" />
          <ol class="steps">
            ${s.process.map(p => `<li><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></li>`).join('\n')}
          </ol>
          <h2 style="margin-top:32px;">Frequently asked questions</h2>
          <hr class="rule" />
          ${s.faqs.map(f => `<div class="faq-item"><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join('\n')}
        </div>
        <div>
          <div class="card-plain">
            <h3>Deliverables</h3>
            <ul>${s.deliverables.map(d => `<li>${esc(d)}</li>`).join('')}</ul>
          </div>
          <div class="card-plain" style="margin-top:16px;">
            <h3>Timeline</h3>
            <p>${esc(s.timeline)}</p>
          </div>
          ${relatedIndustries.length ? `<div class="card-plain" style="margin-top:16px;">
            <h3>Common in</h3>
            <p>${relatedIndustries.map(ind => `<a href="/industries/${ind.slug}/">${esc(ind.name)}</a>`).join(', ')}</p>
          </div>` : ''}
          <a class="btn btn-primary" style="margin-top:16px;display:block;text-align:center;" href="/contact/">Discuss This Service</a>
        </div>
      </div>
      ${relatedLinksHtml('Related services', related)}
    </div>
    ${ctaBand()}`;

    const jsonLd = [
      breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services/' }, { name: s.name, url: `/services/${s.slug}/` }]),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: s.name,
        name: s.name,
        description: s.short,
        provider: { '@type': 'Organization', name: cfg.brand, url: cfg.domain },
        areaServed: 'IN'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: s.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
      }
    ];

    writePage(`/services/${s.slug}/`, layout({
      title: `${s.name} | ${cfg.brand} DPDP Compliance Services`,
      description: s.short,
      path: `/services/${s.slug}/`,
      bodyHtml: body,
      jsonLd
    }), { priority: 0.8 });

    addLlmsFullText(`Service: ${s.name}`, `/services/${s.slug}/`,
      `${s.whatItIs}\n\nWho needs this: ${s.who}\n\nProcess: ${s.process.map(p => `${p.title} — ${p.body}`).join(' ')}\n\nDeliverables: ${s.deliverables.join('; ')}\n\nTimeline: ${s.timeline}\n\nFAQs: ${s.faqs.map(f => `${f.q} ${f.a}`).join(' ')}`);
  });
}

// =====================================================================
// READINESS LEVELS
// =====================================================================
function buildReadiness() {
  const hubBody = `
  <div class="container">
    ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'DPDP Readiness', url: '/readiness/' }])}
    ${heroSection('DPDP Readiness Levels', 'The DPDP Readiness Model', 'A six-level maturity model — Level 0 Unaware through Level 5 Optimised — used across every ReadyDPDP engagement to benchmark where an organisation stands and what advancing to the next level requires.')}
    ${readinessLadder(readinessLevels, null)}
    <div class="grid grid-3" style="margin-top:32px;">
      ${readinessLevels.map(l => `<a class="card" href="/readiness/${l.slug}/" style="text-decoration:none;">
        <span class="level-badge">${l.level}</span>
        <h3 style="margin-top:12px;">${esc(l.name)}</h3>
        <p>${esc(l.summary)}</p>
      </a>`).join('\n')}
    </div>
  </div>
  ${ctaBand('Not sure which level you\'re at?', 'Get Assessed', '/services/dpdp-gap-assessment/')}`;
  writePage('/readiness/', layout({
    title: `DPDP Readiness Levels — The Six-Level Maturity Model | ${cfg.brand}`,
    description: 'ReadyDPDP\'s DPDP Readiness Levels: a six-level maturity model from Unaware to Optimised, benchmarking DPDP Act 2023 compliance maturity.',
    path: '/readiness/',
    bodyHtml: hubBody,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'DPDP Readiness', url: '/readiness/' }])]
  }), { priority: 0.9 });
  addLlmsFullText('DPDP Readiness Levels Hub', '/readiness/', readinessLevels.map(l => `Level ${l.level} — ${l.name}: ${l.summary}`).join('\n'));

  readinessLevels.forEach((l, i) => {
    const prev = readinessLevels[i - 1];
    const next = readinessLevels[i + 1];
    const related = [
      prev && relatedItem(`Level ${prev.level} — ${prev.name}`, `/readiness/${prev.slug}/`, 'Previous level'),
      next && relatedItem(`Level ${next.level} — ${next.name}`, `/readiness/${next.slug}/`, 'Next level'),
      relatedItem('DPDP Gap Assessment', '/services/dpdp-gap-assessment/', 'Service'),
      relatedItem('DPDP Readiness Levels overview', '/readiness/', 'Hub')
    ].filter(Boolean);

    const body = `
    <div class="container">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'DPDP Readiness', url: '/readiness/' }, { name: `Level ${l.level} — ${l.name}`, url: `/readiness/${l.slug}/` }])}
      ${heroSection(`Readiness Level ${l.level}`, `Level ${l.level}: ${l.name}`, l.summary)}
      ${readinessLadder(readinessLevels, l.level)}
      <h2 style="margin-top:32px;">Criteria</h2>
      <hr class="rule" />
      <ul>${l.criteria.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
      <h2 style="margin-top:28px;">Typical organisation profile</h2>
      <hr class="rule" />
      <p>${esc(l.orgProfile)}</p>
      <h2 style="margin-top:28px;">Risks at this level</h2>
      <hr class="rule" />
      <p>${esc(l.risks)}</p>
      <h2 style="margin-top:28px;">Path to advance</h2>
      <hr class="rule" />
      <p>${esc(l.pathToAdvance)}</p>
      ${relatedLinksHtml('Related pages', related)}
    </div>
    ${ctaBand()}`;

    writePage(`/readiness/${l.slug}/`, layout({
      title: `DPDP Readiness Level ${l.level}: ${l.name} | ${cfg.brand}`,
      description: `${l.summary} Criteria, organisation profile, risks, and the path to the next DPDP Readiness Level.`,
      path: `/readiness/${l.slug}/`,
      bodyHtml: body,
      jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'DPDP Readiness', url: '/readiness/' }, { name: `Level ${l.level} — ${l.name}`, url: `/readiness/${l.slug}/` }])]
    }), { priority: 0.7 });

    addLlmsFullText(`Readiness Level ${l.level}: ${l.name}`, `/readiness/${l.slug}/`,
      `${l.summary}\n\nCriteria: ${l.criteria.join('; ')}\n\nOrg profile: ${l.orgProfile}\n\nRisks: ${l.risks}\n\nPath to advance: ${l.pathToAdvance}`);
  });
}

// =====================================================================
// GAP ASSESSMENT DEEP DIVES
// =====================================================================
function buildGapAssessment() {
  const hubBody = `
  <div class="container">
    ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services/' }, { name: 'Gap Assessment Deep Dive', url: '/gap-assessment/' }])}
    ${heroSection('Deep Dive', 'The DPDP Gap Assessment, In Detail', 'Everything that goes into our foundational diagnostic engagement — methodology, scope, deliverables, pricing, common findings, and what happens next.')}
    <div class="grid grid-3" style="margin-top:12px;">
      ${gapAssessment.map(g => `<div class="card"><h3>${esc(g.title)}</h3><p>${esc(g.dek)}</p><a class="card-link" href="/gap-assessment/${g.slug}/">Read more →</a></div>`).join('\n')}
    </div>
  </div>
  ${ctaBand('Ready to see where you stand?', 'Book a Gap Assessment', '/services/dpdp-gap-assessment/')}`;
  writePage('/gap-assessment/', layout({
    title: `DPDP Gap Assessment — Methodology, Scope & Pricing | ${cfg.brand}`,
    description: 'A deep dive into ReadyDPDP\'s DPDP Gap Assessment methodology: scope, checklist, deliverables, report structure, timeline, pricing and post-assessment roadmap.',
    path: '/gap-assessment/',
    bodyHtml: hubBody,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services/' }, { name: 'Gap Assessment Deep Dive', url: '/gap-assessment/' }])]
  }), { priority: 0.8 });
  addLlmsFullText('Gap Assessment Deep Dive Hub', '/gap-assessment/', gapAssessment.map(g => `${g.title}: ${g.dek}`).join('\n'));

  gapAssessment.forEach((g, i) => {
    const others = gapAssessment.filter(x => x.slug !== g.slug);
    const related = [
      relatedItem('DPDP Gap Assessment (service)', '/services/dpdp-gap-assessment/', 'Service'),
      ...others.slice(0, 3).map(x => relatedItem(x.title, `/gap-assessment/${x.slug}/`, 'Deep dive'))
    ];
    const phaseTimeline = g.slug === 'methodology' ? `
      <h2>The engagement, phase by phase</h2>
      <hr class="rule" />
      ${phaseTimelineHtml([
        { title: 'Scoping Call', desc: 'A free 30-minute call to define the assessment boundary — business units, products and systems in scope.' },
        { title: 'Evidence Collection', desc: 'Structured interviews, artefact review (consent flows, notices, contracts), and targeted technical verification.' },
        { title: 'Two-Axis Scoring', desc: 'Every finding scored for regulatory exposure and remediation effort — not a flat, undifferentiated list.' },
        { title: 'Report & Roadmap', desc: 'Executive summary, detailed findings, prioritised roadmap and your DPDP Readiness Level rating, delivered.' },
        { title: 'Post-Assessment Execution', desc: 'Remediation begins — typically via DPO-as-a-Service or targeted services mapped to your specific findings.' }
      ])}
    ` : '';
    const body = `
    <div class="container">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services/' }, { name: 'Gap Assessment', url: '/gap-assessment/' }, { name: g.title, url: `/gap-assessment/${g.slug}/` }])}
      ${heroSection('Gap Assessment', g.title, g.dek)}
      ${phaseTimeline}
      ${paragraphs(g.body)}
      ${relatedLinksHtml('Related pages', related)}
    </div>
    ${ctaBand()}`;
    writePage(`/gap-assessment/${g.slug}/`, layout({
      title: `${g.title} | DPDP Gap Assessment | ${cfg.brand}`,
      description: g.dek,
      path: `/gap-assessment/${g.slug}/`,
      bodyHtml: body,
      jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services/' }, { name: 'Gap Assessment', url: '/gap-assessment/' }, { name: g.title, url: `/gap-assessment/${g.slug}/` }])]
    }), { priority: 0.6 });
    addLlmsFullText(`Gap Assessment: ${g.title}`, `/gap-assessment/${g.slug}/`, g.body.join('\n'));
  });
}

// =====================================================================
// FRAMEWORKS: DPDR + CDJR
// =====================================================================
function buildFrameworkOverview(fw, otherFw) {
  const flowSteps = fw.fields.filter(f => f.slug !== 'interview-driven-vs-scan-driven').map(f => ({ label: f.name }));
  const body = `
  <div class="container">
    ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Frameworks', url: '/frameworks/' }, { name: fw.fullName, url: `/frameworks/${fw.slug}/` }])}
    ${heroSection('Methodology', `${fw.name} — ${fw.fullName}`, fw.tagline)}
    <h2>The ${esc(fw.name)} build sequence</h2>
    <hr class="rule" />
    ${flowDiagramSvg(flowSteps)}
    ${paragraphs(fw.overview)}
    <h2 style="margin-top:32px;">How we build it: Interview-Driven vs. Scan-Driven</h2>
    <hr class="rule" />
    <p>${esc(fw.buildApproach)}</p>
    <h2 style="margin-top:32px;">Core fields</h2>
    <hr class="rule" />
    <div class="grid grid-3">
      ${fw.fields.map(f => `<div class="card"><h3>${esc(f.name)}</h3><p style="font-family:monospace;font-size:13px;color:var(--brand-green);">${esc(f.example)}</p><a class="card-link" href="/frameworks/${fw.slug}/${f.slug}/">Read more →</a></div>`).join('\n')}
    </div>
    ${relatedLinksHtml('Related pages', [
      relatedItem(`${otherFw.name} — ${otherFw.fullName}`, `/frameworks/${otherFw.slug}/`, 'Framework'),
      relatedItem('DPDP Gap Assessment', '/services/dpdp-gap-assessment/', 'Service'),
      relatedItem('Data Discovery methodology', '/gap-assessment/methodology/', 'Deep dive'),
      relatedItem('Consent Management Advisory', '/services/consent-management-advisory/', 'Service')
    ])}
  </div>
  ${ctaBand()}`;
  writePage(`/frameworks/${fw.slug}/`, layout({
    title: `${fw.name} — ${fw.fullName} | ${cfg.brand} Methodology`,
    description: fw.tagline,
    path: `/frameworks/${fw.slug}/`,
    bodyHtml: body,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Frameworks', url: '/frameworks/' }, { name: fw.fullName, url: `/frameworks/${fw.slug}/` }])]
  }), { priority: 0.8 });
  addLlmsFullText(`Framework: ${fw.name} (${fw.fullName})`, `/frameworks/${fw.slug}/`, `${fw.overview.join(' ')}\n\nBuild approach: ${fw.buildApproach}\n\nFields: ${fw.fields.map(f => f.name).join(', ')}`);

  fw.fields.forEach((f, i) => {
    const others = fw.fields.filter(x => x.slug !== f.slug);
    const related = [
      relatedItem(`${fw.name} overview`, `/frameworks/${fw.slug}/`, 'Framework'),
      ...others.slice(0, 3).map(x => relatedItem(x.name, `/frameworks/${fw.slug}/${x.slug}/`, `${fw.name} field`))
    ];
    const fbody = `
    <div class="container">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Frameworks', url: '/frameworks/' }, { name: fw.fullName, url: `/frameworks/${fw.slug}/` }, { name: f.name, url: `/frameworks/${fw.slug}/${f.slug}/` }])}
      ${heroSection(`${fw.name} field`, f.name, `Example: ${f.example}`)}
      ${paragraphs(f.body)}
      ${relatedLinksHtml('Related pages', related)}
    </div>
    ${ctaBand()}`;
    writePage(`/frameworks/${fw.slug}/${f.slug}/`, layout({
      title: `${f.name} | ${fw.name} Field | ${cfg.brand}`,
      description: `${f.name} — a core field in ReadyDPDP's ${fw.fullName} (${fw.name}) methodology. ${f.body[0].slice(0, 120)}`,
      path: `/frameworks/${fw.slug}/${f.slug}/`,
      bodyHtml: fbody,
      jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Frameworks', url: '/frameworks/' }, { name: fw.fullName, url: `/frameworks/${fw.slug}/` }, { name: f.name, url: `/frameworks/${fw.slug}/${f.slug}/` }])]
    }), { priority: 0.6 });
    addLlmsFullText(`${fw.name} field: ${f.name}`, `/frameworks/${fw.slug}/${f.slug}/`, f.body.join('\n'));
  });
}

function buildFrameworks() {
  const hubBody = `
  <div class="container">
    ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Frameworks', url: '/frameworks/' }])}
    ${heroSection('Methodology', 'Our Proprietary Frameworks', 'DPDR and CDJR are the two structured registers we build with every client during Phase 4, Data Discovery & Mapping — the foundation every other compliance artefact builds on.')}
    <div class="grid grid-2" style="margin-top:12px;">
      <a class="card" href="/frameworks/dpdr/" style="text-decoration:none;"><h3>${esc(dpdr.name)} — ${esc(dpdr.fullName)}</h3><p>${esc(dpdr.tagline)}</p></a>
      <a class="card" href="/frameworks/cdjr/" style="text-decoration:none;"><h3>${esc(cdjr.name)} — ${esc(cdjr.fullName)}</h3><p>${esc(cdjr.tagline)}</p></a>
    </div>
  </div>
  ${ctaBand()}`;
  writePage('/frameworks/', layout({
    title: `DPDR & CDJR — ReadyDPDP's Proprietary Methodology Frameworks | ${cfg.brand}`,
    description: 'The Digital Personal Data Register (DPDR) and Customer Data Journey Registry (CDJR) — ReadyDPDP\'s structured methodology for DPDP Act 2023 data discovery and mapping.',
    path: '/frameworks/',
    bodyHtml: hubBody,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Frameworks', url: '/frameworks/' }])]
  }), { priority: 0.85 });
  addLlmsFullText('Frameworks Hub', '/frameworks/', `${dpdr.name} (${dpdr.fullName}): ${dpdr.tagline}\n${cdjr.name} (${cdjr.fullName}): ${cdjr.tagline}`);

  buildFrameworkOverview(dpdr, cdjr);
  buildFrameworkOverview(cdjr, dpdr);
}

// =====================================================================
// INDUSTRIES
// =====================================================================
function buildIndustries() {
  const hubBody = `
  <div class="container">
    ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Industries', url: '/industries/' }])}
    ${heroSection('Industries', 'Sector-Specific DPDP Compliance', 'DPDPA compliance looks different by sector. Here is how we frame the risk, and the services that matter most, for the industries we work in most.')}
    <div class="grid grid-3" style="margin-top:12px;">
      ${industries.map(ind => `<a class="card" href="/industries/${ind.slug}/" style="text-decoration:none;"><h3>${esc(ind.name)}</h3><p>${esc(ind.summary)}</p></a>`).join('\n')}
    </div>
  </div>
  ${ctaBand()}`;
  writePage('/industries/', layout({
    title: `Industries We Serve — Sector-Specific DPDP Compliance | ${cfg.brand}`,
    description: 'DPDP Act 2023 compliance risk by industry: BFSI, Healthcare, EdTech, E-commerce, SaaS, Manufacturing, Government, Insurance, Telecom and more.',
    path: '/industries/',
    bodyHtml: hubBody,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Industries', url: '/industries/' }])]
  }), { priority: 0.85 });
  addLlmsFullText('Industries Hub', '/industries/', industries.map(i => `${i.fullName}: ${i.summary}`).join('\n'));

  industries.forEach(ind => {
    const relatedServices = ind.servicesNeeded.map(slug => {
      const svc = services.find(s => s.slug === slug);
      return svc ? relatedItem(svc.name, `/services/${svc.slug}/`, 'Service') : null;
    }).filter(Boolean);
    const otherIndustries = industries.filter(x => x.slug !== ind.slug).sort(() => 0.5 - Math.random()).slice(0, 2).map(x => relatedItem(x.name, `/industries/${x.slug}/`, 'Industry'));

    const body = `
    <div class="container">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Industries', url: '/industries/' }, { name: ind.name, url: `/industries/${ind.slug}/` }])}
      ${heroSection('Industry', ind.fullName, ind.summary)}
      <h2>Where the risk concentrates</h2>
      <hr class="rule" />
      <ul>${ind.risks.map(r => `<li>${esc(r)}</li>`).join('')}</ul>
      <h2 style="margin-top:28px;">Services that matter most for ${esc(ind.name)}</h2>
      <hr class="rule" />
      <div class="grid grid-2">
        ${relatedServices.map(s => `<a class="card" href="${s.url}" style="text-decoration:none;"><h3>${esc(s.label)}</h3></a>`).join('\n')}
      </div>
      ${relatedLinksHtml('Related pages', [...relatedServices.slice(0,2), ...otherIndustries])}
    </div>
    ${ctaBand()}`;
    writePage(`/industries/${ind.slug}/`, layout({
      title: `DPDP Compliance for ${ind.fullName} | ${cfg.brand}`,
      description: `${ind.summary} Sector-specific DPDP Act 2023 risk and compliance services for ${ind.fullName}.`,
      path: `/industries/${ind.slug}/`,
      bodyHtml: body,
      jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Industries', url: '/industries/' }, { name: ind.name, url: `/industries/${ind.slug}/` }])]
    }), { priority: 0.7 });
    addLlmsFullText(`Industry: ${ind.fullName}`, `/industries/${ind.slug}/`, `${ind.summary}\n\nRisks: ${ind.risks.join('; ')}`);
  });
}

// =====================================================================
// GLOSSARY
// =====================================================================
function buildGlossary() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  const hubBody = `
  <div class="container">
    ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources/' }, { name: 'Glossary', url: '/glossary/' }])}
    ${heroSection('Resources', 'DPDPA Glossary', `${glossary.length} plain-language definitions of DPDP Act 2023 and draft DPDP Rules terminology — from Data Fiduciary to Voluntary Undertaking.`)}
    <div class="grid grid-3" style="margin-top:12px;">
      ${sorted.map(g => `<a class="card" href="/glossary/${g.slug}/" style="text-decoration:none;"><h3>${esc(g.term)}</h3><p>${esc(g.short)}</p></a>`).join('\n')}
    </div>
  </div>
  ${ctaBand()}`;
  writePage('/glossary/', layout({
    title: `DPDPA Glossary — ${glossary.length} Key Terms Defined | ${cfg.brand}`,
    description: `A plain-language glossary of ${glossary.length} DPDP Act 2023 and draft DPDP Rules terms: Data Fiduciary, Data Principal, Consent Manager, DPO, and more.`,
    path: '/glossary/',
    bodyHtml: hubBody,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources/' }, { name: 'Glossary', url: '/glossary/' }])]
  }), { priority: 0.85 });
  addLlmsFullText('Glossary Hub', '/glossary/', sorted.map(g => `${g.term}: ${g.short}`).join('\n'));

  glossary.forEach(g => {
    const sameCategory = glossary.filter(x => x.slug !== g.slug && x.category === g.category);
    const related = sameCategory.sort(() => 0.5 - Math.random()).slice(0, 4).map(x => relatedItem(x.term, `/glossary/${x.slug}/`, 'Glossary'));
    const body = `
    <div class="container">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources/' }, { name: 'Glossary', url: '/glossary/' }, { name: g.term, url: `/glossary/${g.slug}/` }])}
      ${heroSection('Glossary', g.term, g.short)}
      ${paragraphs([g.long])}
      ${relatedLinksHtml('Related terms', related.length ? related : glossary.filter(x=>x.slug!==g.slug).slice(0,4).map(x => relatedItem(x.term, `/glossary/${x.slug}/`, 'Glossary')))}
    </div>
    ${ctaBand('Need help applying this to your organisation?', 'Book a Gap Assessment', '/services/dpdp-gap-assessment/')}`;
    writePage(`/glossary/${g.slug}/`, layout({
      title: `${g.term} — DPDPA Glossary | ${cfg.brand}`,
      description: g.short,
      path: `/glossary/${g.slug}/`,
      bodyHtml: body,
      jsonLd: [
        breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources/' }, { name: 'Glossary', url: '/glossary/' }, { name: g.term, url: `/glossary/${g.slug}/` }]),
        { '@context': 'https://schema.org', '@type': 'DefinedTerm', name: g.term, description: g.long, inDefinedTermSet: cfg.domain + '/glossary/' }
      ]
    }), { priority: 0.55 });
    addLlmsFullText(`Glossary: ${g.term}`, `/glossary/${g.slug}/`, g.long);
  });
}

// =====================================================================
// FAQ
// =====================================================================
function slugifyQ(q) {
  return q.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80);
}

function buildFaqs() {
  const withSlug = faqs.map(f => ({ ...f, slug: slugifyQ(f.q) }));
  const byCat = {};
  withSlug.forEach(f => { byCat[f.cat] = byCat[f.cat] || []; byCat[f.cat].push(f); });

  // main hub
  const hubBody = `
  <div class="container">
    ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources/' }, { name: 'FAQs', url: '/faq/' }])}
    ${heroSection('Resources', 'Frequently Asked Questions', `${withSlug.length} real questions about the DPDP Act 2023, answered — grouped by category, from general applicability to sector-specific and consulting-engagement questions.`)}
    <div class="grid grid-3" style="margin-top:12px;">
      ${Object.keys(faqCategories).map(cat => `<a class="card" href="/faq/category/${cat}/" style="text-decoration:none;"><h3>${esc(faqCategories[cat])}</h3><p>${byCat[cat].length} questions</p></a>`).join('\n')}
    </div>
  </div>
  ${ctaBand()}`;
  writePage('/faq/', layout({
    title: `DPDPA FAQs — ${withSlug.length} Questions Answered | ${cfg.brand}`,
    description: `${withSlug.length} frequently asked questions about the DPDP Act 2023, grouped by category: applicability, consent, rights, penalties, sector-specific and more.`,
    path: '/faq/',
    bodyHtml: hubBody,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources/' }, { name: 'FAQs', url: '/faq/' }])]
  }), { priority: 0.85 });
  addLlmsFullText('FAQ Hub', '/faq/', Object.keys(faqCategories).map(c => `${faqCategories[c]}: ${byCat[c].length} questions`).join('\n'));

  // category hubs
  Object.keys(faqCategories).forEach(cat => {
    const items = byCat[cat];
    const body = `
    <div class="container">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources/' }, { name: 'FAQs', url: '/faq/' }, { name: faqCategories[cat], url: `/faq/category/${cat}/` }])}
      ${heroSection('FAQ Category', faqCategories[cat], `${items.length} frequently asked questions about ${faqCategories[cat].toLowerCase()} under the DPDP Act 2023.`)}
      ${items.map(f => `<div class="faq-item"><h3><a href="/faq/${f.slug}/">${esc(f.q)}</a></h3><p>${esc(f.a.slice(0, 180))}${f.a.length > 180 ? '…' : ''}</p></div>`).join('\n')}
      ${relatedLinksHtml('Other FAQ categories', Object.keys(faqCategories).filter(c => c !== cat).slice(0, 4).map(c => relatedItem(faqCategories[c], `/faq/category/${c}/`, 'FAQ category')))}
    </div>
    ${ctaBand()}`;
    writePage(`/faq/category/${cat}/`, layout({
      title: `${faqCategories[cat]} FAQs | DPDPA | ${cfg.brand}`,
      description: `${items.length} frequently asked questions about ${faqCategories[cat]} under the DPDP Act 2023, answered by ReadyDPDP.`,
      path: `/faq/category/${cat}/`,
      bodyHtml: body,
      jsonLd: [
        breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources/' }, { name: 'FAQs', url: '/faq/' }, { name: faqCategories[cat], url: `/faq/category/${cat}/` }]),
        { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
      ]
    }), { priority: 0.65 });
  });

  // individual FAQ pages
  withSlug.forEach(f => {
    const sameCat = withSlug.filter(x => x.slug !== f.slug && x.cat === f.cat);
    const related = sameCat.sort(() => 0.5 - Math.random()).slice(0, 4).map(x => relatedItem(x.q, `/faq/${x.slug}/`, faqCategories[x.cat]));
    const body = `
    <div class="container">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources/' }, { name: 'FAQs', url: '/faq/' }, { name: faqCategories[f.cat], url: `/faq/category/${f.cat}/` }, { name: f.q, url: `/faq/${f.slug}/` }])}
      <span class="eyebrow">${esc(faqCategories[f.cat])}</span>
      <hr class="rule" />
      <h1>${esc(f.q)}</h1>
      <p class="lede">${esc(f.a)}</p>
      ${relatedLinksHtml('Related questions', related)}
    </div>
    ${ctaBand()}`;
    writePage(`/faq/${f.slug}/`, layout({
      title: `${f.q} | ${cfg.brand} FAQ`,
      description: f.a.slice(0, 155),
      path: `/faq/${f.slug}/`,
      bodyHtml: body,
      jsonLd: [
        breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources/' }, { name: 'FAQs', url: '/faq/' }, { name: f.q, url: `/faq/${f.slug}/` }]),
        { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }] }
      ]
    }), { priority: 0.5 });
    addLlmsFullText(`FAQ: ${f.q}`, `/faq/${f.slug}/`, f.a);
  });
}

// =====================================================================
// INSIGHTS
// =====================================================================
function buildInsights() {
  const sorted = [...insights].sort((a, b) => new Date(b.date) - new Date(a.date));
  const hubBody = `
  <div class="container">
    ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Insights', url: '/insights/' }])}
    ${heroSection('Insights', 'DPDP Act Insights & Analysis', `${insights.length} articles on DPDPA compliance, from Rules explainers to sector deep-dives to practical readiness checklists.`)}
    <div class="grid grid-3" style="margin-top:12px;">
      ${sorted.map(a => `<a class="card" href="/insights/${a.slug}/" style="text-decoration:none;"><span class="tag">${esc(a.date)}</span><h3 style="margin-top:8px;">${esc(a.title)}</h3><p>${esc(a.dek)}</p></a>`).join('\n')}
    </div>
  </div>
  ${ctaBand()}`;
  writePage('/insights/', layout({
    title: `DPDP Act Insights & Analysis | ${cfg.brand}`,
    description: `${insights.length} articles on DPDP Act 2023 compliance: Rules explainers, penalty breakdowns, sector deep-dives, and practical readiness guidance.`,
    path: '/insights/',
    bodyHtml: hubBody,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Insights', url: '/insights/' }])]
  }), { priority: 0.85 });
  addLlmsFullText('Insights Hub', '/insights/', sorted.map(a => `${a.title} (${a.date}): ${a.dek}`).join('\n'));

  insights.forEach(a => {
    const others = insights.filter(x => x.slug !== a.slug).sort(() => 0.5 - Math.random()).slice(0, 4).map(x => relatedItem(x.title, `/insights/${x.slug}/`, 'Insight'));
    const body = `
    <div class="container">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Insights', url: '/insights/' }, { name: a.title, url: `/insights/${a.slug}/` }])}
      <span class="eyebrow">Insights · ${esc(a.date)}</span>
      <hr class="rule" />
      <h1>${esc(a.title)}</h1>
      <p class="lede">${esc(a.dek)}</p>
      ${paragraphs(a.body)}
      ${relatedLinksHtml('Further reading', others)}
    </div>
    ${ctaBand()}`;
    writePage(`/insights/${a.slug}/`, layout({
      title: `${a.title} | ${cfg.brand} Insights`,
      description: a.dek,
      path: `/insights/${a.slug}/`,
      bodyHtml: body,
      ogType: 'article',
      articleMeta: { publishedTime: a.date },
      jsonLd: [
        breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Insights', url: '/insights/' }, { name: a.title, url: `/insights/${a.slug}/` }]),
        { '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.dek, datePublished: a.date, author: { '@type': 'Organization', name: cfg.brand }, publisher: { '@type': 'Organization', name: cfg.brand } }
      ]
    }), { priority: 0.6 });
    addLlmsFullText(`Insight: ${a.title}`, `/insights/${a.slug}/`, a.body.join('\n'));
  });
}

// =====================================================================
// COMPARISONS
// =====================================================================
function buildComparisons() {
  const hubBody = `
  <div class="container">
    ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Comparisons', url: '/comparisons/' }])}
    ${heroSection('Comparisons', 'How ReadyDPDP Compares', 'Honest comparisons against the other paths organisations consider for DPDP Act 2023 compliance.')}
    <div class="grid grid-2" style="margin-top:12px;">
      ${comparisons.map(c => `<a class="card" href="/comparisons/${c.slug}/" style="text-decoration:none;"><h3>${esc(c.title)}</h3><p>${esc(c.dek)}</p></a>`).join('\n')}
    </div>
  </div>
  ${ctaBand()}`;
  writePage('/comparisons/', layout({
    title: `How ReadyDPDP Compares | ${cfg.brand}`,
    description: 'ReadyDPDP compared against building compliance in-house, Big 4 consultancies, legal-only firms, and software-only consent management tools.',
    path: '/comparisons/',
    bodyHtml: hubBody,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Comparisons', url: '/comparisons/' }])]
  }), { priority: 0.7 });

  comparisons.forEach(c => {
    const others = comparisons.filter(x => x.slug !== c.slug).map(x => relatedItem(x.title, `/comparisons/${x.slug}/`, 'Comparison'));
    const body = `
    <div class="container">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Comparisons', url: '/comparisons/' }, { name: c.title, url: `/comparisons/${c.slug}/` }])}
      ${heroSection('Comparison', c.title, c.dek)}
      ${paragraphs(c.body)}
      <h2 style="margin-top:8px;">Head-to-head</h2>
      <hr class="rule" />
      ${comparisonTableHtml(c)}
      ${relatedLinksHtml('Other comparisons', others)}
    </div>
    ${ctaBand()}`;
    writePage(`/comparisons/${c.slug}/`, layout({
      title: `${c.title} | ${cfg.brand}`,
      description: c.dek,
      path: `/comparisons/${c.slug}/`,
      bodyHtml: body,
      jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Comparisons', url: '/comparisons/' }, { name: c.title, url: `/comparisons/${c.slug}/` }])]
    }), { priority: 0.6 });
    addLlmsFullText(`Comparison: ${c.title}`, `/comparisons/${c.slug}/`, c.body.join('\n'));
  });
}

// =====================================================================
// RESOURCES HUB
// =====================================================================
function buildResourcesHub() {
  const body = `
  <div class="container">
    ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources/' }])}
    ${heroSection('Resources', 'The ReadyDPDP Resource Hub', 'Glossary, FAQs, frameworks, comparisons, and real downloadable checklists and templates — everything we\'ve written to help you understand and act on the DPDP Act 2023, in one place.')}
    <div class="grid grid-2" style="margin-top:12px;">
      <a class="card" href="/glossary/" style="text-decoration:none;"><h3>Glossary</h3><p>${glossary.length} plain-language DPDPA term definitions.</p></a>
      <a class="card" href="/faq/" style="text-decoration:none;"><h3>FAQs</h3><p>${faqs.length} real questions, answered, across 14 categories.</p></a>
      <a class="card" href="/frameworks/" style="text-decoration:none;"><h3>Frameworks — DPDR &amp; CDJR</h3><p>Our proprietary data discovery and consent journey mapping methodology.</p></a>
      <a class="card" href="/insights/" style="text-decoration:none;"><h3>Insights</h3><p>${insights.length} articles on DPDPA compliance and sector-specific analysis.</p></a>
      <a class="card" href="/comparisons/" style="text-decoration:none;"><h3>Comparisons</h3><p>ReadyDPDP vs. in-house, generalist consultancies, legal-only firms, and software-only tools.</p></a>
      <a class="card" href="/readiness/" style="text-decoration:none;"><h3>DPDP Readiness Levels</h3><p>Our six-level maturity model for benchmarking compliance posture.</p></a>
    </div>

    <section class="downloads-section">
      <span class="eyebrow">Downloads</span>
      <hr class="rule" />
      <h2>Free checklists, templates and worksheets</h2>
      <p class="lede">${resources.length} standalone, printable resources — each a real file you can save, not just another page to read. Print-optimised HTML pages for "Save as PDF," plus a working CSV or Markdown companion for anything tabular or fillable.</p>
      <div class="downloads-grid">
        ${resources.map(r => `<div class="download-card">
          <h3>${esc(r.title)}</h3>
          <p>${esc(r.description)}</p>
          <div class="download-links">
            <a class="btn btn-secondary" href="/resources/downloads/${r.slug}/">View / Print</a>
            ${r.companion ? `<a class="btn btn-secondary" href="/resources/downloads/${r.slug}/${r.slug}.${r.companion}" download>Download .${r.companion}</a>` : ''}
          </div>
        </div>`).join('\n')}
      </div>
    </section>
  </div>
  ${ctaBand()}`;
  writePage('/resources/', layout({
    title: `Resources — Glossary, FAQs, Frameworks & Downloads | ${cfg.brand}`,
    description: `The ReadyDPDP resource hub: DPDPA glossary, FAQs, DPDR/CDJR frameworks, insights, comparisons, and ${resources.length} downloadable checklists and templates.`,
    path: '/resources/',
    bodyHtml: body,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources/' }])]
  }), { priority: 0.9 });
}

// =====================================================================
// DOWNLOADABLE RESOURCES (/resources/downloads/*)
// =====================================================================
function csvEsc(v) {
  const s = String(v == null ? '' : v);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}
function toCsv(header, rows) {
  return [header.map(csvEsc).join(','), ...rows.map(r => r.map(csvEsc).join(','))].join('\n') + '\n';
}

function checklistHtml(r) {
  return r.sections.map(sec => `<div class="checklist-group"><h2>${esc(sec.heading)}</h2><ul class="checklist">${sec.items.map(it => `<li>${esc(it)}</li>`).join('')}</ul></div>`).join('\n');
}
function checklistCsv(r) {
  const rows = [];
  r.sections.forEach(sec => sec.items.forEach(it => rows.push([sec.heading, it])));
  return toCsv(['Category', 'Item'], rows);
}

function worksheetHtml(r) {
  const qBlocks = r.questions.map((q, i) => `<div class="worksheet-q"><h3>${i + 1}. ${esc(q.q)}</h3><ol type="a">${q.options.map(o => `<li>${esc(o.label)} <em>— Level ${o.level}</em></li>`).join('')}</ol></div>`).join('\n');
  const guide = `<h2 style="margin-top:32px;">Scoring guide</h2>
    <hr class="rule" />
    <p>For each question above, note the level number of the option that best matches your organisation today. Average your answers across all ${r.questions.length} questions and round to the nearest whole number for a directional DPDP Readiness Level.</p>
    <div class="comparison-table-wrap"><table class="comparison-table scoring-guide">
      <thead><tr><th>Average score</th><th>Approximate level</th></tr></thead>
      <tbody>${r.levelsRef.map(l => `<tr><td>${l.level}.0 – ${l.level}.99</td><td class="level-cell"><a href="/readiness/${l.slug}/">Level ${l.level} — ${esc(l.name)}</a></td></tr>`).join('')}</tbody>
    </table></div>
    <p style="margin-top:10px;">This worksheet is a directional self-assessment, not a substitute for an independent <a href="/services/dpdp-gap-assessment/">DPDP Gap Assessment</a>.</p>`;
  return qBlocks + guide;
}
function worksheetCsv(r) {
  const rows = r.questions.map((q, i) => [`Q${i + 1}`, q.q, '']);
  return toCsv(['#', 'Question', 'Your Selected Level (0-5)'], rows);
}

function tableHtml(r) {
  const rows = r.rows.map((row, i) => {
    if (r.linkColumn != null && r.linkSlugs) {
      const cells = row.map((c, ci) => ci === r.linkColumn ? `<a href="${r.linkPrefix}${r.linkSlugs[i]}/">${esc(c)}</a>` : esc(c));
      return `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
    }
    return `<tr>${row.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`;
  }).join('\n');
  return `<div class="comparison-table-wrap"><table class="comparison-table"><thead><tr>${r.columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
}
function tableCsv(r) {
  return toCsv(r.columns, r.rows);
}

function logHtml(r) {
  const exampleRow = `<tr>${r.exampleRow.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`;
  const blankRows = Array.from({ length: 8 }, () => `<tr>${r.columns.map(() => '<td>&nbsp;</td>').join('')}</tr>`).join('\n');
  return `<p><span class="tag">Example row</span></p>
  <div class="comparison-table-wrap"><table class="comparison-table">
    <thead><tr>${r.columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead>
    <tbody>${exampleRow}${blankRows}</tbody>
  </table></div>`;
}
function logCsv(r) {
  const blanks = Array.from({ length: r.blankRowCount }, () => r.columns.map(() => ''));
  return toCsv(r.columns, blanks);
}

function onepagerHtml(r) {
  return r.sections2.map(sec => `<div class="checklist-group"><h2>${esc(sec.heading)}</h2>${sec.body.map(b => `<p>${esc(b)}</p>`).join('')}</div>`).join('\n');
}

function buildDownloads() {
  resources.forEach(r => {
    let bodyContent = '';
    let csvContent = null;
    if (r.render === 'checklist') { bodyContent = checklistHtml(r); csvContent = checklistCsv(r); }
    else if (r.render === 'worksheet') { bodyContent = worksheetHtml(r); csvContent = worksheetCsv(r); }
    else if (r.render === 'table') { bodyContent = tableHtml(r); csvContent = tableCsv(r); }
    else if (r.render === 'log') { bodyContent = logHtml(r); csvContent = logCsv(r); }
    else if (r.render === 'onepager') { bodyContent = onepagerHtml(r); }

    const downloadLinks = [];
    if (r.companion === 'csv' && csvContent) {
      writeRaw(`/resources/downloads/${r.slug}/${r.slug}.csv`, csvContent);
      downloadLinks.push(`<a class="btn btn-secondary" href="/resources/downloads/${r.slug}/${r.slug}.csv" download>Download .csv</a>`);
    }
    if (r.companion === 'md' && r.mdTemplate) {
      writeRaw(`/resources/downloads/${r.slug}/${r.slug}.md`, r.mdTemplate);
      downloadLinks.push(`<a class="btn btn-secondary" href="/resources/downloads/${r.slug}/${r.slug}.md" download>Download .md</a>`);
    }

    const body = `
    <div class="container resource-doc">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources/' }, { name: r.title, url: `/resources/downloads/${r.slug}/` }])}
      ${heroSection('Downloadable Resource', r.title, r.dek)}
      <div class="print-actions">
        <button onclick="window.print()">Print / Save as PDF</button>
        ${downloadLinks.join(' ')}
      </div>
      ${paragraphs(r.intro)}
      ${bodyContent}
      ${relatedLinksHtml('More free resources', resources.filter(x => x.slug !== r.slug).slice(0, 4).map(x => relatedItem(x.title, `/resources/downloads/${x.slug}/`, 'Download')))}
    </div>
    ${ctaBand('Want this built and maintained for you, not just filled in once?', 'Book a Free Consulting Call', '/contact/')}`;

    writePage(`/resources/downloads/${r.slug}/`, layout({
      title: `${r.title} (Free Download) | ${cfg.brand}`,
      description: r.description,
      path: `/resources/downloads/${r.slug}/`,
      bodyHtml: body,
      jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources/' }, { name: r.title, url: `/resources/downloads/${r.slug}/` }])]
    }), { priority: 0.6 });
    addLlmsFullText(`Download: ${r.title}`, `/resources/downloads/${r.slug}/`, r.description);
  });
}

// =====================================================================
// STATIC / LEGAL PAGES
// =====================================================================
function buildStaticPages() {
  // About
  writePage('/about/', layout({
    title: `About ReadyDPDP | DPDP Act 2023 Compliance Advisory`,
    description: 'ReadyDPDP is the consulting and advisory practice powered by truConsent, built specifically for DPDP Act 2023 compliance in India.',
    path: '/about/',
    bodyHtml: `<div class="container">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'About', url: '/about/' }])}
      ${heroSection('About', 'About ReadyDPDP', 'We are the consulting and advisory practice built specifically around India\'s DPDP Act 2023 — assessment, architecture, and sustained governance, not a generic global privacy playbook applied locally.')}
      ${splitFeatureHtml({
        visualHtml: chipStackHtml('What makes the DPDPA different', ['Permissive cross-border transfer default', 'A novel Consent Manager intermediary', 'Specific Legitimate Uses provisions', 'Its own Significant Data Fiduciary tier']),
        kicker: 'Why we exist',
        title: 'Built for the DPDPA\'s own terms, not GDPR lightly adapted',
        body: 'The DPDP Act 2023 is India\'s first comprehensive data protection law, and it is structurally different from GDPR and the frameworks most global privacy consultancies were built around. ReadyDPDP exists because organisations need advisors who think in the DPDPA\'s own terms.'
      })}
      ${splitFeatureHtml({
        visualHtml: chipStackHtml('Grounded in real infrastructure', ['Structured data registers (DPDR / CDJR)', 'Purpose-based consent engines', 'Rights-fulfilment infrastructure']),
        kicker: 'Powered by truConsent',
        title: 'Advisory grounded in what actually gets built',
        body: 'ReadyDPDP is the consulting arm powered by truConsent, an IITM-incubated Privacy Intelligence Suite built specifically for DPDP Act 2023 compliance — not abstracted legal theory alone.',
        reverse: true
      })}
      <h2 style="margin-top:12px;">How we work</h2>
      <hr class="rule" />
      ${statLedRow([
        { num: '01', title: 'Evidence, not assumption', body: 'We test your actual consent flows, contracts and systems rather than reviewing policy documents in isolation.' },
        { num: '02', title: 'Sequenced, not overwhelming', body: 'Every finding is scored for regulatory exposure and remediation effort — a sequenced roadmap, not a wall of risk.' },
        { num: '03', title: 'Built to be sustained', body: 'Compliance is not a project with an end date, and our retainer services exist because the work never really finishes.' }
      ])}
      ${relatedLinksHtml('Learn more', [relatedItem('Our Services', '/services/', 'Services'), relatedItem('DPDP Readiness Levels', '/readiness/', 'Readiness'), relatedItem('Contact us', '/contact/', 'Contact')])}
    </div>${ctaBand()}`,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'About', url: '/about/' }])]
  }), { priority: 0.7 });

  // Contact
  writePage('/contact/', layout({
    title: `Book a Free Consulting Call | ${cfg.brand}`,
    description: 'Get in touch with ReadyDPDP to book a free DPDP Act 2023 consulting call.',
    path: '/contact/',
    bodyHtml: `<div class="container">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact/' }])}
      ${heroSection('Contact', 'Book a Free Consulting Call', 'Every engagement starts with a free 30-minute consulting call — no obligation, no sales script. Tell us about your organisation and we\'ll tell you honestly whether, and how, we can help.')}
      <div class="grid" style="grid-template-columns: 1.2fr 0.8fr; gap: 32px; margin-top:8px;">
        <form class="contact-form" action="mailto:${cfg.email}" method="post" enctype="text/plain">
          <div><label for="name">Full name</label><input id="name" name="name" type="text" required /></div>
          <div><label for="org">Organisation</label><input id="org" name="org" type="text" required /></div>
          <div><label for="email">Work email</label><input id="email" name="email" type="email" required /></div>
          <div><label for="topic">What do you need help with?</label>
            <select id="topic" name="topic">
              <option>DPDP Gap Assessment</option>
              <option>DPO-as-a-Service</option>
              <option>Consent Management Advisory</option>
              <option>Significant Data Fiduciary Compliance</option>
              <option>Something else</option>
            </select>
          </div>
          <div><label for="message">Tell us a bit about your organisation</label><textarea id="message" name="message" rows="5"></textarea></div>
          <button class="btn btn-primary" type="submit">Send message</button>
          <p style="font-size:12.5px;">This opens your email client addressed to ${esc(cfg.email)}. Prefer to just email us directly? Write to <a href="mailto:${cfg.email}">${esc(cfg.email)}</a>.</p>
        </form>
        <div class="card-plain">
          <h3>Direct contact</h3>
          <p>Email: <a href="mailto:${cfg.email}">${esc(cfg.email)}</a></p>
          <p>Phone: ${esc(cfg.phone)}</p>
          <p>${esc(cfg.addressLocality)}, ${esc(cfg.addressRegion)}, India</p>
          <h3 style="margin-top:20px;">Not sure where to start?</h3>
          <p>Most engagements begin with a <a href="/services/dpdp-gap-assessment/">DPDP Gap Assessment</a>. If you're not sure that's right for you, just tell us your situation on the call and we'll recommend the right starting point.</p>
        </div>
      </div>
    </div>`,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact/' }])]
  }), { priority: 0.8 });

  // Careers
  writePage('/careers/', layout({
    title: `Careers at ReadyDPDP`,
    description: 'Careers at ReadyDPDP — join India\'s DPDP Act 2023 compliance advisory practice.',
    path: '/careers/',
    bodyHtml: `<div class="container">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Careers', url: '/careers/' }])}
      ${heroSection('Careers', 'Careers at ReadyDPDP', 'We\'re building the leading DPDP Act 2023 advisory practice in India — and we\'re always interested in hearing from experienced privacy, legal and compliance professionals.')}
      <p>We don't have open, actively recruiting roles listed at this moment, but we're consistently interested in connecting with experienced DPDPA practitioners, privacy engineers, and compliance consultants who want to work at the leading edge of India's newest area of law. If that's you, write to us at <a href="mailto:${cfg.email}">${esc(cfg.email)}</a> with a short note about your background — we read every message personally.</p>
      ${relatedLinksHtml('Learn more about us', [relatedItem('About ReadyDPDP', '/about/', 'About'), relatedItem('Our Services', '/services/', 'Services')])}
    </div>`,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Careers', url: '/careers/' }])]
  }), { priority: 0.4 });

  // Privacy Policy
  writePage('/privacy-policy/', layout({
    title: `Privacy Policy | ${cfg.brand}`,
    description: 'ReadyDPDP\'s own privacy policy — how we collect, use and protect personal data submitted through this website.',
    path: '/privacy-policy/',
    bodyHtml: `<div class="container">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Privacy Policy', url: '/privacy-policy/' }])}
      ${heroSection('Legal', 'Privacy Policy', `Last updated: January 2026. This notice describes how ${cfg.brand} collects, uses and protects personal data submitted through this website, in line with the DPDP Act 2023 — the same standard we help our clients meet.`)}
      <h2>What we collect</h2><hr class="rule" />
      <p>When you contact us through this website, we collect the information you voluntarily provide — your name, organisation, work email, and any message content — solely for the purpose of responding to your enquiry.</p>
      <h2 style="margin-top:24px;">Why we collect it</h2><hr class="rule" />
      <p>We process this information under the Legitimate Use of responding to a request you have voluntarily initiated. We do not use contact-form submissions for any purpose beyond responding to your enquiry and, where you separately opt in, sending relevant updates about our services.</p>
      <h2 style="margin-top:24px;">Your rights</h2><hr class="rule" />
      <p>As a Data Principal, you may request access to, correction of, or erasure of personal data you have submitted to us, and may withdraw any marketing consent at any time, by writing to <a href="mailto:${cfg.email}">${esc(cfg.email)}</a>.</p>
      <h2 style="margin-top:24px;">Retention</h2><hr class="rule" />
      <p>We retain contact-form submissions only as long as necessary to respond to your enquiry and maintain a reasonable business record, and delete them thereafter unless you become a client, in which case data is retained per our client engagement terms.</p>
      <h2 style="margin-top:24px;">Contact</h2><hr class="rule" />
      <p>Questions about this policy can be directed to <a href="mailto:${cfg.email}">${esc(cfg.email)}</a>.</p>
    </div>`,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Privacy Policy', url: '/privacy-policy/' }])]
  }), { priority: 0.3 });

  // Terms
  writePage('/terms-of-service/', layout({
    title: `Terms of Service | ${cfg.brand}`,
    description: 'ReadyDPDP\'s terms of service governing use of this website and our advisory engagements.',
    path: '/terms-of-service/',
    bodyHtml: `<div class="container">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Terms of Service', url: '/terms-of-service/' }])}
      ${heroSection('Legal', 'Terms of Service', 'Last updated: January 2026. These terms govern your use of this website. Specific consulting engagements are separately governed by a signed statement of work or engagement letter.')}
      <h2>Website use</h2><hr class="rule" />
      <p>This website and its content — including our Readiness Levels model, glossary, FAQ answers and framework descriptions — are provided for general informational purposes and do not constitute legal advice. Nothing on this site creates an advisory or client relationship; that relationship is established only through a signed engagement letter.</p>
      <h2 style="margin-top:24px;">Intellectual property</h2><hr class="rule" />
      <p>The ReadyDPDP name, the DPDP Readiness Levels model, and the DPDR and CDJR framework names and descriptions are the intellectual property of ReadyDPDP and its parent practice, truConsent. Content may be referenced with attribution but not reproduced wholesale for commercial purposes without permission.</p>
      <h2 style="margin-top:24px;">No warranty</h2><hr class="rule" />
      <p>While we maintain this site to reflect accurate, current understanding of the DPDP Act 2023 and draft DPDP Rules, law and guidance in this area continues to evolve, and this site's content should not be relied upon as a substitute for engagement-specific advice or independent legal counsel.</p>
      <h2 style="margin-top:24px;">Governing law</h2><hr class="rule" />
      <p>These terms are governed by the laws of India, with courts in Chennai, Tamil Nadu having exclusive jurisdiction.</p>
    </div>`,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Terms of Service', url: '/terms-of-service/' }])]
  }), { priority: 0.3 });

  // Cookie Policy
  writePage('/cookie-policy/', layout({
    title: `Cookie Policy | ${cfg.brand}`,
    description: 'How ReadyDPDP uses cookies and similar technologies on this website.',
    path: '/cookie-policy/',
    bodyHtml: `<div class="container">
      ${breadcrumbsFor([{ name: 'Home', url: '/' }, { name: 'Cookie Policy', url: '/cookie-policy/' }])}
      ${heroSection('Legal', 'Cookie Policy', 'Last updated: January 2026. This site is intentionally lightweight and does not use tracking or advertising cookies.')}
      <h2>Our approach</h2><hr class="rule" />
      <p>This website is built as static HTML with minimal client-side JavaScript, limited to a mobile navigation toggle. We do not deploy analytics, advertising, or tracking cookies on this site. If that changes in the future, this policy will be updated and a consent banner will be added consistent with the DPDPA standards we advise our clients to meet.</p>
      <h2 style="margin-top:24px;">Third-party embeds</h2><hr class="rule" />
      <p>We do not currently embed third-party widgets, video players, or social media plugins that would set their own cookies. If this changes, we will disclose it here and obtain consent where required.</p>
      <h2 style="margin-top:24px;">Questions</h2><hr class="rule" />
      <p>Questions about this policy can be directed to <a href="mailto:${cfg.email}">${esc(cfg.email)}</a>.</p>
    </div>`,
    jsonLd: [breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Cookie Policy', url: '/cookie-policy/' }])]
  }), { priority: 0.3 });
}

function build404() {
  const body = `<div class="container" style="text-align:center;padding:80px 0;">
    <span class="eyebrow">404</span>
    <hr class="rule" style="margin-left:auto;margin-right:auto;" />
    <h1>Page not found</h1>
    <p class="lede" style="margin:0 auto;">The page you're looking for doesn't exist or has moved. Try the Services, Glossary, or FAQ hub, or head back home.</p>
    <div class="hero-actions" style="justify-content:center;margin-top:24px;">
      <a class="btn btn-primary" href="/">Back to Home</a>
      <a class="btn btn-secondary" href="/resources/">Browse Resources</a>
    </div>
  </div>`;
  const html = layout({
    title: `Page Not Found | ${cfg.brand}`,
    description: 'The page you requested could not be found on ReadyDPDP.',
    path: '/404.html',
    bodyHtml: body
  });
  fs.writeFileSync(path.join(DOCS, '404.html'), applyBasePath(html));
}

// =====================================================================
// SEO FILES
// =====================================================================
function buildSitemap() {
  const urls = allPages.map(p => `  <url>
    <loc>${cfg.domain}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(DOCS, 'sitemap.xml'), xml);
}

function buildRobots() {
  const txt = `User-agent: *\nAllow: /\n\nSitemap: ${cfg.domain}/sitemap.xml\n`;
  fs.writeFileSync(path.join(DOCS, 'robots.txt'), txt);
}

function buildLlmsTxt() {
  const txt = `# ${cfg.brand}

> ${cfg.longTagline} ${cfg.byline}.

${cfg.brand} ("${cfg.tagline}") is India's DPDP Act 2023 readiness and compliance advisory practice. We run DPDP Gap Assessments, provide fractional DPO-as-a-Service, design consent architecture, and build the structured DPDR (Digital Personal Data Register) and CDJR (Customer Data Journey Registry) that underpin a defensible DPDPA compliance programme.

## Services
- [All Services](${cfg.domain}/services/): 15 specialist DPDP Act 2023 compliance services, from Gap Assessment to Incident Response Retainer.
- [DPDP Gap Assessment](${cfg.domain}/services/dpdp-gap-assessment/): Our foundational diagnostic engagement, with a full [deep-dive section](${cfg.domain}/gap-assessment/) on methodology, scope, pricing and deliverables.

## DPDP Readiness Levels
- [Readiness Levels overview](${cfg.domain}/readiness/): A six-level maturity model (Unaware → Optimised) for benchmarking DPDPA compliance posture.

## Frameworks
- [DPDR — Digital Personal Data Register](${cfg.domain}/frameworks/dpdr/): The field-level personal data inventory methodology.
- [CDJR — Customer Data Journey Registry](${cfg.domain}/frameworks/cdjr/): The consent collection point mapping methodology.

## Resources
- [Glossary](${cfg.domain}/glossary/): ${glossary.length} plain-language DPDPA term definitions.
- [FAQs](${cfg.domain}/faq/): ${faqs.length} frequently asked questions across 14 categories.
- [Insights](${cfg.domain}/insights/): ${insights.length} articles analysing DPDPA compliance topics.
- [Comparisons](${cfg.domain}/comparisons/): How ReadyDPDP compares to in-house teams, generalist consultancies, legal-only firms, and software-only tools.

## Industries
- [Industries overview](${cfg.domain}/industries/): Sector-specific DPDP Act 2023 risk framing for BFSI, Healthcare, EdTech, E-commerce, SaaS, and more.

## Company
- [About](${cfg.domain}/about/)
- [Contact](${cfg.domain}/contact/)

Full page content for LLM ingestion is available at ${cfg.domain}/llms-full.txt
`;
  fs.writeFileSync(path.join(DOCS, 'llms.txt'), txt);
}

function buildLlmsFullTxt() {
  const parts = [`# ${cfg.brand} — Full Content Export\n\n${cfg.longTagline} ${cfg.byline}.\n`];
  llmsFullSections.forEach(s => {
    parts.push(`\n---\n\n## ${s.title}\nURL: ${s.url}\n\n${s.text}\n`);
  });
  fs.writeFileSync(path.join(DOCS, 'llms-full.txt'), parts.join('\n'));
}

function copyStatic() {
  const staticDir = path.join(ROOT, 'static');
  const destDir = path.join(DOCS, 'assets');
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(staticDir)) {
    fs.copyFileSync(path.join(staticDir, file), path.join(destDir, file));
  }
  fs.writeFileSync(path.join(DOCS, '.nojekyll'), '');
}

// =====================================================================
// MAIN
// =====================================================================
function main() {
  if (fs.existsSync(DOCS)) fs.rmSync(DOCS, { recursive: true, force: true });
  fs.mkdirSync(DOCS, { recursive: true });
  copyStatic();

  buildHome();
  buildServices();
  buildReadiness();
  buildGapAssessment();
  buildFrameworks();
  buildIndustries();
  buildGlossary();
  buildFaqs();
  buildInsights();
  buildComparisons();
  buildDownloads();
  buildResourcesHub();
  buildStaticPages();
  build404();

  buildSitemap();
  buildRobots();
  buildLlmsTxt();
  buildLlmsFullTxt();

  console.log(`Generated ${allPages.length} pages into ${DOCS}`);
}

main();
