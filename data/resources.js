// Downloadable resources for /resources/downloads/*.
// Each entry renders as a print-optimized standalone HTML page, plus a companion
// .csv or .md file for the content that's genuinely tabular/editable — real files
// on disk under docs/resources/downloads/<slug>/, not on-site-only content links.
const glossary = require('./glossary');
const readinessLevels = require('./readiness');

const gapAssessmentChecklist = {
  slug: 'dpdp-gap-assessment-checklist',
  title: 'DPDP Gap Assessment Checklist',
  description: 'A 7-area checklist covering everything a DPDP Gap Assessment should test — notice & consent, rights fulfilment, vendor DPAs, cross-border transfer and more.',
  dek: 'The same seven scope areas we use to structure a client engagement, condensed into a checklist you can run against your own organisation before — or instead of — commissioning a formal assessment.',
  render: 'checklist',
  companion: 'csv',
  intro: [
    'This checklist mirrors the scope of a ReadyDPDP Gap Assessment: notice and consent, Data Principal rights, Data Fiduciary obligations, vendor relationships, cross-border transfer, children\'s data, and governance. It won\'t score or prioritise findings the way a full engagement does, but it will tell you, honestly, how many of the basics are actually in place.'
  ],
  sections: [
    { heading: 'Notice & Consent', items: [
      'Every distinct processing purpose is disclosed separately, not bundled into one blanket notice',
      'Consent is captured through clear affirmative action — no pre-ticked boxes or implied consent',
      'Withdrawing consent is at least as easy as giving it, with no multi-step support-ticket detour',
      'Notice content is available in plain language, not lifted verbatim from a GDPR template',
      'Notice is given before or at the time of collection, not buried in a policy page discovered later'
    ]},
    { heading: 'Data Principal Rights', items: [
      'A documented process exists for access, correction, erasure and nomination requests',
      'Requests are logged with a defined SLA and an identity verification step',
      'A named Grievance Redressal Officer or equivalent contact is published and reachable',
      'Rights-fulfilment volume has been stress-tested against a realistic spike, not just designed on paper'
    ]},
    { heading: 'Data Fiduciary Obligations', items: [
      'Reasonable security safeguards are documented and actually implemented, not just referenced',
      'A retention schedule exists and is enforced, not left to accumulate indefinitely',
      'Personal data accuracy is maintained through a defined update process',
      'A designated owner exists for data protection compliance, even if fractional'
    ]},
    { heading: 'Vendor & Data Processor Relationships', items: [
      'Every vendor with access to personal data is inventoried, not just the largest few',
      'Data Processing Agreements are instruction-bound and include breach notification duties',
      'Sub-processor use is disclosed and contractually controlled',
      'Vendor DPAs are reviewed at least annually, not signed once and forgotten'
    ]},
    { heading: 'Cross-Border Data Transfer', items: [
      'Every instance of personal data leaving India is mapped — cloud regions, vendors, group transfers',
      'Transfers are screened against currently notified government restrictions',
      'Sector-specific localisation rules (e.g. RBI payment data rules) are layered in where applicable'
    ]},
    { heading: 'Children\'s Data & Parental Consent', items: [
      'Age-verification and verifiable parental consent mechanisms exist where applicable',
      'Tracking, behavioural monitoring and targeted advertising to children is explicitly restricted',
      'Data collected from children is limited to what is strictly necessary for the service'
    ]},
    { heading: 'Governance & Ownership', items: [
      'A named owner is formally accountable for data protection compliance',
      'Leadership or the board receives some recurring compliance reporting',
      'Privacy policy and internal policies have been substantively reviewed since the DPDPA was notified',
      'A breach response plan exists and has been tested via tabletop exercise or a real incident'
    ]}
  ]
};

