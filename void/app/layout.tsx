import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoidSec — Capture the Flag Collective",
  description:
    "VoidSec is a four-person CTF team spanning web exploitation, OSINT, cryptography, reverse engineering, pwn, and the unknown.",
  keywords: [
    "VoidSec",
    "CTF team",
    "cybersecurity",
    "web exploitation",
    "cryptography",
    "reverse engineering",
  ],
  openGraph: {
    title: "VoidSec — Trace the unknown",
    description:
      "A capture-the-flag collective operating across every layer of the challenge board.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
