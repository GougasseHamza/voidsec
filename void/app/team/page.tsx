import type { Metadata } from "next";
import Link from "next/link";

import { ArrowUpRight, Crosshair } from "@/components/icons";
import {
  competitions,
  disciplines,
  engagements,
  principles,
  site,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Team",
  alternates: { canonical: "/team" },
  description:
    "A small team of senior cybersecurity professionals with deep competitive capture-the-flag experience across web, cryptography, reverse engineering and infrastructure.",
};

export default function TeamPage() {
  const hasTrackRecord =
    engagements.length > 0 || competitions.length > 0;

  return (
    <>
      <section className="page-head shell">
        <span className="section-kicker">Team</span>
        <h1>
          Senior operators,
          <br />
          no bench<span>.</span>
        </h1>
        <p className="page-lede">
          VoidSec is a small team of senior cybersecurity professionals with
          deep competitive capture-the-flag experience across web exploitation,
          cryptography, reverse engineering and binary exploitation. Competition
          rewards chaining small findings into real access, which is most of
          what client work turns out to be.
        </p>
        <p className="page-lede">
          We do not publish individual profiles. You meet the people who will
          run your engagement on the scoping call, and they are the same people
          who write your report. If you need references, ask on that call: where
          a client has agreed to take the conversation, we will introduce you.
        </p>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div>
            <span className="section-kicker">01 / Coverage</span>
            <h2>
              What we cover<span>.</span>
            </h2>
          </div>
          <p>
            Four disciplines that overlap on most engagements. An odd response
            header turns into an exposure lead; a detail in how keys are handled
            turns into a path at the data behind them.
          </p>
        </div>

        <div className="operator-grid">
          {disciplines.map((discipline) => (
            <article className="operator-card" key={discipline.code}>
              <div className="operator-topline">
                <span>AREA / {discipline.index}</span>
                <Crosshair />
              </div>

              <div className="operator-monogram" aria-hidden="true">
                <span>{discipline.index}</span>
                <i>{discipline.code}</i>
              </div>

              <div className="operator-identity">
                <h3>{discipline.name}</h3>
                <span>{discipline.focus}</span>
              </div>

              <p className="operator-statement">{discipline.detail}</p>

              <div className="operator-disciplines">
                {discipline.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="operator-footer">
                <span>{discipline.signal}</span>
                <ArrowUpRight />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="manifesto shell section">
        <div className="manifesto-aside">
          <span className="section-kicker">02 / How we work</span>
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

      {/* Hidden until there is something to show. Add an entry to
          `engagements` or `competitions` and the section returns. */}
      {hasTrackRecord && (
        <section className="section shell">
          <div className="section-heading">
            <div>
              <span className="section-kicker">03 / Track record</span>
              <h2>
                Receipts<span>.</span>
              </h2>
            </div>
            <p>
              Two lists: client engagements we have written permission to name,
              and competition placements with a public scoreboard behind them.
              Both are empty for now.
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
                          {engagement.scope}. {engagement.outcome}
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
                    We are still compiling results. Placements go up here with
                    the event and the position, so you can check them against a
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
      )}

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
            <span>team.</span>
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
