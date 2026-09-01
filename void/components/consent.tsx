"use client";

import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  setConsent,
  subscribeConsent,
} from "@/lib/consent";

/**
 * Cookie consent, and the analytics it gates.
 *
 * Analytics do not load until consent is granted. Refusing is exactly as easy
 * as accepting, which the GDPR requires and most banners quietly ignore.
 */
export function ConsentGate() {
  const state = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  return (
    <>
      {state === "granted" && <Analytics />}

      {state === "none" && (
        <aside
          className="consent"
          role="dialog"
          aria-labelledby="consent-title"
          aria-describedby="consent-copy"
        >
          <div className="consent-body">
            <h2 id="consent-title">Analytics</h2>
            <p id="consent-copy">
              We would like to count page views, so we know which parts of this
              site are worth keeping. No advertising, no profiling, nothing sold
              on. Decline and the site works exactly the same.{" "}
              <Link href="/privacy">What we collect</Link>.
            </p>
          </div>

          <div className="consent-actions">
            <button type="button" onClick={() => setConsent("denied")}>
              Decline
            </button>
            <button type="button" onClick={() => setConsent("granted")}>
              Allow
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
