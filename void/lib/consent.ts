"use client";

/**
 * Cookie consent state.
 *
 * Three categories, matching what the banner tells people:
 *   necessary   always on, not optional
 *   preferences remembers interface choices
 *   statistics  gates analytics
 *
 * Stored in localStorage rather than a cookie, so presenting the choice does
 * not itself store anything until it is answered.
 */

const KEY = "voidsec.consent";
const EVENT = "voidsec:consent";

export type ConsentPrefs = {
  preferences: boolean;
  statistics: boolean;
};

/** "unknown" only appears server-side, before the browser has been read. */
export type ConsentState = "unknown" | "unset" | ConsentPrefs;

export const ALL_ON: ConsentPrefs = { preferences: true, statistics: true };
export const NECESSARY_ONLY: ConsentPrefs = {
  preferences: false,
  statistics: false,
};

export function setConsent(value: ConsentPrefs | null) {
  try {
    if (value === null) window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // Storage unavailable. Nothing persists, but the UI still updates.
  }
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeConsent(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);

  /*
   * React reads getServerSnapshot during hydration and only re-reads when the
   * store notifies. Without this nudge the state stays "unknown" forever and
   * the banner never appears.
   */
  const id = window.setTimeout(callback, 0);

  return () => {
    window.clearTimeout(id);
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/*
 * useSyncExternalStore compares snapshots with Object.is, so parsing a fresh
 * object on every call would loop forever. Cache against the raw string.
 */
let cachedRaw: string | null = null;
let cachedValue: ConsentState = "unset";

export function getConsentSnapshot(): ConsentState {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    raw = null;
  }

  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;

  if (raw === null) {
    cachedValue = "unset";
    return cachedValue;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ConsentPrefs>;
    cachedValue = {
      preferences: parsed.preferences === true,
      statistics: parsed.statistics === true,
    };
  } catch {
    cachedValue = "unset";
  }

  return cachedValue;
}

export function getConsentServerSnapshot(): ConsentState {
  return "unknown";
}

export function isDecided(state: ConsentState): state is ConsentPrefs {
  return state !== "unknown" && state !== "unset";
}
