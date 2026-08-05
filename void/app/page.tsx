import { AmbientPointer } from "@/components/ambient-pointer";
import { ArrowUpRight, Crosshair } from "@/components/icons";
import { capabilities, members } from "@/lib/site-data";

const year = new Date().getFullYear();

export default function Home() {
  return (
    <main>
      <AmbientPointer />

      <header className="site-header shell">
        <a className="brand" href="#top" aria-label="VoidSec home">
          <span className="brand-mark" aria-hidden="true">
            <span>V</span>
            <i />
          </span>
          <span className="brand-name">VOIDSEC</span>
        </a>

        <nav className="main-nav" aria-label="Primary navigation">
          <a href="#operators">Operators</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-status" aria-label="Team status: online">
          <span className="status-pulse" />
          System online
        </div>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-grid-lines" aria-hidden="true" />

        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span>Capture the flag collective</span>
            <span className="eyebrow-code">VS / 2026</span>
          </div>

          <h1>
            <span>Trace the</span>
            <span className="hero-title-accent">
              unkn<span className="title-target">o</span>wn.
            </span>
          </h1>

          <div className="hero-intro-row">
            <p>
              Four operators. One shared objective: reduce complex systems to the
              detail that breaks them open.
            </p>
            <a className="circle-link" href="#operators" aria-label="Meet the operators">
              <ArrowUpRight />
            </a>
          </div>
        </div>

        <div className="signal-stage" aria-label="VoidSec operational signal graphic">
          <div className="signal-meta signal-meta-top">
            <span>Target surface</span>
            <span>04 vectors</span>
          </div>

          <div className="scope">
            <div className="scope-ring scope-ring-one" />
            <div className="scope-ring scope-ring-two" />
            <div className="scope-ring scope-ring-three" />
            <div className="scope-axis scope-axis-x" />
            <div className="scope-axis scope-axis-y" />
            <div className="scope-sweep" />
            <div className="scope-core">
              <span className="scope-slash">/</span>
              <span>VS</span>
            </div>
            <span className="scope-node node-one">01</span>
            <span className="scope-node node-two">02</span>
            <span className="scope-node node-three">03</span>
            <span className="scope-node node-four">04</span>
          </div>

          <div className="signal-meta signal-meta-bottom">
            <span>Signal acquired</span>
            <span>34.0209° N</span>
          </div>
        </div>

        <div className="hero-index" aria-hidden="true">
          <span>01</span>
          <div />
          <span>04</span>
        </div>
      </section>

      <div className="signal-strip" aria-label="VoidSec disciplines">
        <div className="signal-track">
          {[0, 1].map((copy) => (
            <div className="signal-track-copy" key={copy} aria-hidden={copy === 1}>
              <span>Web exploitation</span><i />
              <span>Open-source intelligence</span><i />
              <span>Cryptography</span><i />
              <span>Reverse engineering</span><i />
              <span>Pwn</span><i />
              <span>Miscellaneous</span><i />
            </div>
          ))}
        </div>
      </div>

      <section className="operators-section shell section" id="operators">
        <div className="section-heading">
          <div>
            <span className="section-kicker">01 / Operators</span>
            <h2>Meet the crew<span>.</span></h2>
          </div>
          <p>
            Focused disciplines. Shared context. Every challenge gets the right
            pair of eyes—and then the whole room.
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
                <h3>{member.handle}</h3>
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

      <section className="capabilities-section section" id="capabilities">
        <div className="shell capabilities-shell">
          <div className="capabilities-intro">
            <span className="section-kicker section-kicker-dark">02 / Capabilities</span>
            <h2>
              Different layers.
              <br />
              <em>Same signal.</em>
            </h2>
            <p>
              VoidSec works horizontally across the board. Each specialty is a
              different entry point into the same problem.
            </p>
          </div>

          <div className="capability-list">
            {capabilities.map((capability) => (
              <article className="capability-row" key={capability.index}>
                <span className="capability-index">{capability.index}</span>
                <div className="capability-title">
                  <span>{capability.label}</span>
                  <h3>{capability.name}</h3>
                </div>
                <p>{capability.description}</p>
                <Crosshair />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto shell section">
        <div className="manifesto-aside">
          <span className="section-kicker">03 / Method</span>
          <div className="manifesto-counter">
            <span>4</span>
            <small>operators</small>
          </div>
        </div>

        <div className="manifesto-copy">
          <p className="manifesto-lead">
            We do not collect disciplines. We connect them.
          </p>
          <p className="manifesto-body">
            A strange header becomes an OSINT lead. A ciphertext becomes a binary
            primitive. A reversing detail becomes the path to control. The board
            is connected, so we are too.
          </p>

          <div className="method-steps">
            <div>
              <span>01</span>
              <p>Observe without assumptions.</p>
            </div>
            <div>
              <span>02</span>
              <p>Reduce the attack surface.</p>
            </div>
            <div>
              <span>03</span>
              <p>Share signal, not noise.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-grid" aria-hidden="true" />
        <div className="shell contact-shell">
          <div className="contact-label">
            <span className="status-pulse" />
            Secure channel provisioning
          </div>
          <h2>
            Enter the
            <br />
            <span>void.</span>
          </h2>
          <div className="contact-bottom">
            <p>
              Official team email and domain are coming online next. Until then,
              the crew is focused on the board.
            </p>
            <div className="contact-pending">
              <span>Contact route</span>
              <strong>INITIALIZING<span className="blink">_</span></strong>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer shell">
        <a className="brand footer-brand" href="#top" aria-label="Back to top">
          <span className="brand-mark" aria-hidden="true"><span>V</span><i /></span>
          <span className="brand-name">VOIDSEC</span>
        </a>
        <p>Capture the flag collective / {year}</p>
        <a href="#top" className="back-to-top">
          Back to top <ArrowUpRight />
        </a>
      </footer>
    </main>
  );
}
