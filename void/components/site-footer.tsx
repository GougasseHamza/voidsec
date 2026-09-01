import Link from "next/link";

import { nav, partner, services, site } from "@/lib/site-data";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell footer-shell">
        <div className="footer-top">
          <div className="footer-brand-col">
            <Link className="brand" href="/" aria-label={`${site.name} home`}>
              <span className="brand-mark" aria-hidden="true">
                <span>V</span>
                <i />
              </span>
              <span className="brand-name">VOIDSEC</span>
            </Link>
            <p className="footer-blurb">
              Security consulting for banks, insurers and telecoms in
              Morocco.
            </p>
            <a className="footer-email" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>

          <div className="footer-col">
            <h2>Services</h2>
            <ul>
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services#${service.slug}`}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h2>Company</h2>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/privacy">Privacy and cookies</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {site.name}
          </span>
          <span className="footer-powered">
            Powered by{" "}
            {partner.url ? (
              <a href={partner.url} rel="noreferrer" target="_blank">
                {partner.legalName}
              </a>
            ) : (
              <strong>{partner.legalName}</strong>
            )}
          </span>
          <span className="footer-locale">
            {site.city}, {site.country} · {site.coords}
          </span>
        </div>
      </div>
    </footer>
  );
}
