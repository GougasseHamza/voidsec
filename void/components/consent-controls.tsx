"use client";

import { useSyncExternalStore } from "react";

import {
  ALL_ON,
  NECESSARY_ONLY,
  getConsentServerSnapshot,
  getConsentSnapshot,
  isDecided,
  setConsent,
  subscribeConsent,
} from "@/lib/consent";

/** Lets someone see and change their cookie choice after the fact. */
export function ConsentControls() {
  const state = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  // Nothing useful to show until the browser has been read.
  if (state === "unknown") return null;

  const decided = isDecided(state);
  const current = !decided
    ? "No choice recorded yet"
    : state.preferences && state.statistics
      ? "All cookies accepted"
      : state.statistics
        ? "Necessary and statistics"
        : state.preferences
          ? "Necessary and preferences"
          : "Necessary only";

  return (
    <div className="consent-controls">
      <dl>
        <div>
          <dt>Current setting</dt>
          <dd>{current}</dd>
        </div>
      </dl>

      <div className="consent-controls-actions">
        <button type="button" onClick={() => setConsent(ALL_ON)}>
          Accept all
        </button>
        <button type="button" onClick={() => setConsent(NECESSARY_ONLY)}>
          Necessary only
        </button>
        {decided && (
          <button type="button" onClick={() => setConsent(null)}>
            Reset choice
          </button>
        )}
      </div>
    </div>
  );
}
