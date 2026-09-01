// 15 core consulting services offered by ReadyDPDP.
module.exports = [
  {
    slug: 'dpdp-gap-assessment',
    name: 'DPDP Gap Assessment',
    short: 'A structured audit of your current data practices against the DPDP Act 2023, producing a prioritised roadmap instead of a compliance checklist.',
    whatItIs: `A DPDP Gap Assessment is the diagnostic starting point for almost every engagement we run. We map what personal data your organisation actually collects, processes, stores and shares — not what your privacy policy says you do — and compare that reality against the obligations set out in the DPDP Act 2023 and the draft DPDP Rules, 2025. The output is not a scorecard; it is a prioritised, resourced roadmap that your leadership team can act on immediately.`,
    who: 'Any Data Fiduciary that has not yet had an independent, DPDPA-specific assessment — typically triggered by a board request, an upcoming funding round, a customer security questionnaire, or simply the realisation that "we think we\'re compliant" has never been tested.',
    process: [
      { title: 'Scoping & stakeholder mapping', body: 'We identify every business unit, product line and vendor relationship that touches personal data, and agree the assessment boundary with your leadership team.' },
      { title: 'Evidence collection', body: 'Structured interviews with product, engineering, legal, HR and marketing teams, combined with a review of policies, consent flows, contracts and system architecture.' },
      { title: 'Control testing', body: 'We test — not just ask about — consent capture, notice delivery, rights fulfilment turnaround, retention enforcement and vendor contracts against DPDPA requirements.' },
      { title: 'Gap scoring', body: 'Every finding is scored by regulatory exposure, remediation effort and business risk, so you know what to fix first.' },
      { title: 'Roadmap & readiness rating', body: 'We deliver a written report with a DPDP Readiness Level rating, a prioritised remediation roadmap, and a realistic timeline.' }
    ],
    deliverables: ['DPDP Gap Assessment Report (findings, evidence, risk ratings)', 'DPDP Readiness Level rating with justification', 'Prioritised remediation roadmap with owners and timelines', 'Executive summary deck for board or leadership review'],
    timeline: '2–5 weeks depending on organisational complexity and number of systems in scope.',
    faqs: [
      { q: 'How is a Gap Assessment different from a legal opinion?', a: 'A legal opinion tells you whether a clause is compliant on paper. A Gap Assessment tests whether your actual systems, consent flows and processes behave the way your paperwork claims — which is what a Data Protection Board inquiry or a customer audit will actually examine.' },
      { q: 'Do you need access to our production systems?', a: 'Not necessarily. Most assessments work from documentation, screen-shares, and structured interviews. Where deeper technical verification is needed — such as confirming consent checks fire before processing — we scope read-only access separately.' },
      { q: 'What happens after the assessment?', a: 'Most clients move into a remediation phase using the roadmap we deliver, either self-executed with our oversight or supported by our DPO-as-a-Service or implementation advisory tracks.' }
    ]
  },
  {
    slug: 'dpo-as-a-service',
    name: 'DPO-as-a-Service',
    short: 'Fractional Data Protection Officer coverage for organisations that need senior DPDPA expertise without a full-time hire.',
    whatItIs: `DPO-as-a-Service gives your organisation a named, experienced Data Protection Officer on retainer — someone who chairs your privacy governance, reviews new products and vendor contracts for DPDPA exposure, owns your grievance redressal process, and represents your organisation credibly to the Data Protection Board if it ever comes to that. Most mid-market organisations don't need a full-time DPO on day one; they need a senior one, part-time, from day one.`,
    who: 'Growth-stage companies and mid-market enterprises that process personal data at scale but are not yet ready — or required — to hire a full-time in-house Data Protection Officer.',
    process: [
      { title: 'Onboarding & baseline review', body: 'We review your current data inventory, policies and open risk items in the first two weeks, so we walk in with context, not a blank slate.' },
      { title: 'Governance cadence setup', body: 'We establish a recurring review cadence with product, engineering and legal — typically monthly — to keep new features and vendors on the radar before launch.' },
      { title: 'Grievance & rights request ownership', body: 'We act as (or directly support) your designated contact for Data Principal grievances and rights requests, tracking SLA compliance.' },
      { title: 'Ongoing advisory', body: 'On-call advisory for new product launches, vendor onboarding, marketing campaigns and incident triage.' },
      { title: 'Board & leadership reporting', body: 'Quarterly reporting to leadership or the board on your compliance posture, open risks and regulatory developments.' }
    ],
    deliverables: ['Named fractional DPO with defined monthly hours', 'Monthly governance review minutes and action log', 'Grievance redressal tracking and SLA reporting', 'Quarterly board-ready compliance report'],
    timeline: 'Ongoing retainer, typically starting at 3-month minimum terms with monthly renewal thereafter.',
    faqs: [
      { q: 'Can a fractional DPO satisfy the DPDPA requirement for Significant Data Fiduciaries?', a: 'Significant Data Fiduciaries are expected to appoint a DPO based in India who reports to the board and serves as the point of contact for grievance redressal. Depending on your scale, a fractional arrangement can serve as an interim or co-pilot model, but SDFs in particular should plan a transition path to a dedicated appointment — we help design that path.' },
      { q: 'What is the difference between DPO-as-a-Service and the Gap Assessment?', a: 'The Gap Assessment is a fixed-scope diagnostic project. DPO-as-a-Service is ongoing governance — many clients run a Gap Assessment first, then move into a DPO-as-a-Service retainer to implement and sustain the roadmap.' },
      { q: 'Who actually shows up to meetings?', a: 'You get a named lead consultant backed by our practice, not a rotating pool. Continuity of relationship is core to how this service is designed to work.' }
    ]
  },
  {
    slug: 'consent-management-advisory',
    name: 'Consent Management Advisory',
    short: 'Design or re-architect your consent capture, notice and withdrawal flows so they satisfy DPDPA\'s "free, specific, informed, unconditional and unambiguous" standard.',
    whatItIs: `Consent under the DPDPA has a precise bar: it must be free, specific, informed, unconditional and unambiguous, given through clear affirmative action, and as easy to withdraw as it was to give. Most legacy consent flows — a single "I agree to Terms & Privacy Policy" checkbox — fail this standard outright. We redesign your notice content, consent capture UI, purpose-level granularity and withdrawal mechanics so your consent record actually holds up as evidence.`,
    who: 'Any Data Fiduciary whose current consent flow bundles multiple purposes into one checkbox, lacks a clear withdrawal path, or was built for GDPR and never adapted to DPDPA\'s language and structure.',
    process: [
      { title: 'Consent inventory', body: 'We catalogue every point in your product and marketing stack where personal data is currently collected, and what — if anything — is disclosed at that point.' },
      { title: 'Purpose mapping', body: 'Each collection point is mapped to a specific, itemised purpose rather than a blanket "service delivery" label, per Section 5 notice requirements.' },
      { title: 'Notice & UX redesign', body: 'We draft plain-language notice copy in English and relevant scheduled languages, and redesign the capture UI for genuine affirmative action.' },
      { title: 'Withdrawal mechanics', body: 'We design a withdrawal flow that is at least as easy to use as the original consent flow, and specify what must happen downstream when consent is withdrawn.' },
      { title: 'Consent Artefact design', body: 'We define what a valid consent record must capture — timestamp, notice version, purpose, mechanism — so it is defensible as evidence later.' }
    ],
    deliverables: ['Consent inventory and purpose map', 'Redesigned notice copy and consent UI specifications', 'Withdrawal flow specification', 'Consent Artefact data schema recommendation'],
    timeline: '3–6 weeks depending on the number of products and collection points in scope.',
    faqs: [
      { q: 'Does DPDPA require a Consent Manager?', a: 'Consent Managers are a registered intermediary category under the DPDPA that Data Principals can optionally use to manage consent across multiple Data Fiduciaries. Using a Consent Manager is not mandatory for most Data Fiduciaries today, but your own consent architecture should be interoperable with that model as the ecosystem matures.' },
      { q: 'Can consent be bundled with Terms of Service?', a: 'No. Bundling consent for data processing with acceptance of unrelated terms undermines the "unconditional" requirement. We separate these explicitly in every redesign.' },
      { q: 'What about Deemed Consent scenarios?', a: 'The Act recognises certain Deemed Consent and Legitimate Uses scenarios — such as medical emergencies or compliance with a court order — where explicit consent is not required. We help you correctly classify which of your processing activities genuinely qualify, rather than over- or under-claiming the exemption.' }
    ]
  },
  {
    slug: 'data-principal-rights-fulfillment-setup',
    name: 'Data Principal Rights (DPR) Fulfillment Setup',
    short: 'Build an operational process — not just a form — for handling access, correction, erasure and grievance requests within a defensible turnaround time.',
    whatItIs: `Data Principals have the right to access a summary of their personal data and processing activities, request correction or erasure, nominate another individual to exercise their rights in the event of death or incapacity, and lodge a grievance. Publishing an email address is not fulfilment infrastructure. We design and stand up the intake, verification, routing, and response workflow that lets you actually meet these rights within a defensible timeframe.`,
    who: 'Data Fiduciaries that currently route rights requests through a generic support inbox with no SLA, verification step, or audit trail.',
    process: [
      { title: 'Rights intake design', body: 'We design a structured intake form and identity verification step calibrated to your risk profile — not so weak it invites fraud, not so heavy it becomes a barrier.' },
      { title: 'Internal routing map', body: 'We map which internal system or team owns fulfilment for each right (access, correction, erasure, nomination, withdrawal) across your data landscape.' },
      { title: 'SLA & escalation design', body: 'We define target turnaround times per request type and an escalation path for requests that risk breaching them.' },
      { title: 'Grievance Redressal Officer process', body: 'We define the process your designated Grievance Redressal Officer follows, including how unresolved grievances are documented ahead of a potential Data Protection Board complaint.' },
      { title: 'Audit trail & reporting', body: 'We specify what must be logged for every request so you can demonstrate compliance retrospectively.' }
    ],
    deliverables: ['Rights request intake form and verification workflow', 'Internal routing and ownership map', 'SLA and escalation policy document', 'Grievance Redressal Officer runbook'],
    timeline: '3–4 weeks for design; ongoing support available for the first operating quarter.',
    faqs: [
      { q: 'How fast must we respond to a rights request?', a: 'The DPDPA does not fix a single universal number in the Act itself, but the draft Rules propose specific timelines for certain request types, and regulatory expectation is prompt, good-faith action. We calibrate your internal SLA to the emerging Rules and to your operational reality, then build the process to actually hit it.' },
      { q: 'Do we need a separate portal?', a: 'Not necessarily. A well-designed intake form and internal routing process can satisfy the requirement without a dedicated self-service portal — though a portal reduces manual load significantly at scale, and we can advise on when that investment makes sense.' },
      { q: 'What is Nomination and do we need to support it?', a: 'Nomination lets a Data Principal designate another individual to exercise their rights in the event of death or incapacity. It is a right under the Act, so your fulfilment process needs a defined path for it, even if request volume is currently low.' }
    ]
  },
  {
    slug: 'breach-response-notification-readiness',
    name: 'Breach Response & Notification Readiness',
    short: 'Build the incident response plan, escalation chain and Data Protection Board notification playbook before you need it — not during.',
    whatItIs: `A personal data breach under the DPDPA triggers notification obligations to both the Data Protection Board and affected Data Principals. Building that process during an actual incident is how organisations miss deadlines, notify incorrectly, or under-communicate to regulators. We build your breach classification criteria, escalation chain, notification templates and DPB communication playbook in advance, and run a tabletop exercise to pressure-test it.`,
    who: 'Any Data Fiduciary — but especially Significant Data Fiduciaries and organisations in regulated sectors (BFSI, healthcare, insurance) where breach exposure carries the highest business and reputational risk.',
    process: [
      { title: 'Breach classification framework', body: 'We define what constitutes a notifiable personal data breach for your organisation, distinguishing it from routine security events.' },
      { title: 'Escalation chain design', body: 'We map exactly who is notified, in what order, and within what internal timeframe once a suspected breach is identified.' },
      { title: 'Notification templates', body: 'We draft ready-to-adapt notification templates for the Data Protection Board and for affected Data Principals, aligned to draft Rules requirements.' },
      { title: 'Vendor breach clauses review', body: 'We review your Data Processor contracts to confirm they obligate vendors to notify you promptly of any breach on their side.' },
      { title: 'Tabletop exercise', body: 'We run a simulated breach scenario with your team to test the plan under time pressure and close any gaps found.' }
    ],
    deliverables: ['Breach classification and severity framework', 'Escalation chain and RACI document', 'DPB and Data Principal notification templates', 'Tabletop exercise report with findings'],
    timeline: '3–5 weeks including one tabletop simulation session.',
    faqs: [
      { q: 'How quickly must a breach be reported?', a: 'The draft DPDP Rules propose that the Data Protection Board be notified without delay, with a more detailed report to follow within a fixed window. Given how tight this is, the plan and templates must exist before an incident, not be drafted during one — that is the entire premise of this service.' },
      { q: 'Does every security incident need to be reported?', a: 'No — but every security incident needs to be triaged against your breach classification framework quickly enough to make that call within the notification window. That triage speed is exactly what we design for.' },
      { q: 'Do you help during an actual live incident?', a: 'Yes, existing readiness clients can engage our Incident Response Retainer service for live incident support; this service is specifically about building the plan in advance.' }
    ]
  },
  {
    slug: 'vendor-data-processor-due-diligence',
    name: 'Vendor / Data Processor Due Diligence',
    short: 'Assess and contractually secure every third party that processes personal data on your behalf, closing the biggest blind spot in most compliance programmes.',
    whatItIs: `Under the DPDPA, a Data Fiduciary remains accountable for personal data processed on its behalf by a Data Processor — outsourcing the activity does not outsource the liability. We inventory every vendor with data access, assess their DPDPA posture, and rework your Data Processing Agreements so obligations, breach notification duties, sub-processing restrictions and audit rights are actually enforceable.`,
    who: 'Organisations relying on cloud infrastructure providers, SaaS tools, BPOs, marketing platforms, or outsourced customer support — which, in practice, is nearly every modern company.',
    process: [
      { title: 'Vendor inventory', body: 'We catalogue every third party with access to personal data, the categories of data involved, and the purpose of the relationship.' },
      { title: 'Risk tiering', body: 'Vendors are tiered by data sensitivity and access scope, so due diligence effort is focused where exposure is highest.' },
      { title: 'DPA contract review', body: 'We review and redline existing Data Processing Agreements against DPDPA obligations — instruction-bound processing, breach notification duties, deletion on termination, sub-processor controls.' },
      { title: 'Diligence questionnaires', body: 'We design a standard due diligence questionnaire your team can reuse for future vendor onboarding.' },
      { title: 'Remediation tracking', body: 'We track outstanding contract amendments and vendor commitments to closure.' }
    ],
    deliverables: ['Full vendor and Data Processor inventory with risk tiers', 'Redlined DPA templates and clause library', 'Reusable vendor due diligence questionnaire', 'Remediation tracker with owners and status'],
    timeline: '4–8 weeks depending on vendor count and contract renegotiation complexity.',
    faqs: [
      { q: 'Are we liable for our vendor\'s breach?', a: 'Liability allocation depends on your contract and the specifics of the incident, but the Data Fiduciary bears primary regulatory accountability for personal data processed on its behalf. Strong contracts and diligence reduce your exposure; they do not eliminate the underlying obligation.' },
      { q: 'Do all vendors need a formal DPA?', a: 'Any third party processing personal data on your instructions should have contractual terms addressing DPDPA-relevant obligations, scaled to their risk tier — a payroll processor and a transactional email provider warrant different depths of review.' },
      { q: 'How often should vendor due diligence be refreshed?', a: 'We recommend an annual refresh at minimum, plus a lightweight review triggered whenever a vendor changes its subprocessors, infrastructure region, or service scope.' }
    ]
  },
  {
    slug: 'data-protection-impact-assessment',
    name: 'Data Protection Impact Assessment (DPIA)',
    short: 'A structured, evidence-based assessment of privacy risk for high-risk processing activities, required for Significant Data Fiduciaries and good practice for everyone else.',
    whatItIs: `A DPIA is a structured evaluation of the necessity, proportionality and risk of a specific processing activity — typically triggered by new products, sensitive processing, large-scale profiling, or a change in purpose. Significant Data Fiduciaries are required to conduct DPIAs periodically; we recommend the discipline to any organisation launching a materially new use of personal data.`,
    who: 'Significant Data Fiduciaries with a periodic DPIA obligation, and any organisation launching a new product, AI feature, or processing activity that materially changes what personal data is collected or how it is used.',
    process: [
      { title: 'Trigger assessment', body: 'We confirm whether the activity in question genuinely warrants a DPIA versus a lighter-weight privacy check.' },
      { title: 'Data flow mapping', body: 'We map the specific data flows, systems and third parties involved in the activity under assessment.' },
      { title: 'Necessity & proportionality test', body: 'We evaluate whether the data collected is minimised to what is genuinely necessary for the stated purpose.' },
      { title: 'Risk scoring', body: 'We score identified risks by likelihood and severity to Data Principals, not just to the business.' },
      { title: 'Mitigation plan & sign-off', body: 'We produce a mitigation plan and a formal DPIA report suitable for board or regulator review.' }
    ],
    deliverables: ['Completed DPIA report with risk register', 'Data flow diagram for the assessed activity', 'Mitigation plan with owners and timelines', 'DPIA template your team can reuse internally'],
    timeline: '2–4 weeks per assessed activity.',
    faqs: [
      { q: 'Who is legally required to conduct DPIAs?', a: 'Significant Data Fiduciaries are required under the DPDPA to conduct DPIAs and data audits periodically. Other Data Fiduciaries are not statutorily required to, but conducting DPIAs for high-risk launches is strong practice and forms useful evidence of due diligence.' },
      { q: 'What counts as a "high-risk" processing activity?', a: 'Large-scale profiling, processing of children\'s data, sensitive processing contexts, new AI-driven decisioning, and any activity involving a significant change in purpose or scale are common triggers we screen for.' },
      { q: 'Can a DPIA be done retroactively for an existing product?', a: 'Yes, and we frequently run these as part of a broader Gap Assessment — retroactive DPIAs often surface the highest-value remediation items in the entire programme.' }
    ]
  },
  {
    slug: 'significant-data-fiduciary-compliance',
    name: 'Significant Data Fiduciary (SDF) Compliance',
    short: 'The enhanced obligation set for organisations the Central Government designates as Significant Data Fiduciaries — DPO appointment, DPIAs, audits and algorithmic accountability.',
    whatItIs: `Significant Data Fiduciaries — designated by the Central Government based on factors like data volume, sensitivity, and risk to sovereignty or electoral democracy — carry an enhanced compliance tier: appointing a India-based Data Protection Officer reporting to the board, appointing an independent data auditor, conducting periodic DPIAs and data audits, and evaluating algorithmic systems used for processing. We build the governance structure this designation requires.`,
    who: 'Organisations designated (or expecting to be designated) as a Significant Data Fiduciary — typically large-scale digital platforms, financial institutions and data-intensive enterprises.',
    process: [
      { title: 'Designation exposure review', body: 'We assess how likely your organisation is to be designated an SDF based on published criteria and comparable precedents, so you can plan ahead of formal notification.' },
      { title: 'Governance structure design', body: 'We design the board reporting line, DPO mandate, and independent auditor engagement model the SDF tier requires.' },
      { title: 'Periodic DPIA & audit programme', body: 'We stand up a recurring DPIA and data audit cadence rather than a one-off exercise.' },
      { title: 'Algorithmic accountability review', body: 'We assess algorithmic systems used in processing for bias, accuracy and risk to Data Principals, as the enhanced obligations require.' },
      { title: 'Cross-border transfer controls', body: 'We review your cross-border data flows against any government-notified restrictions applicable to your sector.' }
    ],
    deliverables: ['SDF designation exposure assessment', 'Board governance and DPO reporting structure design', 'Recurring DPIA and audit programme charter', 'Algorithmic accountability review report'],
    timeline: '6–10 weeks for the full governance build-out; ongoing retainer support recommended thereafter.',
    faqs: [
      { q: 'How does an organisation know it is a Significant Data Fiduciary?', a: 'The Central Government notifies specific Data Fiduciaries or classes of Data Fiduciaries as Significant, based on criteria such as volume and sensitivity of personal data processed, risk to Data Principal rights, and impact on sovereignty and electoral democracy. We track notified criteria and precedent to help you assess exposure ahead of formal designation.' },
      { q: 'What is different about an SDF\'s DPO requirement versus a standard Data Fiduciary?', a: 'SDFs must appoint a DPO based in India who reports directly to the board or an equivalent governing body and acts as the point of contact for grievance redressal — a materially higher bar than the general obligation to have a designated contact person.' },
      { q: 'Is the independent data audit the same as our Gap Assessment?', a: 'No. The independent data audit is an ongoing statutory obligation performed by an independent auditor as part of your governance programme; our Gap Assessment is typically the diagnostic that precedes and informs your readiness for that audit programme.' }
    ]
  },
  {
    slug: 'policy-notice-drafting',
    name: 'Policy & Notice Drafting',
    short: 'Plain-language privacy notices, internal data protection policies and process documentation that satisfy DPDPA disclosure requirements without legal jargon.',
    whatItIs: `Section 5 of the DPDPA requires that notice be given in clear and plain language, itemising the personal data collected and the purpose of processing, before or at the time of collection. Most existing privacy policies were written for GDPR, by a law firm, for a lawyer to read. We rewrite your external notices and internal policies so they are legally sound and genuinely understandable to the people they govern.`,
    who: 'Organisations whose privacy policy has not been rewritten since before DPDPA, or that operate without documented internal data handling, retention, or access-control policies.',
    process: [
      { title: 'Content audit', body: 'We review existing notices and policies against DPDPA disclosure and content requirements.' },
      { title: 'Purpose-level notice drafting', body: 'We draft itemised, purpose-specific notice content rather than a single catch-all disclosure.' },
      { title: 'Internal policy suite', body: 'We draft or update the internal policy set — data retention, access control, acceptable use, vendor management — that supports your external commitments.' },
      { title: 'Plain-language review', body: 'Every document is reviewed for readability against a plain-language standard, not just legal accuracy.' },
      { title: 'Multi-language localisation guidance', body: 'We advise on which scheduled languages your notice should be available in given your user base.' }
    ],
    deliverables: ['Redrafted privacy notice(s), purpose-itemised', 'Internal data protection policy suite', 'Retention schedule template', 'Plain-language review checklist for future updates'],
    timeline: '3–5 weeks depending on the number of products and policies in scope.',
    faqs: [
      { q: 'Do we need a separate notice for each product?', a: 'If products collect meaningfully different data for different purposes, yes — a single blended notice tends to fail the specificity requirement. We assess your product portfolio and recommend the right notice architecture.' },
      { q: 'What language must the notice be in?', a: 'The Act requires notice content to be available in English or any language specified in the Eighth Schedule to the Constitution, at the Data Principal\'s option. We help you decide which languages are practically necessary based on your user base.' },
      { q: 'Will you also handle the website implementation?', a: 'We deliver the content and UX specification; implementation is typically handled by your engineering or web team, with our review before launch.' }
    ]
  },
  {
    slug: 'employee-training-awareness',
    name: 'Employee Training & Awareness',
    short: 'Role-specific DPDPA training for engineering, product, marketing, HR and support teams — the people who make daily data decisions.',
    whatItIs: `Policies fail when the people making daily decisions — the engineer adding a new form field, the marketer building a campaign list, the support agent handling a rights request — don't understand what the DPDPA requires of them specifically. We build role-specific training, not one generic all-hands deck, so each function understands its own obligations and failure points.`,
    who: 'Any organisation rolling out a new privacy programme, onboarding new hires into data-handling roles, or preparing for an audit that will test staff awareness, not just documentation.',
    process: [
      { title: 'Role mapping', body: 'We identify which functions handle personal data and what decisions each role actually makes that carry DPDPA exposure.' },
      { title: 'Curriculum design', body: 'We build separate, role-specific modules — engineering, product, marketing, HR, customer support, leadership — rather than a single generic session.' },
      { title: 'Live or recorded delivery', body: 'Sessions are delivered live with Q&A, or recorded for scalable onboarding, based on your team size and structure.' },
      { title: 'Scenario-based assessment', body: 'We include realistic scenario questions so training measures applied understanding, not just attendance.' },
      { title: 'Refresher cadence design', body: 'We recommend a refresher and new-hire onboarding cadence to keep awareness current as the law and your product evolve.' }
    ],
    deliverables: ['Role-specific training modules and materials', 'Live training session delivery (or recorded assets)', 'Scenario-based assessment questions', 'Annual refresher training plan'],
    timeline: '2–4 weeks to design and deliver initial rollout; ongoing refreshers available.',
    faqs: [
      { q: 'Is DPDPA training mandatory?', a: 'The Act does not mandate a specific training programme, but demonstrating that staff understand and follow your data protection policies is core evidence of the "reasonable security safeguards" and governance obligations the Act expects — and it materially reduces your actual incident rate.' },
      { q: 'How long is a typical session?', a: 'Role-specific modules typically run 45–75 minutes, kept tight and scenario-driven rather than lecture-style, with separate content for each function rather than a single long session for everyone.' },
      { q: 'Can this be bundled with onboarding for new hires?', a: 'Yes — many clients fold the recorded modules into standard new-hire onboarding so awareness doesn\'t lapse as teams grow.' }
    ]
  },
  {
    slug: 'cross-border-data-transfer-advisory',
    name: 'Cross-Border Data Transfer Advisory',
    short: 'Navigate the DPDPA\'s transfer regime — permitted by default, subject to government-notified country and sector restrictions.',
    whatItIs: `Unlike GDPR's adequacy-based model, the DPDPA permits cross-border transfer of personal data by default, subject to restrictions the Central Government may notify for specific countries or contexts, and subject to any sector-specific data localisation requirements (such as RBI mandates for payments data). We assess your current data flows against notified restrictions and sector rules, and advise on contractual and architectural safeguards.`,
    who: 'Organisations using offshore infrastructure, global SaaS vendors, outsourced processing, or operating in regulated sectors with existing localisation mandates (BFSI, payments, insurance).',
    process: [
      { title: 'Cross-border flow mapping', body: 'We map every instance where personal data leaves India — cloud regions, vendor locations, group company transfers, outsourced support.' },
      { title: 'Restriction screening', body: 'We screen each destination against currently notified government restrictions and applicable sectoral rules.' },
      { title: 'Sectoral overlay review', body: 'For regulated sectors, we layer in sector-specific localisation requirements (e.g. RBI payment data storage rules) that operate alongside the DPDPA.' },
      { title: 'Contractual safeguards', body: 'We recommend contractual protections with offshore processors even where the transfer itself is currently unrestricted.' },
      { title: 'Change monitoring', body: 'We flag your exposure to future government notifications so a new restriction doesn\'t catch your architecture off guard.' }
    ],
    deliverables: ['Cross-border data flow map', 'Restriction and sectoral rule screening report', 'Recommended contractual safeguards', 'Ongoing regulatory change monitoring brief'],
    timeline: '2–4 weeks for the initial assessment.',
    faqs: [
      { q: 'Is cross-border transfer banned under DPDPA?', a: 'No. The default position is permissive — transfer is allowed unless the Central Government has specifically restricted transfer to a particular country or territory. This is a materially different model from GDPR\'s adequacy-first approach.' },
      { q: 'Does DPDPA override RBI\'s payment data localisation rules?', a: 'No — sectoral regulations like RBI\'s data storage requirements for payment systems continue to apply independently. A payments company must satisfy both regimes simultaneously, and we assess both together.' },
      { q: 'What happens if a country we transfer to gets restricted later?', a: 'You would need to unwind or restructure that data flow within whatever transition period is specified. This is exactly the exposure we flag proactively so it doesn\'t become an emergency migration.' }
    ]
  },
  {
    slug: 'compliance-audit-certification-support',
    name: 'Compliance Audit & Certification Support',
    short: 'Prepare for internal audits, independent data audits, and customer or partner security-and-privacy due diligence with organised, defensible evidence.',
    whatItIs: `Whether it's a customer's vendor security questionnaire, an investor's diligence process, or a Significant Data Fiduciary's independent data audit obligation, being audit-ready means having organised, retrievable evidence — not scrambling to reconstruct your compliance posture under deadline pressure. We build your audit evidence repository and represent your programme credibly to external reviewers.`,
    who: 'Organisations facing an upcoming customer security review, funding diligence, SDF-mandated independent audit, or simply wanting audit-grade documentation discipline before they need it.',
    process: [
      { title: 'Evidence repository build', body: 'We organise your policies, consent records, DPIAs, vendor contracts and training records into a structured, retrievable evidence set.' },
      { title: 'Control mapping', body: 'We map each piece of evidence to the specific DPDPA obligation it demonstrates, so gaps are visible before an auditor finds them.' },
      { title: 'Mock audit', body: 'We run a mock audit interview to pressure-test your team\'s ability to answer questions confidently and consistently.' },
      { title: 'Auditor liaison', body: 'For engagements involving an external or independent auditor, we can support or lead the liaison process.' },
      { title: 'Remediation sprint', body: 'We close any gaps surfaced by the mock audit before the real one begins.' }
    ],
    deliverables: ['Structured compliance evidence repository', 'Control-to-evidence mapping document', 'Mock audit report with findings', 'Pre-audit remediation sprint plan'],
    timeline: '3–6 weeks depending on audit scope and existing documentation maturity.',
    faqs: [
      { q: 'Is this the same as the independent data audit required of Significant Data Fiduciaries?', a: 'No — that audit must be conducted by an independent data auditor as defined under the Act. This service prepares you to pass that audit (or any customer/investor review) with organised, defensible evidence; it does not replace the independent auditor\'s role.' },
      { q: 'How long does evidence organisation typically take?', a: 'For organisations with an existing Gap Assessment or DPO-as-a-Service engagement, evidence is often already substantially organised. For a first-time build, plan for several weeks depending on how distributed your documentation currently is.' },
      { q: 'Can you represent us directly to a customer\'s security team?', a: 'Yes, we frequently join customer or partner due diligence calls directly to answer technical and process questions on your behalf.' }
    ]
  },
  {
    slug: 'incident-response-retainer',
    name: 'Incident Response Retainer',
    short: 'On-call DPDPA-specific incident support when a suspected breach or regulatory inquiry happens — not a generic cybersecurity retainer.',
    whatItIs: `A cybersecurity incident response retainer handles the technical containment of a breach. This retainer handles the regulatory and Data Principal-facing dimension: classifying whether the incident is a notifiable personal data breach, drafting the Data Protection Board notification, coordinating Data Principal communication, and managing the compliance timeline under pressure — alongside, not instead of, your technical responders.`,
    who: 'Organisations that have completed Breach Response & Notification Readiness and want guaranteed, on-call DPDPA-specific support during an actual live incident.',
    process: [
      { title: 'Retainer activation protocol', body: 'A defined hotline and activation process so you can reach us within a guaranteed response window the moment an incident is suspected.' },
      { title: 'Breach classification support', body: 'We help your team classify the incident against your breach framework in real time, under deadline pressure.' },
      { title: 'DPB notification drafting', body: 'We draft and refine the Data Protection Board notification using your pre-built templates, adapted to the specific incident.' },
      { title: 'Data Principal communication', body: 'We advise on and help draft affected-user communication that is accurate, compliant, and does not create unnecessary panic or legal exposure.' },
      { title: 'Post-incident review', body: 'After resolution, we run a structured post-incident review to close any process gaps the incident exposed.' }
    ],
    deliverables: ['Guaranteed activation hotline and response SLA', 'Live breach classification support', 'DPB and Data Principal notification drafts', 'Post-incident review report'],
    timeline: 'Ongoing retainer with a guaranteed activation response time; requires prior Breach Response & Notification Readiness engagement.',
    faqs: [
      { q: 'How is this different from our cybersecurity incident responder?', a: 'Your cybersecurity team contains and remediates the technical incident. We handle the parallel regulatory and communications workstream — classification, DPB notification, Data Principal communication — which runs on its own strict clock.' },
      { q: 'What is the guaranteed response time?', a: 'Response windows are set per retainer tier and agreed in advance; typical arrangements guarantee initial response within a few hours of activation, seven days a week.' },
      { q: 'Do we need the Readiness engagement first?', a: 'Yes — this retainer assumes your classification framework, escalation chain and templates already exist. Without that foundation, incident response starts from zero at the worst possible moment.' }
    ]
  },
  {
    slug: 'legacy-data-remediation',
    name: 'Legacy Data Remediation',
    short: 'Bring years of historically collected personal data — with no clear consent trail or purpose record — into a defensible, compliant state.',
    whatItIs: `Most organisations didn't start collecting personal data the day the DPDPA was enacted. Years of legacy databases, marketing lists, and archived records often have no clear consent trail, unclear or expired purpose, and no retention discipline. We assess this legacy data, classify what can be retained, what requires fresh consent or a Legitimate Uses justification, and what should be securely purged.`,
    who: 'Organisations with data collected before a formal privacy programme existed — common after mergers, legacy CRM migrations, or simply years of ungoverned growth.',
    process: [
      { title: 'Legacy data discovery', body: 'We identify historical databases, archives and lists that predate your current consent and governance practices.' },
      { title: 'Provenance assessment', body: 'For each dataset, we assess what consent or legal basis evidence exists, if any, and how reliable it is.' },
      { title: 'Classification & disposition', body: 'Each dataset is classified: retain with existing basis, seek fresh consent, justify under a Legitimate Use, or purge.' },
      { title: 'Purge or re-consent execution plan', body: 'We design the technical and communication plan for executing purges or re-consent campaigns at scale.' },
      { title: 'Retention policy going forward', body: 'We close the loop with a retention schedule so legacy data debt doesn\'t reaccumulate.' }
    ],
    deliverables: ['Legacy data inventory and provenance assessment', 'Dataset-by-dataset disposition classification', 'Purge and re-consent execution plan', 'Forward-looking retention schedule'],
    timeline: '4–8 weeks depending on the number and size of legacy data sources.',
    faqs: [
      { q: 'Do we need consent for data collected before the DPDPA existed?', a: 'The Act generally applies to personal data processed on or after the effective date, regardless of when it was originally collected, and includes provisions addressing data collected before the Act\'s commencement. In practice this means most legacy holdings need to be brought into a defensible basis rather than assumed grandfathered — we assess this precisely for your specific holdings.' },
      { q: 'What if we can\'t reach people to get fresh consent?', a: 'Where re-consent isn\'t practically achievable at scale, purging the unusable portion of the dataset is often the correct and lower-risk disposition — we help you make that call by segment, not as an all-or-nothing decision.' },
      { q: 'Is this a one-time project?', a: 'The initial remediation is a project, but the retention policy we leave you with is designed to prevent the same debt from re-accumulating — that\'s an ongoing operational discipline, not a one-time fix.' }
    ]
  },
  {
    slug: 'board-leadership-dpdp-briefings',
    name: 'Board & Leadership DPDP Briefings',
    short: 'Concise, decision-focused DPDPA briefings for boards and executive teams who need to govern the risk, not implement it.',
    whatItIs: `Boards and C-suite leaders need a fundamentally different DPDPA briefing than an engineering team does: what is our actual exposure, what decisions do we need to make, what is this going to cost, and what happens if we do nothing. We deliver focused briefings — typically 60–90 minutes — that translate the Gap Assessment findings and regulatory landscape into decisions the leadership team can actually make.`,
    who: 'Boards and executive teams ahead of a funding round, IPO readiness process, major product launch, or simply as part of annual governance reporting.',
    process: [
      { title: 'Briefing scoping', body: 'We align with your leadership on the specific decisions the briefing needs to support — budget approval, risk sign-off, strategic direction.' },
      { title: 'Findings translation', body: 'We translate technical Gap Assessment or audit findings into business risk and financial exposure language.' },
      { title: 'Peer and sector benchmarking', body: 'We contextualise your posture against sector peers and known enforcement trends where public information allows.' },
      { title: 'Decision framing', body: 'We present a small number of clear, resourced decision options rather than an open-ended list of risks.' },
      { title: 'Q&A and follow-up brief', body: 'We field board questions live and leave a concise written brief for the minutes.' }
    ],
    deliverables: ['Board-ready briefing deck', 'Live 60–90 minute briefing session', 'Written summary brief for board minutes', 'Follow-up Q&A memo'],
    timeline: '1–2 weeks to prepare; delivered as a single scheduled session.',
    faqs: [
      { q: 'Do you present the briefing yourselves or train our team to present it?', a: 'Either — most clients have us present directly given the technical grounding required to field board questions confidently, but we can also prepare and coach an internal presenter.' },
      { q: 'Is this useful without a prior Gap Assessment?', a: 'It\'s most valuable following an assessment or audit, since there are then concrete findings to translate. Without one, we can still deliver a general DPDPA exposure and obligations briefing, but recommend an assessment as the natural next step.' },
      { q: 'How often should boards receive these briefings?', a: 'We recommend at least annually, with an additional briefing ahead of any major event — funding round, IPO, new market entry, or M&A — that changes your data risk profile.' }
    ]
  }
];
