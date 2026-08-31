import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description: `Request a scoping call with VoidSec, or write to ${site.email}.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="page-head shell">
        <span className="section-kicker">Contact</span>
        <h1>
          Start with a
          <br />
          scoping call<span>.</span>
        </h1>
        <p className="page-lede">
          Thirty minutes to establish what you run, what worries you and whether
          we are the right people for it. No charge, and no proposal until the
          scope is real. If we are not the right fit, we will say so on the call.
        </p>
      </section>

      <section className="section shell contact-page">
        <aside className="contact-aside">
          <dl>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>
                {site.city}, {site.country}
              </dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>Mon–Fri, 09:00–18:00, {site.city} time</dd>
            </div>
            <div>
              <dt>Response</dt>
              <dd>One business day</dd>
            </div>
          </dl>

          <p className="aside-note">
            Reporting a vulnerability in something we run? Send it to the same
            address with <strong>[SECURITY]</strong> in the subject line and we
            will acknowledge it within 24 hours.
          </p>
        </aside>

        <div className="contact-form-col">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