const readinessWorksheet = {
  slug: 'dpdp-readiness-self-assessment-worksheet',
  title: 'DPDP Readiness Self-Assessment Worksheet',
  description: 'A scored, 8-question worksheet that maps your answers to a directional DPDP Readiness Level (0–5) — the same six-level model used across the site.',
  dek: 'Answer each question with the option that best matches your organisation today, note its level number, then average across all eight to get a directional DPDP Readiness Level.',
  render: 'worksheet',
  companion: 'csv',
  intro: [
    'This is a self-scored worksheet, not a substitute for an independent Gap Assessment — but it will give you and your leadership team a defensible, directional starting point in about ten minutes.'
  ],
  questions: [
    { q: 'Who owns data protection compliance at your organisation?', options: [
      { level: 0, label: 'No one — it has never been formally discussed' },
      { level: 1, label: 'Leadership is aware DPDPA applies, but no owner is assigned' },
      { level: 2, label: 'A Gap Assessment or equivalent has been done and work has started' },
      { level: 3, label: 'A named owner exists, even if fractional, with documented policies' },
      { level: 4, label: 'A named owner runs recurring audits and reports to leadership' },
      { level: 5, label: 'Data protection maturity is used as a competitive differentiator' }
    ]},
    { q: 'How well do you know what personal data you actually collect?', options: [
      { level: 0, label: 'No inventory exists — we would be guessing' },
      { level: 1, label: 'An informal, undocumented understanding exists' },
      { level: 2, label: 'Partial inventory covers some products or teams, not all' },
      { level: 3, label: 'A documented, field-level inventory (e.g. a DPDR) exists' },
      { level: 4, label: 'The inventory is kept current as products change' },
      { level: 5, label: 'The inventory feeds privacy-by-design review for every new feature' }
    ]},
    { q: 'How are consent flows structured today?', options: [
      { level: 0, label: 'No privacy policy update or consent flow review since the Act' },
      { level: 1, label: 'A single blanket "I agree" checkbox covers everything' },
      { level: 2, label: 'Some products have updated flows; others have not' },
      { level: 3, label: 'Purpose-specific consent is standard across products' },
      { level: 4, label: 'Consent mechanisms are audited against purpose linkage regularly' },
      { level: 5, label: 'Consent architecture is interoperable with the Consent Manager model' }
    ]},
    { q: 'How are Data Principal rights requests handled?', options: [
      { level: 0, label: 'No defined process exists' },
      { level: 1, label: 'Requests would go to a general inbox with no SLA' },
      { level: 2, label: 'An informal contact person exists, process is undocumented' },
      { level: 3, label: 'A documented process exists with a target SLA' },
      { level: 4, label: 'SLA performance is consistently met and reported to leadership' },
      { level: 5, label: 'Rights fulfilment is a benchmarked, continuously improved process' }
    ]},
    { q: 'What is the state of your vendor / Data Processor contracts?', options: [
      { level: 0, label: 'Not reviewed — most predate the DPDPA' },
      { level: 1, label: 'Awareness that contracts need review, no action taken' },
      { level: 2, label: 'Some contracts under review, not systematically' },
      { level: 3, label: 'DPAs have been reviewed and substantially remediated' },
      { level: 4, label: 'Vendor risk tiering and annual DPA refresh is standard practice' },
      { level: 5, label: 'Vendor diligence is proactive, screened before onboarding begins' }
    ]},
    { q: 'How prepared are you for a personal data breach?', options: [
      { level: 0, label: 'No breach response plan exists' },
      { level: 1, label: 'Awareness that a plan is needed, nothing built yet' },
      { level: 2, label: 'A draft plan exists but is untested' },
      { level: 3, label: 'A plan exists and has been reviewed by the relevant owner' },
      { level: 4, label: 'The plan has been tested via tabletop exercise or a real incident' },
      { level: 5, label: 'Breach readiness is reviewed and refreshed on a regular cadence' }
    ]},
    { q: 'How does your board or leadership engage with data protection?', options: [
      { level: 0, label: 'Never discussed at board or leadership level' },
      { level: 1, label: 'Discussed once, reactively, after an external trigger' },
      { level: 2, label: 'Occasional updates, no regular cadence' },
      { level: 3, label: 'Leadership receives updates at key programme milestones' },
      { level: 4, label: 'Board receives regular, structured compliance reporting' },
      { level: 5, label: 'Board actively uses compliance posture in strategic decisions' }
    ]},
    { q: 'How would you handle a new product launch or AI feature today?', options: [
      { level: 0, label: 'Privacy is not considered as part of product decisions' },
      { level: 1, label: 'Privacy is considered only if someone happens to raise it' },
      { level: 2, label: 'Privacy review happens after launch, not before' },
      { level: 3, label: 'New launches are screened for DPDPA impact before shipping' },
      { level: 4, label: 'A DPIA process is applied consistently for higher-risk launches' },
      { level: 5, label: 'Privacy-by-design is embedded from the earliest design stage' }
    ]}
  ],
  levelsRef: readinessLevels
};

