"use client";

import { Analytics } from "@vercel/analytics/react";
import { useState, useSyncExternalStore } from "react";

import {
  ALL_ON,
  NECESSARY_ONLY,
  getConsentServerSnapshot,
  getConsentSnapshot,
  isDecided,
  setConsent,
  subscribeConsent,
} from "@/lib/consent";

/**
 * Cookie banner, and the analytics it gates.
 *
 * Settings expand in place rather than sending anyone to another page.
 * Analytics only load once statistics are accepted.
 */
export function ConsentGate() {
  const state = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const [statistics, setStatistics] = useState(false);

  const statsAllowed = isDecided(state) && state.statistics;

  return (
    <>
      {statsAllowed && <Analytics />}

      {state === "unset" && (
        <aside
          className="consent"
          role="dialog"
          aria-labelledby="consent-title"
          aria-describedby="consent-copy"
        >
          <h2 id="consent-title">Cookies</h2>

          <div id="consent-copy" className="consent-copy">
            <p>
              This website uses first and third-party cookies for functional and
              statistical purposes.
            </p>
            <p>
              You have the choice to only accept cookies which are necessary for
              the functioning of this website, or to also accept preferences and
              statistics cookies. Below you can click &ldquo;Accept All&rdquo;
              to simply accept all, or manage the use of the cookies in
              &ldquo;Cookie Settings.&rdquo;
            </p>
          </div>

          {showSettings && (
            <fieldset className="consent-options">
              <legend>Cookie settings</legend>

              <label className="consent-option is-locked">
                <input type="checkbox" checked disabled readOnly />
                <span>
                  <strong>Necessary</strong>
                  Required for the site to work. Always on.
                </span>
              </label>

              <label className="consent-option">
                <input
                  type="checkbox"
                  checked={preferences}
                  onChange={(event) => setPreferences(event.target.checked)}
                />
                <span>
                  <strong>Preferences</strong>
                  Remembers choices you make, such as this one.
                </span>
              </label>

              <label className="consent-option">
                <input
                  type="checkbox"
                  checked={statistics}
                  onChange={(event) => setStatistics(event.target.checked)}
                />
                <span>
                  <strong>Statistics</strong>
                  Anonymous page view counts, so we know which pages are read.
                </span>
              </label>
            </fieldset>
          )}

          <div className="consent-actions">
            {showSettings ? (
              <button
                type="button"
                onClick={() => setConsent({ preferences, statistics })}
              >
                Save settings
              </button>
            ) : (
              <button type="button" onClick={() => setShowSettings(true)}>
                Cookie Settings
              </button>
            )}

            <button
              type="button"
              onClick={() => setConsent(NECESSARY_ONLY)}
              className="consent-necessary"
            >
              Necessary only
            </button>

            <button
              type="button"
              className="consent-accept"
              onClick={() => setConsent(ALL_ON)}
            >
              Accept All
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
