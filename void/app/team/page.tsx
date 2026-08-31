import type { Metadata } from "next";
import Link from "next/link";

import { ArrowUpRight, Crosshair } from "@/components/icons";
import { competitions, engagements, members, principles, site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Team",
  alternates: { canonical: "/team" },
  description:
    "Four people: application security, cryptography, reverse engineering and infrastructure. The people you meet are the people who do the work.",
};

export default function TeamPage() {
  return (
    <>
      <section className="page-head shell">
        <span className="section-kicker">Team</span>
        <h1>
          Four people,
          <br />
          no bench<span>.</span>
        </h1>
        <p className="page-lede">
          VoidSec started as a capture-the-flag team and still competes under the
          name. The habits that came out of it — chaining small findings,
          refusing to stop at the first plausible answer — are the ones we bring
          to client work.
        </p>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div>
            <span className="section-kicker">01 / Roster</span>
            <h2>
              Who does the work<span>.</span>
            </h2>
          </div>
          <p>
            Four disciplines, one engagement. Where a finding crosses two of
            them, the two of us who own those areas work it together.
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
      </section>

      <section className="manifesto shell section">
        <div className="manifesto-aside">
          <span className="section-kicker">How we work</span>
          <div className="manifesto-counter">
            <span>3</span>
            <small>rules we hold to</small>
          </div>
        </div>

        <div className="manifesto-copy">
          <h2 className="manifesto-lead">We publish what we can prove.</h2>
          <p className="manifesto-body">
            Client work stays confidential unless a client puts their name to it
            in writing, and competition results go up only with a public
            scoreboard behind them.
          </p>

          <div className="principle-rows">
            {principles.map((principle) => (
              <div className="principle-row" key={principle.index}>
                <span>{principle.index}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Track record</span>
            <h2>
              Receipts<span>.</span>
            </h2>
          </div>
          <p>
            Two lists: client engagements we have written permission to name,
            and competition placements with a public scoreboard behind them.
            Both stay empty until they are neither.
          </p>
        </div>

        <div className="record-grid">
          <div className="record-block">
            <span className="detail-kicker">Client engagements</span>
            {engagements.length === 0 ? (
              <div className="empty-state">
                <p>
                  Nothing published yet. We do not name clients without written
                  approval, and we do not publish sector-anonymised summaries
                  that a competitor could reverse into an identification.
                </p>
                <p>
                  Evaluating us and need references? Ask on the scoping call.
                  Where a client has agreed to take the conversation, we will
                  arrange the introduction.
                </p>
              </div>
            ) : (
              <ul className="record-list">
                {engagements.map((engagement) => (
                  <li key={`${engagement.year}-${engagement.sector}`}>
                    <span>{engagement.year}</span>
                    <div>
                      <h3>{engagement.sector}</h3>
                      <p>
                        {engagement.scope} — {engagement.outcome}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="record-block">
            <span className="detail-kicker">Capture the flag</span>
            {competitions.length === 0 ? (
              <div className="empty-state">
                <p>
                  Results are being compiled. Placements go up here with the
                  event and the position, so they can be checked against a
                  public scoreboard.
                </p>
                <p>
                  Entering an event is not a result, so nothing appears here
                  until there is a placement to point at.
                </p>
              </div>
            ) : (
              <ul className="record-list">
                {competitions.map((competition) => (
                  <li key={`${competition.year}-${competition.event}`}>
                    <span>{competition.year}</span>
                    <div>
                      <h3>
                        {competition.url ? (
                          <a
                            href={competition.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {competition.event}
                          </a>
                        ) : (
                          competition.event
                        )}
                      </h3>
                      <p>{competition.placement}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
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
            Meet the
            <br />
            <span>four.</span>
          </h2>
          <div className="contact-bottom">
            <p>
              Bring a system you are worried about. What we ask about it in the
              first thirty minutes will tell you whether we know the territory.
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
