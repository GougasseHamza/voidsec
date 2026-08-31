/**
 * Single source of truth for site content.
 *
 * Rule for this file: nothing here may be a claim the team cannot back up.
 * Client names, engagement counts, certifications and competition placements
 * go in `engagements` / `competitions` only once they are real.
 */

export const site = {
  name: "VoidSec",
  email: "contact@voidsec.sh",
  city: "Rabat",
  country: "Morocco",
  coords: "34.02° N",
  url: "https://voidsec.sh",
  description:
    "VoidSec is a security consultancy in Rabat. We audit applications, infrastructure and cloud estates for Moroccan banks, insurers, telecoms and the companies that build for them.",
};

/** The company backing VoidSec. Credited in the footer and on the homepage. */
export const partner = {
  name: "IKlight",
  legalName: "IKlight SARL",
  // TODO: add the company URL and the credit becomes a link automatically.
  url: "",
};

export type NavItem = { href: string; label: string };

export const nav: NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

/** Scrolling strip under the hero. */
export const strip = [
  "Security assessment",
  "Architecture review",
  "Cloud posture",
  "Compliance readiness",
  "Incident readiness",
  "Code review",
];

export type Service = {
  slug: string;
  index: string;
  code: string;
  initials: string;
  name: string;
  short: string;
  summary: string;
  scope: string[];
  deliverable: string;
};

export const services: Service[] = [
  {
    slug: "security-assessment",
    index: "01",
    code: "APPSEC.INFRA",
    initials: "01",
    name: "Security assessment",
    short: "What can be reached from outside, and from a foothold inside.",
    summary:
      "A technical review of the systems you run, approached the way an attacker would approach them.",
    scope: [
      "Web and mobile applications, including authenticated and multi-tenant paths",
      "Internal and external network exposure",
      "Cloud configuration, identity boundaries and secret handling",
      "Third-party and dependency exposure",
    ],
    deliverable:
      "Findings ranked by exploitability. Each one comes with the steps to reproduce it, the assets it affects and a fix that suits your stack. We retest once the fixes land.",
  },
  {
    slug: "architecture-review",
    index: "02",
    code: "DESIGN.CODE",
    initials: "02",
    name: "Architecture and code review",
    short: "Catch the design flaw while it still costs a sprint.",
    summary:
      "Design-level review before a system ships, when a fix is still a sprint instead of a migration.",
    scope: [
      "Authentication, session handling and token lifecycle",
      "Authorisation and tenant isolation logic",
      "Cryptographic choices and key management",
      "Data flow, retention and exposure between services",
    ],
    deliverable:
      "A written review of the design decisions that carry risk, the failure each one permits and what you could do instead. We sit with your engineers and go through it.",
  },
  {
    slug: "compliance-readiness",
    index: "03",
    code: "05-20.CNDP",
    initials: "03",
    name: "Compliance readiness",
    short: "Regulatory obligation turned into work you can schedule.",
    summary:
      "Translating what the regulator expects into a backlog your engineering team can plan around.",
    scope: [
      "Gap analysis against Law 05-20 and DGSSI guidance",
      "CNDP obligations for personal data handling",
      "ISO/IEC 27001 control mapping and evidence preparation",
      "Sector requirements for financial and telecom operators",
    ],
    deliverable:
      "A gap register mapped to controls, sequenced by effort and risk, with the evidence an auditor will ask for identified up front.",
  },
  {
    slug: "incident-readiness",
    index: "04",
    code: "DETECT.RESPOND",
    initials: "04",
    name: "Incident readiness",
    short: "Find out how your team responds before an incident asks.",
    summary:
      "Testing whether the logging, the runbooks and the people behind them hold up under a realistic intrusion.",
    scope: [
      "Detection and logging coverage review",
      "Tabletop exercises against realistic intrusion paths",
      "Runbook development and escalation mapping",
      "Post-exercise gap remediation",
    ],
    deliverable:
      "A plain account of where your visibility stops, what your team could reconstruct after an intrusion, and the runbooks to cover the gaps.",
  },
];

