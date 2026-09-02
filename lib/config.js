// Site-wide configuration for the DPDP Untangled static site generator.
module.exports = {
  brand: 'DPDP Untangled',
  tagline: 'DPDP, untangled.',
  secondaryTagline: 'Compliance you can operate, not just file away.',
  longTagline: 'DPDP Untangled is India\'s DPDP Act 2023 compliance advisory practice and consent-technology partner — assessments, architecture, enablement, and an outright-ownable consent management platform.',
  byline: 'Powered by truConsent',
  domain: 'https://dpdpuntangled.com',
  // Now served from a real custom domain at the site root (see docs/CNAME), so
  // every internal root-relative link (href="/...", src="/...") should be left
  // exactly as templates.js/generate.js emit it — no prefix needed. This used to
  // be '/readydpdp' when the site lived at the GitHub Pages *project* subpath
  // https://truconsent.github.io/readydpdp/; applyBasePath() in generate.js is a
  // no-op whenever this is ''. Only set this back to a non-empty value if the
  // site ever moves back under a subpath instead of its own domain.
  basePath: '',
  email: 'hello@dpdpuntangled.com',
  phone: '+91 44 4000 0000',
  addressLocality: 'Chennai',
  addressRegion: 'Tamil Nadu',
  addressCountry: 'IN',
  founderNote: 'DPDP Untangled is the consulting and consent-technology practice of truConsent, an IITM-incubated Privacy Intelligence Suite built for the DPDP Act 2023.',
  socials: {
    linkedin: 'https://www.linkedin.com/company/dpdp-untangled',
    twitter: 'https://twitter.com/dpdpuntangled'
  },
  year: 2026
};
