// ReadyDPDP's two proprietary methodology registers, built for clients during
// the Data Discovery & Mapping phase of a DPDP compliance programme:
//   4.1 Comprehensive Data Discovery
//   4.2 Digital Personal Data Register (DPDR)
//   4.3 Customer Data Journey Registry (CDJR)
//   4.4 Data Flow & System Integration Mapping
// These are consulting deliverables we build WITH and FOR a client's team —
// not software features. A rule-based "Central Consent Engine" is the
// runtime mechanism a client's own systems can later use to enforce what
// the DPDR and CDJR define; building that engine is a separate implementation
// workstream, not part of the register-building methodology itself.

const dpdr = {
  slug: 'dpdr',
  name: 'DPDR',
  fullName: 'Digital Personal Data Register',
  tagline: 'The definitive, field-level inventory of every personal data element your organisation holds — and why you hold it.',
  overview: [
    'The Digital Personal Data Register, or DPDR, is the foundational artefact of a DPDP compliance programme. It is a structured register — not a narrative document — that records every discrete personal data element your organisation collects, where it lives, why it was collected, and when it must be purged. Without a DPDR, "what personal data do we hold and why" is a question your organisation can only answer by guesswork; with one, it is a lookup.',
    'We build the DPDR during Phase 4 of our engagement methodology, Data Discovery & Mapping, immediately after a comprehensive data discovery exercise (Phase 4.1) that surfaces every candidate data element across your systems. The DPDR is the register those elements get catalogued into, field by field, before the Customer Data Journey Registry (CDJR) maps how each element gets collected in the first place.',
    'Each entry in the DPDR is built around six core fields: an Element ID that uniquely identifies the specific data element, a Purpose ID linking it to a defined processing purpose, a Processing Activity ID describing what is actually done with it, an Asset ID identifying the system that stores it, a Collection Point ID tracing it back to its originating touchpoint, and a Consent Expiry defining when it must be re-consented or purged. Together, these six fields turn "we probably have customer emails somewhere" into an auditable, queryable inventory.'
  ],
  buildApproach: 'We build a client\'s DPDR one of two ways, often blended: Interview-Driven, running structured workshops with business, product, technology and legal stakeholders to surface data elements from institutional knowledge; and Scan-Driven, using automated scanning of source code, database schemas and log files to surface data elements directly from the systems that store them, then enriching those findings through targeted interviews. Scan-Driven discovery catches what interviews miss — undocumented legacy fields, shadow IT, forgotten integrations — while Interview-Driven discovery supplies the business context a scan alone cannot: why a field exists, whether it is still needed, who owns the decision to keep or purge it.',
  fields: [
    {
      slug: 'element-id',
      name: 'Element ID',
      example: 'DE_001_Customer_Email',
      body: [
        'The Element ID is the unique identifier assigned to every discrete personal data element catalogued in the DPDR — a specific field, such as a customer\'s email address, phone number, or PAN, not an entire database table or record. Granularity at the element level, rather than the dataset level, is what makes the register useful: a table called "customers" might contain a dozen distinct personal data elements, each with a different purpose, sensitivity, and retention rule.',
        'We assign Element IDs using a consistent naming convention during the discovery workshops and scans — typically a prefix denoting the element type, a sequential number, and a human-readable label, for example DE_001_Customer_Email. This convention is agreed with the client\'s technical and compliance teams at the outset of the engagement so the register remains legible to both audiences long after our engagement ends.',
        'Every other field in a DPDR entry hangs off the Element ID: it is the anchor that a Purpose ID, Processing Activity ID, Asset ID, Collection Point ID and Consent Expiry are all attached to. Getting element-level granularity right early is the single highest-leverage decision in building a defensible register.'
      ]
    },
    {
      slug: 'purpose-id',
      name: 'Purpose ID',
      example: 'PUR_004_KYC_Verification',
      body: [
        'The Purpose ID links a data element to the specific, itemised reason it is processed — the same purpose granularity the DPDPA\'s notice and consent requirements demand under Sections 5 and 6. A single Element ID may carry more than one Purpose ID if the same data element genuinely serves more than one distinct, disclosed purpose.',
        'Purpose IDs are the connective tissue of the entire register system: the same Purpose ID that attaches to a data element in the DPDR is referenced again in the Customer Data Journey Registry, linking the two registers together so a client can trace a straight line from "this is why we collect this field" to "this is where and how it gets collected."',
        'During our engagements, we build the Purpose ID taxonomy before populating individual DPDR entries, working with product, legal and business teams to agree a defined, non-overlapping purpose list — service delivery, KYC verification, marketing, fraud prevention, and so on — rather than letting purposes proliferate ad hoc as the register grows.'
      ]
    },
    {
      slug: 'processing-activity-id',
      name: 'Processing Activity ID',
      example: 'ACT_ENCRYPT_STORE',
      body: [
        'The Processing Activity ID describes what actually happens to a data element once collected — encryption and storage, transmission to a third party, analytics aggregation, automated decisioning, and so on. Where the Purpose ID answers "why," the Processing Activity ID answers "what is technically done to it."',
        'This distinction matters because a single purpose can involve multiple processing activities, each carrying different risk. "Fraud prevention" as a purpose might involve activities as different as real-time transaction scoring and long-term log retention for investigation — and those two activities warrant different security safeguards and retention treatment even though they share a purpose.',
        'We derive Processing Activity IDs primarily from the Scan-Driven discovery track, since they describe technical behaviour that is best confirmed against actual system architecture rather than assumed from a policy description — though interviews with engineering teams remain essential to confirm what a scan surfaces.'
      ]
    },
    {
      slug: 'asset-id',
      name: 'Asset ID',
      example: 'ASSET_WEB_APP_001',
      body: [
        'The Asset ID identifies the specific system, application, or platform where a data element is stored or processed — a web application, a mobile app backend, a CRM instance, a data warehouse. It answers "where does this actually live" in a way that a purpose or activity description cannot.',
        'Asset-level tracking is what allows the DPDR to support downstream security and access-control decisions: knowing that a sensitive data element lives in ASSET_WEB_APP_001 lets a client\'s security team target reasonable security safeguards at the systems that actually warrant them, rather than applying a flat control set everywhere regardless of risk.',
        'Asset IDs also matter for cross-border transfer and vendor due diligence: an asset hosted with an offshore infrastructure provider carries different obligations than one hosted domestically, and the DPDR is where that distinction becomes visible at the data-element level rather than buried in an infrastructure diagram no one outside engineering reads.'
      ]
    },
    {
      slug: 'collection-point-id',
      name: 'Collection Point ID',
      example: 'CP_001_REG_FORM',
      body: [
        'The Collection Point ID traces a data element back to the specific touchpoint where it was originally collected from the Data Principal — a registration form, a KYC upload screen, a call-centre script, a partner data feed. It is the DPDR\'s link into the Customer Data Journey Registry, where that same collection point is documented in far greater operational detail — its consent mechanism, its status, its last update.',
        'This traceability is what the DPDPA\'s notice obligation actually depends on: Section 5 requires notice before or at the time of collection, which means every collection point needs a corresponding, deliverable notice. A DPDR entry with no Collection Point ID is a data element whose provenance and notice history cannot be verified — a common and serious gap in legacy systems.',
        'During discovery, Collection Point IDs are often the hardest fields to populate for older data elements, since original collection touchpoints may have been redesigned, retired, or simply undocumented. This is precisely the gap our Legacy Data Remediation service is built to close.'
      ]
    },
    {
      slug: 'consent-expiry',
      name: 'Consent Expiry',
      example: '24 months from last active use, or on account closure',
      body: [
        'The Consent Expiry field defines the duration or triggering event after which a data element\'s consent basis lapses and the element must be re-consented, refreshed, or purged. It operationalises the DPDPA\'s data minimisation and storage limitation expectations at the level of an individual data element rather than as a vague organisational policy.',
        'Consent Expiry can be time-bound (a fixed period, such as 24 months from last active use) or event-bound (triggered by account closure, purpose fulfilment, or explicit withdrawal). We work with a client\'s legal and product teams to set expiry rules that are defensible under the Act and operationally enforceable by whatever system ultimately reads the register — most often a rules-based consent engine that checks the DPDR at runtime before allowing further processing.',
        'A DPDR without populated Consent Expiry fields can tell you what data you hold and why, but not when you\'re obligated to stop holding it — which is exactly the gap that produces the "legacy data with no clear retention discipline" problem we see in nearly every first-time assessment.'
      ]
    }
  ]
};