const glossaryQuickRef = {
  slug: 'dpdpa-glossary-quick-reference',
  title: 'DPDPA Glossary Quick-Reference',
  description: `All ${glossary.length} DPDPA terms from our full glossary, condensed into a single one-line-per-term reference sheet you can print or keep open while reading the Act.`,
  dek: `Every term from the full ${glossary.length}-term ReadyDPDP glossary, condensed to one line each and sorted alphabetically — built for quick lookup, not deep reading. See the full glossary for the long-form definitions.`,
  render: 'table',
  companion: 'csv',
  intro: [
    'This is a condensed companion to the full glossary — one line per term. For the long-form explanation behind any of these, follow the link to that term\'s full glossary page.'
  ],
  columns: ['Term', 'Definition'],
  rows: [...glossary].sort((a, b) => a.term.localeCompare(b.term)).map(g => [g.term, g.short]),
  linkColumn: 0,
  linkPrefix: '/glossary/',
  linkSlugs: [...glossary].sort((a, b) => a.term.localeCompare(b.term)).map(g => g.slug)
};

const complianceCalendar = {
  slug: 'dpdpa-compliance-calendar',
  title: 'DPDPA Compliance Calendar',
  description: 'A recurring compliance cadence — continuous, quarterly, annual and trigger-based tasks — so DPDPA compliance stays a maintained discipline, not a one-time project.',
  dek: 'Compliance dates depend on your specific programme and any organisation-specific deadlines your counsel sets — this is a recurring operating cadence, not a fixed legal deadline calendar.',
  render: 'table',
  companion: 'csv',
  intro: [
    'The DPDP Rules are still being phased in, so we\'ve deliberately built this as a recurring operating cadence rather than a calendar of fixed statutory dates that could go stale. Slot these tasks into your own compliance calendar against the cadence shown.'
  ],
  columns: ['Cadence', 'Task', 'Why it matters'],
  rows: [
    ['Continuous', 'Screen every new product feature or vendor for DPDPA impact before launch', 'Catching exposure before launch is far cheaper than remediating after'],
    ['Continuous', 'Log and track every Data Principal rights request against its SLA', 'Untracked requests are the most common source of missed obligations'],
    ['Continuous', 'Monitor Data Protection Board guidance and finalised Rules', 'The Rules are still maturing — obligations get more concrete over time'],
    ['Monthly', 'Review open remediation roadmap items with the accountable owner', 'Keeps a Gap Assessment roadmap from stalling once initial urgency fades'],
    ['Quarterly', 'Reconcile the Digital Personal Data Register (DPDR) against actual systems', 'Legacy fields and shadow IT accumulate quietly between reviews'],
    ['Quarterly', 'Review vendor risk tiering for any new or changed Data Processors', 'New vendors are a common, easily-missed compliance blind spot'],
    ['Quarterly', 'Report compliance posture and open risks to leadership', 'Board-level visibility is itself part of demonstrable governance'],
    ['Semi-Annually', 'Re-run or refresh your DPDP Readiness Level self-assessment', 'Tracks actual progress against the roadmap, not just completed tasks'],
    ['Annually', 'Refresh Data Processing Agreements and re-run vendor due diligence', 'Contract language and vendor risk both drift without a forced review'],
    ['Annually', 'Run a breach response tabletop exercise', 'An untested plan is the single most common gap we find in Level 3 organisations'],
    ['Annually', 'Refresh employee DPDPA training for all data-handling roles', 'Awareness decays and teams turn over — training needs a renewal cadence'],
    ['Annually', 'Review and reissue privacy notices and internal policy documents', 'Product and purpose changes routinely outpace notice content'],
    ['Trigger: New Product / Feature', 'Run a DPIA-style screen before launch', 'High-risk processing needs assessment before it ships, not after'],
    ['Trigger: New Vendor', 'Run due diligence and execute a DPDPA-aligned DPA before onboarding', 'Retrofitting a contract after data has already started flowing is much harder'],
    ['Trigger: Security Incident', 'Classify against your breach framework within your internal target window', 'Fast, consistent triage is what makes a real notification deadline achievable'],
    ['Trigger: New Market / M&A', 'Re-map cross-border data flows and localisation exposure', 'New geographies and acquired systems change your transfer risk profile']
  ]
};

