// Deep-dive sub-pages for the DPDP Gap Assessment service.
module.exports = [
  {
    slug: 'methodology',
    title: 'Gap Assessment Methodology',
    dek: 'How we structure evidence collection, control testing and scoring to produce findings that hold up under real scrutiny.',
    body: [
      'Our Gap Assessment methodology is built around one principle: test the actual behaviour of your systems and processes, not just what your documentation claims. Many assessments stop at a policy review — reading your privacy policy and internal guidelines and checking boxes against the DPDPA\'s text. That approach misses the gap that matters most: the difference between documented intent and operational reality.',
      'We combine three evidence streams. First, structured interviews with the teams who actually make data decisions day to day — product managers who decide what fields a signup form collects, engineers who decide whether a consent check fires before a processing job runs, marketers who build audience segments. Second, direct review of artefacts: consent flows as users actually experience them, notice copy as actually published, vendor contracts as actually signed, retention settings as actually configured. Third, where relevant and in scope, light technical verification — confirming a claimed control genuinely executes rather than merely exists in a design document.',
      'Every finding is then scored on two independent axes: regulatory exposure (how directly it maps to a DPDPA obligation and how likely it is to surface in an inquiry or complaint) and remediation effort (cost, complexity, and cross-team dependency to fix). This two-axis scoring is what turns a long list of findings into an actionable, sequenced roadmap rather than an undifferentiated wall of risk.'
    ]
  },
  {
    slug: 'scope-checklist',
    title: 'Scope & Assessment Checklist',
    dek: 'What is included in a standard Gap Assessment engagement, and how we tailor scope to your organisation.',
    body: [
      'A standard Gap Assessment covers seven areas: notice and consent (Section 5 and 6 alignment, purpose specificity, withdrawal mechanics), Data Principal rights fulfilment (access, correction, erasure, nomination, grievance redressal), Data Fiduciary obligations (accuracy, security safeguards, retention, breach preparedness), vendor and Data Processor relationships, cross-border data transfer exposure, children\'s data and verifiable parental consent handling where applicable, and governance structure (ownership, board reporting, policy currency).',
      'Scope is tailored to your organisation before work begins. A B2B SaaS company with no consumer-facing product has a materially different assessment scope than a D2C e-commerce platform handling payment data and marketing consent at scale. We agree the assessment boundary — which business units, products, and systems are in scope — as the first deliverable of the engagement, so there is no ambiguity about what the resulting Readiness Level rating does and does not cover.',
      'For organisations with multiple products or business units, we recommend either a phased assessment (highest-risk unit first, others following) or a full-portfolio assessment with unit-level sub-ratings — the right approach depends on your size and risk concentration, and we\'ll recommend one during scoping.'
    ]
  },
  {
    slug: 'deliverables-report-structure',
    title: 'Deliverables & Report Structure',
    dek: 'What you actually receive at the end of a Gap Assessment engagement, and how the report is structured for both technical and leadership audiences.',
    body: [
      'The core deliverable is the DPDP Gap Assessment Report, structured in four parts. An executive summary states your current DPDP Readiness Level, the three to five highest-priority findings, and the estimated effort to close them — written for a board or leadership audience with no assumed technical background. A detailed findings section documents every gap identified, the evidence behind it, the specific DPDPA provision it relates to, and its risk and effort score. A prioritised roadmap sequences remediation into phases with suggested owners and realistic timelines. An appendix contains the underlying evidence — interview notes, system screenshots, contract excerpts — so findings are traceable and defensible, not assertions.',
      'Alongside the report, you receive a separate executive summary deck designed for direct board presentation, and a Readiness Level certificate-style summary stating your rated level with the specific criteria that supported the rating, referencing our published DPDP Readiness Levels framework.',
      'Reports are delivered as editable documents, not locked PDFs, so your internal team can incorporate findings directly into project trackers, board decks, or investor data rooms without reformatting.'
    ]
  },
  {
    slug: 'timeline-pricing',
    title: 'Timeline & Pricing Tiers',
    dek: 'What to expect for engagement duration and how pricing scales with organisational complexity.',
    body: [
      'Gap Assessment engagements run 2 to 5 weeks from kickoff to final report delivery, depending primarily on the number of distinct products, business units, and systems in scope, and the availability of stakeholders for interviews. A single-product startup with a small team can often complete an assessment in two weeks; a multi-product enterprise with several business units typically runs closer to five.',
      'We work in three indicative tiers, finalised after a short scoping call: a Focused tier for single-product organisations with a small data footprint; a Standard tier for multi-product companies with moderate vendor and cross-border complexity; and an Enterprise tier for organisations with multiple business units, significant vendor ecosystems, or anticipated Significant Data Fiduciary exposure. Exact pricing depends on scope agreed during the kickoff call — we do not publish a fixed rate card because organisational complexity varies too widely for a one-size number to be meaningful or fair.',
      'Every engagement begins with a free 30-minute scoping call, after which we provide a fixed-fee quote before any billable work begins — no time-and-materials surprises.'
    ]
  },
  {
    slug: 'sample-findings-categories',
    title: 'Sample Findings Categories',
    dek: 'The most common gap categories we identify across engagements, so you know roughly what to expect before you start.',
    body: [
      'Certain findings recur across the large majority of engagements, regardless of sector. Consent bundling is the most common: a single acceptance checkbox covering multiple, distinct processing purposes, which fails the DPDPA\'s specificity requirement. Missing or informal withdrawal mechanisms follow closely — many organisations make giving consent one click and withdrawing it a multi-step support ticket, which fails the "as easy to withdraw as to give" standard.',
      'On the rights-fulfilment side, the most common gap is the absence of any defined SLA or identity verification step for access, correction, and erasure requests — requests are handled ad hoc through a general support inbox with no audit trail. On the vendor side, Data Processing Agreements frequently predate the DPDPA and lack instruction-bound processing language, breach notification duties, or sub-processor controls.',
      'Governance findings are common even in otherwise mature organisations: no named accountable owner for data protection, no board-level reporting cadence, and privacy policies that have not been substantively reviewed since before the Act was notified. None of these are unusual or embarrassing findings — they are the expected starting point for most organisations, which is precisely why a structured roadmap matters more than the initial score.'
    ]
  },
  {
    slug: 'post-assessment-roadmap',
    title: 'Post-Assessment Roadmap',
    dek: 'What happens after the report lands — how clients typically sequence remediation and which ReadyDPDP services support each phase.',
    body: [
      'The roadmap delivered with your Gap Assessment report is sequenced, not just prioritised — it groups findings into phases based on dependency and effort, so your team knows what to tackle first and what depends on what. Phase one is typically governance and quick wins: naming an accountable owner, fixing the highest-severity consent or notice gaps, and establishing a rights-request intake process. Phase two addresses structural work: consent architecture redesign, vendor contract remediation, and policy suite rewrites. Phase three covers sustaining capability: training rollout, breach response readiness, and recurring audit cadence.',
      'Most clients pair the roadmap with an ongoing engagement to execute it. Organisations without in-house privacy expertise typically move into a DPO-as-a-Service retainer, which gives them continuous ownership through the remediation cycle and beyond. Organisations with capable internal teams but specific execution gaps often engage individual services — Consent Management Advisory, Vendor Due Diligence, or Policy & Notice Drafting — mapped directly to their highest-priority findings.',
      'Whichever path you take, we recommend re-assessing your DPDP Readiness Level roughly two quarters after the initial assessment to measure actual progress against the roadmap, not just track completed tasks.'
    ]
  }
];
