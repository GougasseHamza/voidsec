"use client";

import { useSyncExternalStore } from "react";

import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  setConsent,
  subscribeConsent,
} from "@/lib/consent";

const LABELS = {
  granted: "Analytics allowed",
  denied: "Analytics declined",
  none: "No choice recorded yet",
} as const;

/** Lets someone see and change their choice after the fact. */
export function ConsentControls() {
  const state = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  // Nothing useful to show until the browser has been read.
  if (state === "unknown") return null;

  return (
    <div className="consent-controls">
      <dl>
        <div>
          <dt>Current setting</dt>
          <dd>{LABELS[state]}</dd>
        </div>
      </dl>

      <div className="consent-controls-actions">
        {state === "granted" ? (
          <button type="button" onClick={() => setConsent("denied")}>
            Turn analytics off
          </button>
        ) : (
          <button type="button" onClick={() => setConsent("granted")}>
            Turn analytics on
          </button>
        )}
        {state !== "none" && (
          <button type="button" onClick={() => setConsent(null)}>
            Reset choice
          </button>
        )}
      </div>
    </div>
  );
}