const consentNoticeChecklist = {
  slug: 'consent-notice-drafting-checklist',
  title: 'Consent Notice Drafting Checklist',
  description: 'A checklist for drafting or auditing a consent notice against the DPDPA\'s free, specific, informed, unconditional and unambiguous standard.',
  dek: 'Run any existing or draft consent notice against this checklist before it ships — most legacy notices fail on specificity and withdrawal mechanics, not on content alone.',
  render: 'checklist',
  companion: 'csv',
  intro: [
    'This checklist covers content, language, specificity, withdrawal and technical implementation — the five places we most often find consent notices fail, even when the underlying legal content is otherwise correct.'
  ],
  sections: [
    { heading: 'Content Requirements', items: [
      'States what personal data is being collected, itemised rather than summarised',
      'States the specific purpose for each item of data collected',
      'Identifies how a Data Principal can exercise their rights and contact the organisation',
      'Discloses whether the data will be shared with any third party, and for what purpose'
    ]},
    { heading: 'Language & Accessibility', items: [
      'Written in plain language, not lifted from a legal template',
      'Available in English and any scheduled language relevant to the user base',
      'Presented at a readable font size and contrast — not buried in dense fine print',
      'Free of jargon that an ordinary user would not reasonably understand'
    ]},
    { heading: 'Specificity & Bundling', items: [
      'Each distinct purpose has its own separate, itemised consent — not one blanket checkbox',
      'Consent to this notice is not bundled with acceptance of unrelated Terms of Service',
      'No purpose is pre-selected or opted in by default',
      'Sensitive or higher-risk purposes are not folded into a lower-visibility bundled purpose'
    ]},
    { heading: 'Withdrawal Mechanics', items: [
      'A clear withdrawal path is described in or alongside the notice itself',
      'Withdrawing is at least as easy as giving consent — not a multi-step support request',
      'The consequence of withdrawal (e.g. feature loss) is disclosed honestly, without discouraging it',
      'Downstream systems that must stop processing on withdrawal are identified and owned'
    ]},
    { heading: 'Technical Implementation', items: [
      'Consent capture is a genuine affirmative action (e.g. an unchecked checkbox), not implied by continued use',
      'A timestamped consent record is stored, including notice version and purpose',
      'The notice is shown before or at the time of collection, not after the fact',
      'The implementation has been checked against this checklist after any product change to the flow'
    ]}
  ]
};

