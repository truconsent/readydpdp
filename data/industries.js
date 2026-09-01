module.exports = [
  {
    slug: 'bfsi',
    name: 'BFSI',
    fullName: 'Banking, Financial Services & Insurance',
    summary: 'High-volume, high-sensitivity personal and financial data processing under simultaneous DPDPA and RBI/IRDAI oversight.',
    risks: ['KYC and financial data qualify as high-sensitivity personal data requiring rigorous security safeguards', 'RBI data localisation mandates for payment systems apply alongside, not instead of, the DPDPA', 'Large legacy core-banking and CRM systems often predate any formal consent architecture', 'Cross-selling between group entities (banking, credit cards, mutual funds) raises Purpose Limitation questions', 'High rights-request volume expected once Data Principal awareness grows'],
    servicesNeeded: ['dpdp-gap-assessment', 'vendor-data-processor-due-diligence', 'cross-border-data-transfer-advisory', 'significant-data-fiduciary-compliance']
  },
  {
    slug: 'healthcare-life-sciences',
    name: 'Healthcare & Life Sciences',
    fullName: 'Healthcare & Life Sciences',
    summary: 'Health data processing that combines DPDPA obligations with medical confidentiality norms and, frequently, Legitimate Uses exemptions for emergency care.',
    risks: ['Health records are highly sensitive even though DPDPA does not use a separate "sensitive data" category', 'Deemed Consent and Legitimate Uses provisions for medical emergencies must be applied narrowly and correctly', 'Hospital networks and diagnostic chains often share data across legal entities without clear Data Processor agreements', 'Research and clinical trial data raises complex secondary-purpose and consent-scope questions', 'Patient rights requests (access, correction) intersect with medical record retention obligations under other laws'],
    servicesNeeded: ['dpdp-gap-assessment', 'consent-management-advisory', 'data-protection-impact-assessment', 'policy-notice-drafting']
  },
  {
    slug: 'edtech',
    name: 'EdTech',
    fullName: 'Education Technology',
    summary: 'Children\'s data at the centre of the product, triggering the DPDPA\'s strictest consent category.',
    risks: ['Verifiable Parental Consent is required wherever a child\'s personal data is processed', 'Behavioural tracking and targeted advertising to children face specific restrictions', 'Age-verification mechanisms are often weak or entirely absent in growth-stage EdTech products', 'School and institutional data-sharing arrangements frequently lack proper Data Processor terms', 'Rapid feature shipping cycles routinely outpace privacy review'],
    servicesNeeded: ['consent-management-advisory', 'dpdp-gap-assessment', 'policy-notice-drafting', 'employee-training-awareness']
  },
  {
    slug: 'ecommerce-d2c',
    name: 'E-commerce / D2C',
    fullName: 'E-commerce & Direct-to-Consumer',
    summary: 'High-frequency consent collection across marketing, personalisation and logistics, at consumer scale.',
    risks: ['Marketing consent is frequently bundled with account creation, failing the specificity standard', 'Third-party ad-tech and analytics SDKs create collection points product teams may not be aware of', 'Logistics partners handling name, address and phone number require proper Data Processor agreements', 'High-volume rights requests during sale periods can overwhelm ad hoc fulfilment processes', 'Retargeting and personalisation profiling needs explicit purpose disclosure'],
    servicesNeeded: ['consent-management-advisory', 'vendor-data-processor-due-diligence', 'data-principal-rights-fulfillment-setup']
  },
  {
    slug: 'saas-it',
    name: 'SaaS / IT Services',
    fullName: 'SaaS & IT Services',
    summary: 'B2B and B2B2C products where the company is frequently both a Data Fiduciary for its own users and a Data Processor for enterprise customers.',
    risks: ['Dual role as Data Fiduciary and Data Processor requires clear contractual and operational separation', 'Enterprise customers increasingly require DPDPA compliance evidence in security questionnaires', 'Multi-tenant architectures complicate per-customer data segregation and deletion', 'Cross-border engineering and support teams raise data-access and localisation questions', 'Sub-processor chains (cloud infra, monitoring, analytics tools) need systematic due diligence'],
    servicesNeeded: ['compliance-audit-certification-support', 'vendor-data-processor-due-diligence', 'dpo-as-a-service']
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    fullName: 'Manufacturing',
    summary: 'Lower consumer-facing exposure but significant employee, dealer and IoT sensor data footprint.',
    risks: ['Employee personal data (biometric attendance, payroll, health records) is often under-governed', 'Dealer and distributor personal data is frequently exchanged without formal agreements', 'IoT and factory-floor sensor data increasingly intersects with personal data where operators are identifiable', 'Legacy ERP and HR systems predate any DPDPA-aligned retention discipline', 'Vendor and contractor access to personal data is rarely audited'],
    servicesNeeded: ['dpdp-gap-assessment', 'employee-training-awareness', 'legacy-data-remediation']
  },
  {
    slug: 'government-psu',
    name: 'Government / PSU',
    fullName: 'Government & Public Sector Undertakings',
    summary: 'Unique exemption pathways under the Act alongside large-scale citizen data processing responsibilities.',
    risks: ['Certain government functions may qualify for specific exemptions, but scope must be assessed precisely, not assumed broadly', 'Citizen-scale data holdings carry outsized breach and misuse consequences', 'Interoperability with other government databases raises purpose-limitation and consent questions', 'Legacy systems built long before any privacy-by-design discipline existed', 'Public accountability and RTI obligations intersect with data protection duties in ways that need careful navigation'],
    servicesNeeded: ['dpdp-gap-assessment', 'data-protection-impact-assessment', 'board-leadership-dpdp-briefings']
  },
  {
    slug: 'insurance',
    name: 'Insurance',
    fullName: 'Insurance',
    summary: 'Health, financial and beneficiary data combined with actuarial profiling, under IRDAI and DPDPA oversight together.',
    risks: ['Underwriting profiling requires clear purpose disclosure and proportionality justification', 'Claims investigation data-sharing with third parties (hospitals, garages, assessors) needs formal Data Processor terms', 'Nomination and beneficiary data intersects directly with the DPDPA\'s own Nomination right', 'Agent networks handling personal data at point of sale are a common unmanaged risk', 'Legacy policy records often lack a documented consent trail'],
    servicesNeeded: ['data-protection-impact-assessment', 'vendor-data-processor-due-diligence', 'consent-management-advisory']
  },
  {
    slug: 'telecom',
    name: 'Telecom',
    fullName: 'Telecommunications',
    summary: 'Location, call and usage data at national scale, combined with existing sector-specific regulatory obligations.',
    risks: ['Call detail records and location data are highly sensitive and heavily used for secondary analytics', 'Existing telecom-specific regulations must be reconciled with DPDPA obligations rather than treated as a substitute', 'Partner and reseller networks create extended data-sharing chains', 'SIM registration and KYC processes are high-volume collection points needing consistent consent architecture', 'Law-enforcement and lawful-interception obligations intersect with, but do not eliminate, DPDPA duties for other processing'],
    servicesNeeded: ['dpdp-gap-assessment', 'significant-data-fiduciary-compliance', 'cross-border-data-transfer-advisory']
  },
  {
    slug: 'media-entertainment',
    name: 'Media & Entertainment',
    fullName: 'Media & Entertainment',
    summary: 'Audience data, viewing behaviour and increasingly personalised content recommendation engines.',
    risks: ['Viewing and engagement profiling for recommendations requires clear purpose disclosure', 'Advertising partnerships and data-sharing arrangements are frequently under-contracted', 'Children\'s content platforms carry the same Verifiable Parental Consent obligations as EdTech', 'User-generated content platforms face unique data-minimisation and moderation-data questions', 'Cross-platform identity resolution (web, app, connected TV) fragments consent state'],
    servicesNeeded: ['consent-management-advisory', 'policy-notice-drafting', 'dpdp-gap-assessment']
  },
  {
    slug: 'hrtech-staffing',
    name: 'HR-Tech / Staffing',
    fullName: 'HR-Tech & Staffing',
    summary: 'Candidate and employee personal data, including background checks and, increasingly, algorithmic screening tools.',
    risks: ['Background verification checks process highly sensitive personal data through third-party vendors', 'Algorithmic resume screening and candidate scoring tools need fairness and accuracy review', 'Candidate data retention after a hiring decision is frequently indefinite and undocumented', 'Client (employer) and candidate data flows create a three-party consent and disclosure structure', 'Cross-border staffing arrangements raise transfer questions for candidate data'],
    servicesNeeded: ['data-protection-impact-assessment', 'vendor-data-processor-due-diligence', 'policy-notice-drafting']
  },
  {
    slug: 'real-estate-proptech',
    name: 'Real Estate / PropTech',
    fullName: 'Real Estate & PropTech',
    summary: 'Buyer, tenant and financing data shared across a fragmented ecosystem of brokers, developers and lenders.',
    risks: ['Lead-generation forms often collect financial and identity data with minimal notice', 'Broker and channel-partner networks share personal data with no formal agreements', 'Site-visit and biometric access-control systems in gated communities process personal data with little governance', 'Financing and loan-referral partnerships intersect with BFSI-grade sensitivity without BFSI-grade controls', 'Long sales cycles mean stale lead data accumulates without a retention policy'],
    servicesNeeded: ['vendor-data-processor-due-diligence', 'consent-management-advisory', 'dpdp-gap-assessment']
  },
  {
    slug: 'logistics',
    name: 'Logistics',
    fullName: 'Logistics & Supply Chain',
    summary: 'Delivery, address and contact data at extremely high transaction volume, shared across multi-party fulfilment networks.',
    risks: ['Delivery partner apps and gig-worker platforms process personal data with inconsistent governance', 'Address and contact data is shared across a chain of fulfilment partners, warehouses and last-mile riders', 'Real-time location tracking of delivery personnel intersects with employee/gig-worker privacy expectations', 'High transaction volume makes rights-request fulfilment at scale a genuine operational challenge', 'E-commerce platform integrations create collection points logistics teams may not directly control'],
    servicesNeeded: ['vendor-data-processor-due-diligence', 'data-principal-rights-fulfillment-setup', 'dpdp-gap-assessment']
  }
];
