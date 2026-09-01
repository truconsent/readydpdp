module.exports = [
  {
    slug: 'vs-in-house',
    title: 'ReadyDPDP vs. Building In-House',
    dek: 'When a dedicated internal hire makes sense, and when it quietly becomes the most expensive option on the table.',
    altLabel: 'In-House Hire',
    matrix: [
      { criterion: 'DPDPA-specific methodology from day one', us: 'yes', them: 'partial' },
      { criterion: 'Time to first Gap Assessment', us: 'yes', them: 'no' },
      { criterion: 'Cross-client pattern-matching and benchmarking', us: 'yes', them: 'no' },
      { criterion: 'Deep, permanent institutional embedding', us: 'partial', them: 'yes' },
      { criterion: 'Lower cost during initial ramp-up', us: 'yes', them: 'no' },
      { criterion: 'Scales into a hybrid or in-house handoff over time', us: 'yes', them: 'partial' }
    ],
    body: [
      'Building DPDPA compliance entirely in-house means hiring or designating a full-time owner, giving them time to get up to speed on a genuinely new and still-evolving area of law, and having them build assessment methodology, consent architecture, and rights-fulfilment processes largely from first principles.',
      'For organisations at meaningful scale with a long-term, complex compliance need, an in-house hire is often the right eventual destination — someone embedded full-time in your systems and culture has advantages an external advisor cannot fully replicate. The friction is the ramp-up: a new hire, however capable, spends real time learning your specific systems and the DPDPA\'s specific requirements simultaneously, and does so without the pattern-matching that comes from having run the same assessment across dozens of organisations.',
      'Our engagement model is frequently not "instead of" in-house capability but "ahead of and alongside" it — we run the initial Gap Assessment and build the foundational architecture faster than a new hire ramping up from zero could, then hand off to, or co-pilot with, an internal owner as your programme matures. Many DPO-as-a-Service clients transition to a hybrid or fully in-house model once their programme reaches our Level 3 or 4 Readiness tier.'
    ]
  },
  {
    slug: 'vs-big4-generalist-consultants',
    title: 'ReadyDPDP vs. Big 4 / Generalist Consultancies',
    dek: 'Broad advisory reach versus deep, hands-on DPDPA implementation specificity — a genuine trade-off, not a strict hierarchy.',
    altLabel: 'Big 4 / Generalist Consultancy',
    matrix: [
      { criterion: 'DPDPA-exclusive focus (not one of many regimes)', us: 'yes', them: 'no' },
      { criterion: 'DPDR / CDJR-native register methodology', us: 'yes', them: 'no' },
      { criterion: 'Large-team, multi-jurisdiction surge capacity', us: 'partial', them: 'yes' },
      { criterion: 'Existing enterprise relationships and credibility', us: 'partial', them: 'yes' },
      { criterion: 'Cost efficiency for a DPDPA-only scope', us: 'yes', them: 'no' },
      { criterion: 'Speed of engagement kickoff for a focused scope', us: 'yes', them: 'partial' }
    ],
    body: [
      'Large, generalist consultancies bring genuine strengths: broad organisational credibility, the ability to staff large teams quickly, and often existing relationships within enterprise clients that ease engagement kickoff. For very large, multi-jurisdictional organisations needing a globally coordinated privacy programme spanning many regimes at once, that scale can be genuinely valuable.',
      'The trade-off is depth versus breadth. A generalist privacy practice covering GDPR, CCPA, DPDPA and a dozen other regimes at once often applies broadly similar methodology across all of them, adapted only lightly to DPDPA\'s specific structural quirks — its permissive cross-border default, its Legitimate Uses categories, its Consent Manager model, none of which map cleanly onto a GDPR-first playbook.',
      'ReadyDPDP is built specifically and exclusively around the DPDPA — our methodology, our register-building approach (DPDR and CDJR), our readiness model, and our team\'s day-to-day focus are all DPDPA-native rather than a global framework adapted after the fact. For organisations whose primary or sole compliance need is the DPDPA specifically, that focus consistently produces faster, more specifically calibrated engagements than a generalist practice managing DPDPA as one line item among many regimes.'
    ]
  },
  {
    slug: 'vs-legal-only-firms',
    title: 'ReadyDPDP vs. Legal-Only Firms',
    dek: 'A legal opinion tells you what the law requires. It rarely tells you how to actually build the system that satisfies it.',
    altLabel: 'Legal-Only Firm',
    matrix: [
      { criterion: 'Operational build (consent UI, DPDR/CDJR registers, runbooks)', us: 'yes', them: 'no' },
      { criterion: 'Privileged legal opinion and regulatory representation', us: 'no', them: 'yes' },
      { criterion: 'Hands-on vendor contract remediation execution', us: 'yes', them: 'partial' },
      { criterion: 'Novel legal interpretation on ambiguous provisions', us: 'no', them: 'yes' },
      { criterion: 'Implementation project management', us: 'yes', them: 'no' },
      { criterion: 'Works alongside your counsel rather than replacing it', us: 'yes', them: 'partial' }
    ],
    body: [
      'A specialised law firm is the right and necessary resource for genuinely novel legal interpretation questions, contract disputes, formal regulatory representation before the Data Protection Board or Appellate Tribunal, and definitive opinions on ambiguous points of law where the stakes warrant privileged legal advice.',
      'What a legal opinion typically does not include is the operational build: the actual redesigned consent UI, the structured Digital Personal Data Register mapping every data element to its purpose and retention rule, the tested breach-response runbook, the vendor contract remediation executed across dozens of agreements. A memo stating that your consent flow "should" itemise purposes separately does not itemise them for you.',
      'ReadyDPDP works most effectively alongside legal counsel, not instead of it: we handle the operational design, implementation planning, and hands-on build work that translates legal requirements into working systems and processes, and we flag the specific points where a genuinely novel legal question needs your counsel\'s direct judgment rather than our operational expertise.'
    ]
  },
  {
    slug: 'vs-software-only-tools',
    title: 'ReadyDPDP vs. Software-Only Consent Management Tools',
    dek: 'A consent management platform is infrastructure. It is not, by itself, a compliance strategy.',
    altLabel: 'Software-Only Tool',
    matrix: [
      { criterion: 'Purpose taxonomy and data inventory design (DPDR)', us: 'yes', them: 'no' },
      { criterion: 'Consent collection UI / banner infrastructure', us: 'partial', them: 'yes' },
      { criterion: 'Downstream propagation and enforcement architecture', us: 'yes', them: 'no' },
      { criterion: 'Ready-to-deploy technical banner or preference centre', us: 'no', them: 'yes' },
      { criterion: 'Architecture correctness before software configuration', us: 'yes', them: 'no' },
      { criterion: 'Ongoing advisory and gap remediation', us: 'yes', them: 'no' }
    ],
    body: [
      'A growing market of software-only consent management platforms lets organisations self-serve a technical consent banner, cookie notice, and preference centre — often with minimal setup effort and an appealing low upfront cost.',
      'The gap this leaves is upstream and downstream of the software itself. Upstream: does your organisation actually have a correct, complete purpose taxonomy and data inventory feeding into the tool\'s configuration, or is the tool being configured based on guesswork about what data you actually collect and why? Downstream: does consent captured in the tool actually propagate to every system that subsequently processes that data, or does withdrawal recorded in the banner leave data flowing unchanged through five other systems that never check it?',
      'A software platform is genuinely valuable infrastructure once the underlying compliance architecture — purpose taxonomy, data register, consent enforcement logic — has been correctly designed. Buying the software first and hoping the architecture question resolves itself afterward is a common and costly ordering mistake. Our Consent Management Advisory and Central Consent Engine design work is specifically built to get that architecture right, whether or not a client ultimately layers a specific software platform, including truConsent\'s own, on top of it.'
    ]
  }
];