const vendorDueDiligenceChecklist = {
  slug: 'vendor-data-processor-due-diligence-checklist',
  title: 'Vendor / Data Processor Due-Diligence Checklist',
  description: 'A checklist for screening and contractually securing every third party that processes personal data on your behalf.',
  dek: 'A Data Fiduciary remains accountable for personal data processed on its behalf — outsourcing the activity does not outsource the liability. Run every vendor with data access through this checklist.',
  render: 'checklist',
  companion: 'csv',
  intro: [
    'Use this for new vendor onboarding as a gate, and for existing vendors as a periodic re-review. Higher-risk vendors (broader data access, offshore processing, sub-processors) warrant every item; lower-risk vendors may only need the contractual essentials.'
  ],
  sections: [
    { heading: 'Pre-Engagement Screening', items: [
      'Vendor is added to the inventory with categories of personal data it will access',
      'Vendor is risk-tiered based on data sensitivity and scope of access',
      'Vendor\'s own security posture and any prior incident history has been reviewed',
      'Hosting region(s) are confirmed and checked against any applicable localisation rules',
      'A standard due diligence questionnaire has been completed by the vendor'
    ]},
    { heading: 'Contractual (DPA) Requirements', items: [
      'The agreement is instruction-bound — the vendor may only process data as directed',
      'Breach notification duties and a notification timeframe are explicitly stated',
      'Deletion or return of data on contract termination is contractually required',
      'Sub-processor use requires disclosure and, where appropriate, prior approval',
      'Audit rights or evidence-of-compliance rights are included for higher-risk vendors'
    ]},
    { heading: 'Security & Sub-processor Controls', items: [
      'Reasonable technical and organisational security safeguards are contractually specified',
      'Sub-processors are listed and individually risk-assessed, not treated as a black box',
      'Cross-border transfer by the vendor or its sub-processors is disclosed and screened',
      'Access controls limiting vendor staff to only the data they need are confirmed',
      'Encryption at rest and in transit is confirmed for sensitive data categories'
    ]},
    { heading: 'Ongoing Monitoring', items: [
      'Vendor risk tier and DPA are refreshed at least annually',
      'A lightweight review is triggered whenever the vendor changes region, scope or sub-processors',
      'Outstanding contract remediation items are tracked to closure, not left open indefinitely',
      'Vendor breach notification, if it ever occurs, is logged and reviewed against the DPA terms',
      'Underperforming or unresponsive vendors are escalated for contract or relationship review'
    ]}
  ]
};

const boardBriefing = {
  slug: 'board-briefing-one-pager',
  title: 'Board Briefing One-Pager',
  description: 'A fill-in-the-blank template for briefing your board or leadership team on DPDPA exposure, current readiness, and what you\'re asking them to approve.',
  dek: 'A one-page template a DPO or compliance owner can fill in and bring to a board or leadership meeting — designed to fit on a single page and drive a specific decision, not just inform.',
  render: 'onepager',
  companion: 'md',
  intro: [
    'Boards need a different briefing than an engineering team: current exposure, what has been done, what remains, and a specific ask. This template is designed to be filled in and fit on one printed page.'
  ],
  sections2: [
    { heading: 'Where we stand today', body: [
      'Current DPDP Readiness Level: [Level 0–5 and name — see readydpdp.com/readiness/]',
      'Date of last assessment: [date, or "not yet assessed"]',
      'One-sentence summary of our overall exposure: [fill in]'
    ]},
    { heading: 'Top 3 risks', body: [
      '1. [Highest-priority finding — what it is, and what happens if it stays unaddressed]',
      '2. [Second-priority finding]',
      '3. [Third-priority finding]'
    ]},
    { heading: 'What has already been done', body: [
      '[Brief bullet list of completed remediation steps, owners, and dates]'
    ]},
    { heading: 'What we are asking the board to approve', body: [
      'Budget: [amount / range]',
      'Headcount or retainer: [e.g. DPO-as-a-Service, one fractional hire, etc.]',
      'Timeline: [target date for next milestone or re-assessment]',
      'Decision needed today: [the one specific yes/no the board needs to make]'
    ]},
    { heading: 'Next review', body: [
      'We recommend the board receive the next update by: [date — annually at minimum, per our compliance calendar]'
    ]}
  ],
  mdTemplate: `# Board Briefing: DPDPA Compliance Status

## Where we stand today
- Current DPDP Readiness Level: [Level 0-5 and name]
- Date of last assessment: [date, or "not yet assessed"]
- One-sentence summary of our overall exposure: [fill in]

## Top 3 risks
1. [Highest-priority finding]
2. [Second-priority finding]
3. [Third-priority finding]

## What has already been done
- [Completed remediation steps, owners, and dates]

## What we are asking the board to approve
- Budget: [amount / range]
- Headcount or retainer: [e.g. DPO-as-a-Service, one fractional hire]
- Timeline: [target date for next milestone or re-assessment]
- Decision needed today: [the one specific yes/no the board needs to make]

## Next review
- We recommend the board receive the next update by: [date]

---
Template from ReadyDPDP (readydpdp.com) — Powered by truConsent.
`
};

