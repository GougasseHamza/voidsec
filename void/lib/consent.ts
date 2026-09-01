"use client";

/**
 * Consent state, shared by the banner and the controls on the privacy page.
 *
 * Kept in localStorage rather than a cookie, so asking about cookies does not
 * itself set one.
 */

const KEY = "voidsec.consent";
const EVENT = "voidsec:consent";

/** "unknown" only ever appears server-side, before the browser has been read. */
export type ConsentState = "unknown" | "none" | "granted" | "denied";

export function setConsent(value: "granted" | "denied" | null) {
  try {
    if (value === null) window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, value);
  } catch {
    // Storage unavailable. Nothing to persist; the event still updates the UI.
  }
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeConsent(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);

  /*
   * React uses getServerSnapshot during hydration and only re-reads when the
   * store notifies. With no notification the value would stay "unknown"
   * forever, so nudge once on the first tick after hydration.
   */
  const id = window.setTimeout(callback, 0);

  return () => {
    window.clearTimeout(id);
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function getConsentSnapshot(): ConsentState {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === "granted" || raw === "denied") return raw;
    return "none";
  } catch {
    return "none";
  }
}

export function getConsentServerSnapshot(): ConsentState {
  return "unknown";
}