const cdjr = {
  slug: 'cdjr',
  name: 'CDJR',
  fullName: 'Customer Data Journey Registry',
  tagline: 'Every consent collection point along your customer and data journey, registered, mapped to purpose, and kept current.',
  overview: [
    'The Customer Data Journey Registry, or CDJR, registers every point along a customer\'s journey — and every internal or partner-facing journey that touches personal data — where consent is actually collected. Where the DPDR answers "what data do we hold and why," the CDJR answers "where and how do we actually collect it, and is that collection point still live, tested, and correctly configured."',
    'We build the CDJR immediately after the DPDR, as step 4.3 of our Data Discovery & Mapping methodology, following the comprehensive discovery exercise (4.1) and DPDR build (4.2), and feeding directly into Data Flow & System Integration Mapping (4.4). Every collection point registered in the CDJR links back to Purpose IDs already defined in the DPDR, so the two registers stay in lockstep rather than drifting into two independent, inconsistent sources of truth.',
    'A CDJR entry is built around five core fields: a Collection Point ID and Name identifying the specific touchpoint, an Asset identifying the app or channel hosting it, one or more Purpose IDs linking it to the DPDR\'s purpose taxonomy, a Consent Mechanism describing exactly how consent is captured at that point, and a Status showing whether the collection point is live, in testing, or still in draft. A Last Updated field keeps the register honest as products change.'
  ],
  buildApproach: 'Like the DPDR, we build a client\'s CDJR through a blend of Interview-Driven discovery — walking product and channel owners through every entry point a customer or data principal can encounter (web, mobile app, IVR, point-of-sale, partner integrations) — and Scan-Driven discovery, tracing collection points directly from front-end code, form definitions, and API call sites. The two approaches catch different blind spots: interviews surface offline and human-mediated collection points (a call-centre script, a physical KYC form) that a code scan cannot see, while a scan catches collection points a product team may have forgotten existed, especially in older or acquired products.',
  fields: [
    {
      slug: 'collection-point-id-name',
      name: 'Collection Point ID & Name',
      example: 'CP002 – KYC Document Upload',
      body: [
        'Every collection point in the CDJR carries both a machine-readable ID and a human-readable name — for example, CP002 – KYC Document Upload. The ID keeps the register consistent and queryable across systems and teams; the name keeps it legible to the business stakeholders who actually own that touchpoint and need to recognise it at a glance in a review meeting.',
        'This is the same ID convention referenced back in the DPDR\'s Collection Point ID field, so an auditor — or a client\'s own compliance team — can move from "this data element was collected at CP002" to "here is exactly what CP002 looks like, what it asks for, and how consent is captured there" without a gap in the trail.',
        'We assign these IDs during the CDJR build workshops, walking the client\'s product and channel owners through every distinct journey step where personal data is captured, and confirming no touchpoint is registered twice under two different names — a common source of register drift we specifically check for.'
      ]
    },
    {
      slug: 'asset',
      name: 'Asset',
      example: 'Android App, Web App, IVR, Point-of-Sale',
      body: [
        'The Asset field records which app or channel hosts a given collection point — a web application, a mobile app, an IVR phone system, a point-of-sale terminal, a partner-embedded widget. It matters because the same purpose and even the same nominal form can be implemented very differently, with very different consent-mechanism options, across different channels.',
        'This field also creates the crucial cross-reference back to the DPDR\'s Asset ID: a collection point hosted on a given asset should be capturing data that ultimately lands in a matching or downstream asset in the DPDR, and any mismatch — data captured on one asset but showing up stored somewhere unexpected — is exactly the kind of integration gap that Data Flow & System Integration Mapping (the step following CDJR) is designed to catch.',
        'For clients with many channels — common in BFSI and retail — the Asset field is often what first reveals that the same nominal purpose is being handled with inconsistent consent standards across channels, a finding we flag early because it is usually cheap to fix once visible and expensive to fix once entrenched.'
      ]
    },
    {
      slug: 'purpose-linkage',
      name: 'Purpose Linkage',
      example: 'Links to PUR_004_KYC_Verification, PUR_009_Fraud_Screening',
      body: [
        'Purpose Linkage is the field that ties a CDJR collection point back to one or more Purpose IDs already defined in the DPDR — it is the join between the two registers, and the reason we always build the DPDR first. A collection point can legitimately link to more than one purpose, but each linked purpose must be disclosed and separately consentable at that collection point under the DPDPA\'s specificity standard.',
        'This is where we most often find — and correct — consent bundling during a build engagement: a single form linked to three purposes behind one checkbox is a Purpose Linkage entry that looks fine on paper but fails the moment you check whether each linked purpose has its own affirmative consent capture.',
        'Maintaining accurate Purpose Linkage over time is also what makes the CDJR useful for change management: when a product team wants to add a new purpose to an existing form, updating this field is the trigger that should prompt a notice and consent-mechanism review, not a silent addition.'
      ]
    },
    {
      slug: 'consent-mechanism',
      name: 'Consent Mechanism',
      example: 'Checkbox, Just-in-Time (JIT) modal, Inline banner',
      body: [
        'The Consent Mechanism field documents exactly how consent is captured at a given collection point — a checkbox, a just-in-time (JIT) modal shown at the moment of collection, an inline banner, a verbal script read by a call-centre agent, or another affirmative-action pattern. This is the field that lets a client (or an auditor) evaluate whether the actual UX matches the DPDPA\'s "clear affirmative action" standard, rather than assuming a checkbox is automatically sufficient.',
        'Different mechanisms suit different contexts: a JIT modal that surfaces the specific purpose at the exact moment a sensitive field is requested is generally a stronger pattern than a single pre-ticked or bundled checkbox at account creation, because it keeps the consent decision proximate to the data being collected.',
        'During a build engagement, we audit the Consent Mechanism field against the specific Purpose Linkage at each collection point and flag any mismatch — most commonly, a mechanism strong enough for one linked purpose but not rigorous enough for a more sensitive purpose bundled alongside it.'
      ]
    },
    {
      slug: 'status-lifecycle',
      name: 'Status / Active Toggle',
      example: 'Draft → Testing → Live',
      body: [
        'The Status field tracks each collection point through a defined lifecycle — typically Draft, Testing, and Live — so the CDJR reflects what is actually deployed in production, not just what has been designed or discussed. A collection point in Draft or Testing status should not yet be treated as an active data collection channel for compliance-reporting purposes.',
        'This lifecycle discipline solves a specific, common failure mode: product teams build and test a new form or flow, and it quietly goes live without the compliance team\'s change-control process ever being triggered, because no one owned the step of flipping its status. Requiring a deliberate status transition to Live closes that gap.',
        'We recommend clients tie the CDJR\'s status toggle to their release process — no collection point moves to Live status without a corresponding Purpose Linkage and Consent Mechanism review having been signed off — so the register enforces discipline rather than just recording it after the fact.'
      ]
    },
    {
      slug: 'interview-driven-vs-scan-driven',
      name: 'Interview-Driven vs Scan-Driven Build',
      example: 'Two complementary discovery methods used together',
      body: [
        'Interview-Driven discovery runs structured workshops with the people who own a journey end to end — product managers, channel owners, customer-facing teams — to walk through every step where personal data is captured, including offline and human-mediated touchpoints a technical scan cannot see, such as a call-centre script or a paper KYC form later digitised.',
        'Scan-Driven discovery works from the artefacts a system leaves behind: front-end source code, form and API definitions, third-party SDK call sites, and application logs, surfacing collection points directly from what is actually deployed rather than from what stakeholders remember or believe is deployed. It is particularly effective at catching collection points added by past teams, acquired products, or third-party embeds that no current employee is aware of.',
        'In practice we run both in every CDJR build engagement, in either order depending on client maturity: Scan-Driven discovery first when a client\'s documentation is thin and code is the more reliable source of truth, Interview-Driven first when the priority is capturing offline touchpoints and organisational context that no scan will ever surface. The two tracks are reconciled against each other before any collection point is marked Live-ready, since discrepancies between what a scan finds and what a stakeholder describes are themselves valuable findings.'
      ]
    }
  ]
};

module.exports = { dpdr, cdjr };