const dpiaChecklist = {
  slug: 'dpia-template-checklist',
  title: 'DPIA Template & Checklist',
  description: 'A structured checklist for running a Data Protection Impact Assessment — trigger screening, data flow mapping, necessity testing, risk scoring and mitigation sign-off.',
  dek: 'Significant Data Fiduciaries must run DPIAs periodically; any organisation launching a materially new use of personal data should run one regardless. This checklist structures that assessment.',
  render: 'checklist',
  companion: 'csv',
  intro: [
    'Use this to run a DPIA for a specific processing activity — a new product, an AI feature, large-scale profiling, or any material change in purpose or scale. It is deliberately structured, not a free-text form, so findings are comparable across assessments.'
  ],
  sections: [
    { heading: 'Trigger Assessment', items: [
      'The processing activity involves large-scale profiling or automated decisioning',
      'The activity involves sensitive processing or children\'s data',
      'The activity represents a materially new purpose or a significant change in scale',
      'A lighter-weight privacy check was considered and ruled insufficient for this activity'
    ]},
    { heading: 'Data Flow Mapping', items: [
      'Every system and third party involved in the activity is identified',
      'The specific personal data elements involved are listed at field level',
      'Data flows into and out of the activity are diagrammed, not just described',
      'Cross-border transfer exposure for this specific activity is identified'
    ]},
    { heading: 'Necessity & Proportionality', items: [
      'Each data element collected is justified against the stated purpose',
      'Less data-intensive alternatives were genuinely considered',
      'Retention period for data used in this activity is defined and justified',
      'The activity has a lawful basis (consent or a specific Legitimate Use) clearly identified'
    ]},
    { heading: 'Risk Scoring', items: [
      'Risks are scored by likelihood and severity to Data Principals, not just to the business',
      'Risks specific to vulnerable groups (e.g. children) are separately considered',
      'Algorithmic or AI-driven components are assessed for bias and accuracy risk',
      'Risk scoring is documented with enough detail to be independently reviewed later'
    ]},
    { heading: 'Mitigation & Sign-off', items: [
      'A mitigation plan exists for every risk scored above an acceptable threshold',
      'Mitigation owners and target dates are assigned, not just described',
      'A formal DPIA report is produced, suitable for board or regulator review',
      'Sign-off is obtained from the accountable owner before the activity proceeds'
    ]}
  ]
};

const breachChecklist = {
  slug: 'breach-notification-response-checklist',
  title: 'Breach Notification Response Checklist',
  description: 'A phase-by-phase checklist for the hours and days after a suspected personal data breach — classification through post-incident review.',
  dek: 'The draft DPDP Rules propose that the Data Protection Board be notified without delay, with a fuller report to follow within a defined window — which means the plan has to exist before an incident, not be improvised during one.',
  render: 'checklist',
  companion: 'csv',
  intro: [
    'This checklist is organised as a response timeline. Treat the windows below as an internal planning target to rehearse against, not a quote of the final statutory deadline — confirm the exact figure against the finalised Rules and your own counsel\'s guidance before relying on it operationally.'
  ],
  sections: [
    { heading: 'Immediate (First Few Hours)', items: [
      'Suspected incident is logged with timestamp, discovery method, and initial scope',
      'Escalation chain is triggered per the pre-built RACI, not an ad hoc phone tree',
      'Incident is triaged against the breach classification framework to determine notifiability',
      'Technical containment begins in parallel with the regulatory/communications workstream'
    ]},
    { heading: 'Short Window (Within the Internal Target Notification Period)', items: [
      'Scope of affected data categories and approximate number of Data Principals is estimated',
      'Draft Data Protection Board notification is prepared from the pre-built template',
      'Legal counsel reviews the classification decision and draft notification',
      'A decision is made and documented on whether Data Principal notification is also required'
    ]},
    { heading: 'Data Protection Board Notification', items: [
      'Notification is submitted using the organisation\'s designated point of contact',
      'A fuller follow-up report is prepared per the Board\'s specified format and window',
      'All notification submissions and timestamps are logged for the audit trail'
    ]},
    { heading: 'Data Principal Communication', items: [
      'Affected-user communication is accurate and avoids unnecessary panic or overclaiming',
      'Communication explains what happened, what data was involved, and what the organisation is doing',
      'Support channels are staffed and briefed before the communication goes out, not after'
    ]},
    { heading: 'Post-Incident', items: [
      'A structured post-incident review is run to identify process gaps the incident exposed',
      'The breach classification framework and templates are updated based on lessons learned',
      'Vendor contracts are reviewed if the breach originated with a Data Processor'
    ]}
  ]
};

