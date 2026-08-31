import type { Metadata } from "next";
import Link from "next/link";

import { ArrowUpRight, Crosshair } from "@/components/icons";
import { engagementModel, services, site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  alternates: { canonical: "/services" },
  description:
    "Security assessment, architecture and code review, compliance readiness and incident readiness for organisations in Morocco.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-head shell">
        <span className="section-kicker">Services</span>
        <h1>
          What we are
          <br />
          hired to do<span>.</span>
        </h1>
        <p className="page-lede">
          Four practices. Each one ends in a written deliverable your engineering
          team can schedule against, and a retest once the fixes land.
        </p>
      </section>

      <section className="section shell service-sections">
        {services.map((service) => (
          <article className="service-block" id={service.slug} key={service.slug}>
            <div className="service-lead">
              <span className="section-kicker">{service.index}</span>
              <h2>{service.name}</h2>
              <p>{service.summary}</p>
            </div>

            <div className="service-detail">
              <div className="service-scope">
                <span className="detail-kicker">In scope</span>
                <ul>
                  {service.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="service-deliverable">
                <span className="detail-kicker">What you get</span>
                <p>{service.deliverable}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="capabilities-section section" id="engagement">
        <div className="shell capabilities-shell">
          <div className="capabilities-intro">
            <span className="section-kicker section-kicker-dark">
              Engagement model
            </span>
            <h2>
              How it
              <br />
              <em>actually runs.</em>
            </h2>
            <p>
              The same five steps whichever service you buy. Nothing starts
              before the scope is written down and signed by both sides.
            </p>
          </div>

          <div className="capability-list">
            {engagementModel.map((step) => (
              <div className="capability-row" key={step.index}>
                <span className="capability-index">{step.index}</span>
                <div className="capability-title">
                  <span>{step.label}</span>
                  <h3>{step.name}</h3>
                </div>
                <p>{step.body}</p>
                <Crosshair />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-grid" aria-hidden="true" />
        <div className="shell contact-shell">
          <div className="contact-label">
            <span className="status-pulse" aria-hidden="true" />
            Scoping calls open
          </div>
          <h2>
            Not sure
            <br />
            <span>which?</span>
          </h2>
          <div className="contact-bottom">
            <p>
              Most people are not, and it is not your job to be. Describe the
              system and we will tell you what is worth doing first — including
              when the answer is nothing yet.
            </p>
            <div className="contact-actions">
              <Link className="contact-cta" href="/contact">
                Request a scoping call
                <ArrowUpRight />
              </Link>
              <a className="contact-mail" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
