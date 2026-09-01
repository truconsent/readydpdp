// Site-wide configuration for the ReadyDPDP static site generator.
module.exports = {
  brand: 'ReadyDPDP',
  tagline: 'Get DPDP Ready.',
  longTagline: 'India\'s DPDP Act 2023 readiness and compliance advisory practice.',
  byline: 'Powered by truConsent',
  domain: 'https://www.readydpdp.com',
  // Current live host is a GitHub Pages PROJECT site with no custom domain attached
  // (repo truconsent/readydpdp, served at https://truconsent.github.io/readydpdp/),
  // so every internal root-relative link (href="/...", src="/...") needs this prefix
  // or it 404s against the true GH Pages root. generate.js rewrites those links at
  // write-time (see applyBasePath()). Set this to '' once a custom domain (CNAME)
  // matching `domain` above is actually configured and DNS-verified, then regenerate.
  basePath: '/readydpdp',
  email: 'hello@readydpdp.com',
  phone: '+91 44 4000 0000',
  addressLocality: 'Chennai',
  addressRegion: 'Tamil Nadu',
  addressCountry: 'IN',
  founderNote: 'ReadyDPDP is the consulting and advisory practice of truConsent, an IITM-incubated Privacy Intelligence Suite built for the DPDP Act 2023.',
  socials: {
    linkedin: 'https://www.linkedin.com/company/readydpdp',
    twitter: 'https://twitter.com/readydpdp'
  },
  year: 2026
};