export type Step = { index: string; label: string; name: string; body: string };

export const engagementModel: Step[] = [
  {
    index: "A",
    label: "NO CHARGE",
    name: "Scoping call",
    body: "Half an hour on a call. We work out what would be in scope and what we would be working around, and you get a straight answer on whether there is an engagement here at all.",
  },
  {
    index: "B",
    label: "IN WRITING",
    name: "Rules of engagement",
    body: "Assets, testing windows, escalation contacts and the boundary of what we will touch, all agreed and signed before anything starts.",
  },
  {
    index: "C",
    label: "LIVE CHANNEL",
    name: "Testing",
    body: "Critical findings reach you the day we confirm them rather than waiting for the report. You talk to the people doing the work.",
  },
  {
    index: "D",
    label: "WALKTHROUGH",
    name: "Report",
    body: "A written report your engineers can work from, presented to the people who have to implement it.",
  },
  {
    index: "E",
    label: "INCLUDED",
    name: "Retest",
    body: "Once the fixes land we verify them and reissue the report. It is included in the price.",
  },
];

/**
 * Capability areas. Deliberately not people: the team does not publish
 * individual profiles, so nothing here names or identifies anyone.
 */
export type Discipline = {
  index: string;
  code: string;
  name: string;
  focus: string;
  tags: string[];
  detail: string;
  signal: string;
};

export const disciplines: Discipline[] = [
  {
    index: "01",
    code: "APPSEC.OSINT",
    name: "Application security",
    focus: "Web, mobile and the exposure around them",
    tags: ["Web exploitation", "Exposure mapping"],
    detail:
      "The application layer and the context around it: authenticated and multi-tenant paths, exposed infrastructure, forgotten subdomains, and the gap between what a company thinks is public and what is.",
    signal: "HTTP // PUBLIC DATA",
  },
  {
    index: "02",
    code: "CRYPTO",
    name: "Cryptography",
    focus: "Implementation and key handling",
    tags: ["Cryptanalysis", "Key management"],
    detail:
      "Cryptographic implementation and protocol review. Usually the primitive is sound and the way it was wired into the system is not.",
    signal: "CIPHERS // PROTOCOLS",
  },
  {
    index: "03",
    code: "REV.PWN",
    name: "Reverse engineering",
    focus: "Compiled software and memory",
    tags: ["Binary analysis", "Memory corruption"],
    detail:
      "Taking compiled software apart. Firmware, native clients, and anything where the source is unavailable and the behaviour still has to be established.",
    signal: "BINARY // MEMORY",
  },
  {
    index: "04",
    code: "CLOUD.DETECT",
    name: "Infrastructure",
    focus: "Cloud posture and detection",
    tags: ["Cloud and network", "Detection review"],
    detail:
      "Cloud configuration, identity boundaries and network exposure, plus whether the logging in place could reconstruct an intrusion after the fact.",
    signal: "CLOUD // TELEMETRY",
  },
];

export type Principle = { index: string; title: string; body: string };

export const principles: Principle[] = [
  {
    index: "01",
    title: "Exploitability over severity theatre",
    body: "A scanner produces a hundred findings and no priorities. We report what chains into real access on your systems. We also say plainly when something scored high but goes nowhere.",
  },
  {
    index: "02",
    title: "Reproducible or it does not ship",
    body: "Every finding arrives with the steps to trigger it. If your engineers cannot reproduce it in an afternoon, it is not finished work on our side.",
  },
  {
    index: "03",
    title: "The people you meet do the work",
    body: "Whoever is on the scoping call is testing your systems and writing your report. Nothing is handed to a junior once the contract is signed.",
  },
];

/**
 * Client engagements. Published only with written client approval.
 * Add as: { year, sector, scope, outcome }.
 */
export type Engagement = {
  year: string;
  sector: string;
  scope: string;
  outcome: string;
};

export const engagements: Engagement[] = [];

/**
 * Capture-the-flag results. Add each one with a public scoreboard behind it.
 */
export type Competition = {
  year: string;
  event: string;
  placement: string;
  url?: string;
};

export const competitions: Competition[] = [];
