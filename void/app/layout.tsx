import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";

import { AmbientPointer } from "@/components/ambient-pointer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site-data";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Security consulting, ${site.city}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "security consulting Morocco",
    "security audit Rabat",
    "penetration testing Morocco",
    "ISO 27001 Morocco",
    "Law 05-20 compliance",
    "CNDP",
    "VoidSec",
  ],
  alternates: { canonical: "/" },
  // Only the stable parts here — title/description/url resolve per page.
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <AmbientPointer />
        <SiteHeader />
        {/* tabIndex lets the skip link actually move focus, not just scroll. */}
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
