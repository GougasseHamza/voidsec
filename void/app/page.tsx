import Link from "next/link";
import { Fragment } from "react";

import { ArrowUpRight, Crosshair } from "@/components/icons";
import { Scope } from "@/components/scope";
import { members, principles, services, site, strip } from "@/lib/site-data";

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

      <section className="operators-section shell section" id="team">
        <div className="section-heading">
          <div>
            <span className="section-kicker">01 / Team</span>
            <h2>
              The four of us<span>.</span>
            </h2>
          </div>
          <p>
            Four disciplines that overlap on every engagement: an odd response
            header becomes an exposure lead, a key-handling detail becomes a
            path into the data, a binary detail becomes control.
          </p>
        </div>

        <div className="operator-grid">
          {members.map((member) => (
            <article className="operator-card" key={member.handle}>
              <div className="operator-topline">
                <span>OP / {member.index}</span>
                <Crosshair />
              </div>

              <div className="operator-monogram" aria-hidden="true">
                <span>{member.initials}</span>
                <i>{member.code}</i>
              </div>

              <div className="operator-identity">
                <h3>{member.name ?? member.handle}</h3>
                <span>{member.role}</span>
              </div>

              <p className="operator-statement">{member.statement}</p>

              <div className="operator-disciplines">
                {member.disciplines.map((discipline) => (
                  <span key={discipline}>{discipline}</span>
                ))}
              </div>

              <div className="operator-footer">
                <span>{member.signal}</span>
                <ArrowUpRight />
              </div>
            </article>
          ))}
        </div>

        <div className="section-more">
          <Link className="text-link" href="/team">
            More on the team
            <ArrowUpRight />
          </Link>
        </div>
      </section>

      <section className="capabilities-section section" id="services">
        <div className="shell capabilities-shell">
          <div className="capabilities-intro">
            <span className="section-kicker section-kicker-dark">02 / Services</span>
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
          <span className="section-kicker">03 / Method</span>
          <div className="manifesto-counter">
            <span>5</span>
            <small>steps, every engagement</small>
          </div>
        </div>

        <div className="manifesto-copy">
          <h2 className="manifesto-lead">
            Every finding ships with the steps to trigger it.
          </h2>
          <p className="manifesto-body">
            The four of us compete in capture the flag under the same name,
            across web, cryptography, reverse engineering and binary
            exploitation. The same people do the client work.
          </p>

          <div className="method-steps">
            {principles.map((principle) => (
              <div key={principle.index}>
                <span>{principle.index}</span>
                <p>{principle.title}</p>
              </div>
            ))}
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