const rightsRequestLog = {
  slug: 'data-principal-rights-request-log-template',
  title: 'Data Principal Rights Request Log Template',
  description: 'A ready-to-use log template for tracking access, correction, erasure, nomination and withdrawal requests against your SLA, with one worked example row.',
  dek: 'An untracked rights request is the most common gap we find in an otherwise well-run programme. This is the log we ask clients to stand up in their first week of remediation.',
  render: 'log',
  companion: 'csv',
  intro: [
    'Print this for a paper-based intake process, or import the CSV into a spreadsheet or ticketing tool directly. The worked example row shows how a completed entry should look — the CSV file itself ships with blank rows ready to fill in.'
  ],
  columns: ['Request ID', 'Date Received', 'Request Type', 'Data Principal ID', 'Verification Status', 'Assigned Owner', 'SLA Due Date', 'Status', 'Resolution Date', 'Notes'],
  exampleRow: ['DPR-2026-014', '2026-03-02', 'Erasure', 'CUST-88213', 'Verified', 'J. Rao (DPO)', '2026-03-16', 'Resolved', '2026-03-11', 'Confirmed deletion across CRM and marketing platform'],
  blankRowCount: 20
};

const penaltyReference = {
  slug: 'dpdpa-penalty-enforcement-quick-reference',
  title: 'DPDPA Penalty & Enforcement Quick-Reference',
  description: 'A one-page summary of how the DPDPA\'s penalty schedule maps to categories of non-compliance, from security safeguard failures to procedural gaps.',
  dek: 'The Act\'s Schedule ties specific penalty caps to specific categories of violation rather than one flat maximum — this is a directional summary, not a substitute for reading the Schedule or your own counsel\'s advice.',
  render: 'table',
  companion: 'csv',
  intro: [
    'Penalties are determined by the Data Protection Board through its adjudicatory function, considering the nature and gravity of the violation, the data involved, repetition, and mitigating remediation steps taken — published caps are ceilings, not automatic outcomes. For the authoritative figures and their current status, consult the Act\'s Schedule directly and your own legal counsel.'
  ],
  columns: ['Violation Category', 'Penalty Exposure', 'What It Typically Covers'],
  rows: [
    ['Failure of reasonable security safeguards resulting in a breach', 'Up to ₹250 crore — the Act\'s highest published cap', 'Inadequate technical/organisational security that leads to an actual personal data breach'],
    ['Failure to notify the Board or affected Data Principals of a breach', 'A dedicated, substantial cap distinct from the underlying security failure', 'Mishandling or missing the breach notification obligation itself'],
    ['Children\'s data and verifiable parental consent violations', 'A dedicated cap reflecting heightened statutory concern', 'Processing children\'s data without proper verifiable parental consent or in breach of restrictions'],
    ['Significant Data Fiduciary obligation failures', 'A dedicated cap for SDF-specific non-compliance', 'DPO appointment, DPIA, independent audit and algorithmic accountability failures'],
    ['General / residual non-compliance', 'A lower residual cap for other violations', 'Notice, consent-mechanics and general obligation failures not otherwise categorised'],
    ['Data Principal duties violations', 'A modest cap distinct from Data Fiduciary penalties', 'Applies to Data Principals themselves — e.g. furnishing false information'],
  ]
};

module.exports = [
  gapAssessmentChecklist,
  readinessWorksheet,
  glossaryQuickRef,
  complianceCalendar,
  consentNoticeChecklist,
  vendorDueDiligenceChecklist,
  boardBriefing,
  dpiaChecklist,
  breachChecklist,
  rightsRequestLog,
  penaltyReference
];
