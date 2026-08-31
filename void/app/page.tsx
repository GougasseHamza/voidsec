import Link from "next/link";
import { Fragment } from "react";

import { ArrowUpRight, Crosshair } from "@/components/icons";
import { Scope } from "@/components/scope";
import { partner, principles, services, site, strip } from "@/lib/site-data";

export default function Home() {
  return (
    <>
      <section className="hero shell" id="top">
        <div className="hero-grid-lines" aria-hidden="true" />

        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span>Security consulting</span>
            <span className="eyebrow-code">
              {site.city.toUpperCase()} / {site.country.toUpperCase()}
            </span>
          </div>

          <h1>
            <span>Find it</span>
            <span className="hero-title-accent">
              bef<span className="title-target">o</span>re they do.
            </span>
          </h1>

          <div className="hero-intro-row">
            <p>
              We audit applications, infrastructure and cloud estates for
              Moroccan banks, insurers, telecoms and the companies that build
              for them — and report what an attacker could actually reach.
            </p>
            <Link
              className="circle-link"
              href="/contact"
              aria-label="Request a scoping call"
            >
              <ArrowUpRight />
            </Link>
          </div>
        </div>

        <Scope />

        <div className="hero-index" aria-hidden="true">
          <span>01</span>
          <div />
          <span>04</span>
        </div>
      </section>

      <div className="signal-strip">
        <div className="signal-track">
          {[0, 1, 2, 3].map((copy) => (
            <div className="signal-track-copy" key={copy} aria-hidden={copy !== 0}>
              {strip.map((item) => (
                <Fragment key={item}>
                  <span>{item}</span>
                  <i />
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="capabilities-section section" id="services">
        <div className="shell capabilities-shell">
          <div className="capabilities-intro">
            <span className="section-kicker section-kicker-dark">01 / Services</span>
            <h2>
              Four ways in.
              <br />
              <em>Same discipline.</em>
            </h2>
            <p>
              Two of these start from what an attacker can reach, two from what
              an auditor or an incident would expose. All four end the same way:
              a written account of what is wrong and what it takes to fix.
            </p>

            <Link className="text-link text-link-dark" href="/services">
              All services
              <ArrowUpRight />
            </Link>
          </div>

          <div className="capability-list">
            {services.map((service) => (
              <Link
                className="capability-row"
                href={`/services#${service.slug}`}
                key={service.slug}
              >
                <span className="capability-index">{service.index}</span>
                <div className="capability-title">
                  <span>{service.code}</span>
                  <h3>{service.name}</h3>
                </div>
                <p>{service.short}</p>
                <Crosshair />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto shell section" id="method">
        <div className="manifesto-aside">
          <span className="section-kicker">02 / The team</span>
          <div className="manifesto-counter">
            <span>5</span>
            <small>steps, every engagement</small>
          </div>
        </div>

        <div className="manifesto-copy">
          <h2 className="manifesto-lead">
            Senior operators with a competition background.
          </h2>
          <p className="manifesto-body">
            VoidSec is a small team of senior cybersecurity professionals with
            deep competitive capture-the-flag experience across web
            exploitation, cryptography, reverse engineering and binary
            exploitation. We do not publish individual profiles — you meet the
            people who will do the work on the scoping call.
          </p>

          <div className="method-steps">
            {principles.map((principle) => (
              <div key={principle.index}>
                <span>{principle.index}</span>
                <p>{principle.title}</p>
              </div>
            ))}
          </div>

          <div className="section-more">
            <Link className="text-link" href="/team">
              How we work
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="partner-band shell section" id="powered-by">
        <div className="partner-inner">
          <div className="partner-lead">
            <span className="section-kicker">03 / Powered by</span>
            <h2 className="partner-mark">{partner.name}</h2>
          </div>

          <div className="partner-copy">
            <p>
              VoidSec is powered by {partner.legalName}. Their backing is what
              puts a senior team behind engagements of this size, and what lets
              us turn work down when we are not the right people for it.
            </p>
            <p className="partner-thanks">
              Our thanks to the {partner.name} team.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-grid" aria-hidden="true" />
        <div className="shell contact-shell">
          <div className="contact-label">
            <span className="status-pulse" aria-hidden="true" />
            Scoping calls open
          </div>
          <h2>
            Let&apos;s
            <br />
            <span>talk.</span>
          </h2>
          <div className="contact-bottom">
            <p>
              No charge, and no proposal until the scope is written down. If we
              are not the right people for the job, you will hear that on the
              call rather than in month two.
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
