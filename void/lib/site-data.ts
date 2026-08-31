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
      "A technical review of what you actually run, approached the way an attacker would rather than the way a checklist would.",
    scope: [
      "Web and mobile applications, including authenticated and multi-tenant paths",
      "Internal and external network exposure",
      "Cloud configuration, identity boundaries and secret handling",
      "Third-party and dependency exposure",
    ],
    deliverable:
      "Findings ranked by exploitability, each with reproduction steps, affected assets and a fix that fits your stack — plus a retest once the fixes land.",
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
      "A written review of the design decisions that carry risk, the failure each one permits and the alternatives — walked through with your engineers, not mailed at them.",
  },
  {
    slug: "compliance-readiness",
    index: "03",
    code: "05-20.CNDP",
    initials: "03",
    name: "Compliance readiness",
    short: "Regulatory obligation turned into work you can schedule.",
    summary:
      "Translating what the regulator expects into a backlog your engineering team can actually plan around.",
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
      "An honest account of where visibility stops, what your team can and cannot reconstruct after the fact, and the runbooks to close that distance.",
  },
];

export type Step = { index: string; label: string; name: string; body: string };

export const engagementModel: Step[] = [
  {
    index: "A",
    label: "NO CHARGE",
    name: "Scoping call",
    body: "Half an hour on a call produces three things: the assets that would actually be in scope, the constraints we would be working around, and an honest answer on whether there is an engagement here at all.",
  },
  {
    index: "B",
    label: "IN WRITING",
    name: "Rules of engagement",
    body: "Assets, testing windows, escalation contacts and the boundary of what we will touch — agreed and signed before anything starts.",
  },
  {
    index: "C",
    label: "LIVE CHANNEL",
    name: "Testing",
    body: "Critical findings reach you the day we confirm them, not when the report is ready. You talk to the people doing the work, not an account manager.",
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
    body: "Once the fixes land we verify them and reissue the report. Part of the engagement, not a separate invoice.",
  },
];

export type Member = {
  index: string;
  handle: string;
  /** Real name, once the team approves publishing it. */
  name?: string;
  initials: string;
  code: string;
  role: string;
  disciplines: string[];
  statement: string;
  signal: string;
};

export const members: Member[] = [
  {
    index: "01",
    handle: "blinkyy",
    initials: "BL",
    code: "APPSEC.OSINT",
    role: "Application Security / OSINT",
    disciplines: ["Web exploitation", "Exposure mapping"],
    statement:
      "Works the application layer and the context around it: exposed infrastructure, forgotten subdomains, and the gap between what a company thinks is public and what is.",
    signal: "HTTP // PUBLIC DATA",
  },
  {
    index: "02",
    handle: "nh72",
    initials: "N7",
    code: "CRYPTO",
    role: "Cryptography / Protocol Review",
    disciplines: ["Cryptanalysis", "Key management"],
    statement:
      "Reviews cryptographic implementation and key handling — the cases where the primitive is sound but the way it was wired into the system is not.",
    signal: "CIPHERS // PROTOCOLS",
  },
  {
    index: "03",
    handle: "smAn",
    initials: "SM",
    code: "REV.PWN",
    role: "Reverse Engineering / Binary",
    disciplines: ["Binary analysis", "Memory corruption"],
    statement:
      "Takes compiled software apart. Firmware, native clients, and anything where the source is unavailable and the behaviour still has to be established.",
    signal: "BINARY // MEMORY",
  },
  {
    index: "04",
    handle: "Yass",
    initials: "YA",
    code: "CLOUD.DETECT",
    role: "Infrastructure / Incident Readiness",
    disciplines: ["Cloud and network", "Detection review"],
    statement:
      "Covers cloud posture, network exposure, and whether the logging in place could actually reconstruct an intrusion after the fact.",
    signal: "CLOUD // TELEMETRY",
  },
];

export type Principle = { index: string; title: string; body: string };

export const principles: Principle[] = [
  {
    index: "01",
    title: "Exploitability over severity theatre",
    body: "A scanner produces a hundred findings and no priorities. We report what chains into real access on your systems — and we say plainly when something scored high but goes nowhere.",
  },
  {
    index: "02",
    title: "Reproducible or it does not ship",
    body: "Every finding arrives with the steps to trigger it. If your engineers cannot reproduce it in an afternoon, it is not finished work on our side.",
  },
  {
    index: "03",
    title: "The four of us do the work",
    body: "The people on the scoping call are the people testing your systems and writing your report. Nothing is handed to a junior once the contract is signed.",
  },
];

/**
 * Client engagements — published only with written client approval.
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
