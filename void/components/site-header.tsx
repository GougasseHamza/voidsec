"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { nav, site } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on navigation by adjusting state during render — the header lives in
  // the root layout and is never unmounted, so without this the menu can
  // outlive the route it was opened on.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const current = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header-wrap">
      <div className="site-header shell">
        <Link className="brand" href="/" aria-label={`${site.name} home`}>
          <span className="brand-mark" aria-hidden="true">
            <span>V</span>
            <i />
          </span>
          <span className="brand-name">VOIDSEC</span>
        </Link>

        <nav className="main-nav" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={current(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      {/* Rendered unconditionally so aria-controls always resolves. */}
      <nav
        className="mobile-nav"
        id="mobile-nav"
        aria-label="Primary mobile"
        hidden={!open}
      >
        <div className="shell">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={current(item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              <span>{item.label}</span>
              <i aria-hidden="true" />
            </Link>
          ))}
          <a href={`mailto:${site.email}`} onClick={() => setOpen(false)}>
            <span>{site.email}</span>
            <i aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}
