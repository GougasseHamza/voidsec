export type Member = {
  index: string;
  handle: string;
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
    code: "WEB.OSINT",
    role: "Web Exploitation / OSINT",
    disciplines: ["Application logic", "Open-source intelligence"],
    statement: "Finds the seam between exposed systems and the data surrounding them.",
    signal: "HTTP // PUBLIC DATA",
  },
  {
    index: "02",
    handle: "nh72",
    initials: "N7",
    code: "CRYPTO",
    role: "Cryptography",
    disciplines: ["Cryptanalysis", "Protocol reasoning"],
    statement: "Reads structure in the noise, one assumption and primitive at a time.",
    signal: "CIPHERS // PROTOCOLS",
  },
  {
    index: "03",
    handle: "smAn",
    initials: "SM",
    code: "REV.PWN",
    role: "Reverse Engineering / Pwn",
    disciplines: ["Binary analysis", "Memory exploitation"],
    statement: "Pulls systems apart and works at the layer where the machine speaks back.",
    signal: "BINARY // MEMORY",
  },
  {
    index: "04",
    handle: "Yass",
    initials: "YA",
    code: "MISC",
    role: "Miscellaneous",
    disciplines: ["Lateral thinking", "Unclassified problems"],
    statement: "Connects the clues that refuse to fit anywhere else on the board.",
    signal: "WILDCARD // UNKNOWN",
  },
];

export const capabilities = [
  {
    index: "A",
    name: "Break the surface",
    label: "WEB / OSINT",
    description:
      "From application behavior to exposed context, we map the system before we move through it.",
  },
  {
    index: "B",
    name: "Decode the pattern",
    label: "CRYPTO",
    description:
      "We reduce hard-looking problems into primitives, assumptions, and the one detail that does not belong.",
  },
  {
    index: "C",
    name: "Own the machine",
    label: "REV / PWN",
    description:
      "We trace control flow, inspect memory, and turn low-level behavior into a deliberate path forward.",
  },
  {
    index: "D",
    name: "Solve the unknown",
    label: "MISC",
    description:
      "When a challenge crosses categories, we keep the model flexible and follow the evidence instead.",
  },
];
