// DPDP Readiness Levels — a 6-level maturity model (0-5).
module.exports = [
  {
    level: 0,
    name: 'Unaware',
    slug: 'level-0-unaware',
    summary: 'The organisation has not yet mapped its DPDPA obligations or begun a formal privacy programme. Personal data practices are undocumented and largely undiscussed.',
    criteria: [
      'No one is formally accountable for data protection compliance',
      'No inventory of personal data collected, processed or shared exists',
      'Privacy policy, if it exists, predates the DPDPA and was never updated',
      'No process exists for handling a Data Principal rights request',
      'Leadership has not discussed DPDPA exposure at board level'
    ],
    orgProfile: 'Typically an early-stage company, a traditional business newly building digital products, or an SME that has simply never had reason to look closely at data protection law until now — a customer, investor or partner recently raised the question.',
    risks: 'Complete exposure to enforcement action with no mitigating evidence of good-faith effort. A single customer security questionnaire, funding diligence process, or Data Principal complaint can stall a deal or trigger a regulatory inquiry the organisation has no way to respond to credibly.',
    pathToAdvance: 'The starting point is always a DPDP Gap Assessment — you cannot fix what hasn\'t been mapped. This single engagement typically moves an organisation from Level 0 to a clear-eyed Level 1 within weeks, with a resourced roadmap to Level 2 and beyond.'
  },
  {
    level: 1,
    name: 'Aware',
    slug: 'level-1-aware',
    summary: 'Leadership understands DPDPA applies to the organisation and roughly what it requires, but no structured programme, ownership, or documentation exists yet.',
    criteria: [
      'Leadership has acknowledged DPDPA applicability in principle',
      'No dedicated owner or DPO — awareness has not yet translated into accountability',
      'Ad-hoc, undocumented understanding of what data is collected',
      'No consent, notice, or rights-fulfilment process changes have been made',
      'Compliance is discussed reactively, usually triggered by an external question'
    ],
    orgProfile: 'An organisation whose leadership has read about the DPDPA, discussed it at a leadership meeting, or been prompted by a customer or investor question — but has not yet assigned ownership or begun structured work.',
    risks: 'Awareness without action creates a specific liability: it becomes harder to argue good-faith ignorance once the organisation has demonstrably known about its obligations. Delay compounds regulatory and reputational exposure rather than reducing it.',
    pathToAdvance: 'Assign a formal owner — even a fractional DPO — and commission a Gap Assessment to convert awareness into a scoped, resourced plan. This is the single highest-leverage step at this stage.'
  },
  {
    level: 2,
    name: 'Developing',
    slug: 'level-2-developing',
    summary: 'A Gap Assessment or equivalent diagnostic has been completed and remediation work has started, but coverage is partial and inconsistent across the organisation.',
    criteria: [
      'A Gap Assessment or comparable diagnostic has been completed',
      'A remediation roadmap exists but is only partially executed',
      'Some products or teams have updated consent flows; others have not',
      'A designated contact person for grievances may exist but process is informal',
      'Vendor contracts are being reviewed but not yet systematically remediated'
    ],
    orgProfile: 'An organisation actively working through its first remediation cycle — often 3 to 9 months into a programme, with visible progress but real gaps remaining between products, business units or legacy systems.',
    risks: 'Partial compliance is genuinely better than none, but inconsistency itself is a risk: a Data Protection Board inquiry or audit will surface the weakest link, not average across your strongest efforts. Momentum lost here often stalls programmes indefinitely.',
    pathToAdvance: 'Complete the roadmap systematically rather than opportunistically. This is where a DPO-as-a-Service retainer or structured implementation support prevents the programme from losing steam once initial urgency fades.'
  },
  {
    level: 3,
    name: 'Defined',
    slug: 'level-3-defined',
    summary: 'Documented policies, consent flows and rights-fulfilment processes exist consistently across the organisation, with clear ownership — but operational maturity and testing are still developing.',
    criteria: [
      'DPDPA-aligned privacy notice and internal policy suite is complete and current',
      'Consent flows meet the free, specific, informed, unconditional and unambiguous standard across products',
      'A documented, owned process exists for Data Principal rights requests with a target SLA',
      'Vendor Data Processing Agreements have been reviewed and substantially remediated',
      'A named DPO or equivalent owner exists, even if fractional'
    ],
    orgProfile: 'A well-run mid-market organisation with a completed remediation programme behind it — policies and processes exist and are followed, but haven\'t yet been stress-tested by a real incident, audit, or high-volume rights request period.',
    risks: 'Documented process is not the same as proven process. Untested breach response plans, rights-fulfilment SLAs that have never handled a volume spike, and policies no one has audited for actual adherence are the gaps most likely to surface at the worst moment.',
    pathToAdvance: 'Test what you\'ve built: run a breach response tabletop exercise, conduct an internal audit of actual adherence to documented process, and formalise a recurring governance cadence rather than treating the programme as a completed project.'
  },
  {
    level: 4,
    name: 'Managed',
    slug: 'level-4-managed',
    summary: 'Compliance operates as an ongoing, monitored discipline with recurring audits, tested incident response, and governance embedded into product and vendor lifecycle decisions.',
    criteria: [
      'Recurring internal audits confirm actual adherence to documented policy, not just its existence',
      'Breach response plan has been tested via tabletop exercise or a real incident',
      'New products and vendor relationships are screened for DPDPA impact before launch, not after',
      'Rights request fulfilment consistently meets defined SLAs with reporting to leadership',
      'Board or leadership receives regular compliance reporting, not just at initial rollout'
    ],
    orgProfile: 'An organisation where privacy has moved from project to operating discipline — often a Significant Data Fiduciary or a company operating in a high-scrutiny sector (BFSI, healthcare, large-scale consumer platforms) where sustained rigor is a competitive and regulatory necessity.',
    risks: 'The main risk at this level is complacency and drift as the organisation scales, launches new products, or enters new markets faster than governance processes can absorb. Managed maturity requires active maintenance, not a one-time achievement.',
    pathToAdvance: 'Formalise continuous improvement: benchmark against evolving Rules and enforcement precedent, extend algorithmic and AI-specific review where relevant, and treat Optimised maturity as an explicit, resourced goal rather than an assumption.'
  },
  {
    level: 5,
    name: 'Optimised',
    slug: 'level-5-optimised',
    summary: 'Data protection is a source of competitive differentiation — proactively benchmarked, continuously improved, and integrated into how the organisation builds products and evaluates risk.',
    criteria: [
      'Privacy-by-design is embedded in product development from the earliest design stage, not reviewed after the fact',
      'Compliance posture is benchmarked against evolving DPDP Rules and enforcement precedent on an ongoing basis',
      'Data protection maturity is used actively in sales, partnership and investor conversations as a differentiator',
      'Algorithmic and AI systems undergo proactive fairness and accuracy review as standard practice',
      'The organisation contributes to or closely tracks the evolving Consent Manager and regulatory ecosystem'
    ],
    orgProfile: 'A small number of organisations — often Significant Data Fiduciaries, or companies for whom trust is core to the product itself (fintech, healthtech, data-driven platforms) — that treat DPDPA maturity as strategic infrastructure rather than a compliance cost centre.',
    risks: 'Even at this level, regulatory and legal change is continuous — the DPDP Rules are still maturing, and enforcement precedent will keep shifting expectations. Optimised organisations stay here through continuous monitoring, not by treating the work as finished.',
    pathToAdvance: 'Maintain the discipline through periodic re-assessment, active regulatory monitoring, and treating every new product or market as a fresh trigger for privacy-by-design review rather than an exception process.'
  }
];
