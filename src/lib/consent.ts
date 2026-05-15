import { supabase } from "@/integrations/supabase/client";

export const CONSENT_STORAGE_KEY = "owneo_cookie_consent";
export const CONSENT_SESSION_KEY = "owneo_cookie_session_id";
export const CONSENT_VERSION = "1.0";
export const CONSENT_UPDATED_EVENT = "owneo:consent-updated";
export const CONSENT_OPEN_EVENT = "owneo:consent-open";

export type ConsentCategories = {
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
};

export type StoredConsent = ConsentCategories & {
  version: string;
  consented_at: string;
};

export function getStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function uuidv4(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback (RFC4122 v4)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(CONSENT_SESSION_KEY);
  if (!id) {
    id = uuidv4();
    localStorage.setItem(CONSENT_SESSION_KEY, id);
  }
  return id;
}

/* ---------- Analytics gating ---------- */

const GA_ID = "G-90KY76FQMY";

function loadGtag() {
  if (typeof window === "undefined") return;
  if (document.getElementById("ga-gtag-script")) return;

  const w = window as typeof window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtag: (...args: any[]) => void = function (...args) {
    w.dataLayer!.push(args);
  };
  (window as unknown as { gtag: typeof gtag }).gtag = gtag;

  const s = document.createElement("script");
  s.id = "ga-gtag-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  gtag("js", new Date());
  gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "granted",
  });
  gtag("config", GA_ID, { anonymize_ip: true });
}

async function loadPosthog() {
  const apiKey = import.meta.env.VITE_POSTHOG_KEY;
  if (!apiKey) return;
  const mod = await import("@/lib/posthog");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ph: any = mod.posthog;
  if (ph?.__loaded) return;
  mod.initPostHog();
}

export function applyConsent(consent: ConsentCategories) {
  if (typeof window === "undefined") return;
  if (consent.analytics) {
    loadGtag();
    loadPosthog();
  }
  // Marketing & personalization tags would be wired here when added.
}

/* ---------- Save (local + remote) ---------- */

export async function saveConsent(consent: ConsentCategories): Promise<StoredConsent> {
  const stored: StoredConsent = {
    ...consent,
    version: CONSENT_VERSION,
    consented_at: new Date().toISOString(),
  };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // ignore storage errors
  }

  applyConsent(consent);

  const sessionId = getOrCreateSessionId();
  let userId: string | null = null;
  try {
    const { data } = await supabase.auth.getSession();
    userId = data.session?.user?.id ?? null;
  } catch {
    userId = null;
  }

  try {
    await supabase.from("cookie_consents").insert({
      session_id: sessionId,
      user_id: userId,
      analytics: consent.analytics,
      marketing: consent.marketing,
      personalization: consent.personalization,
      consent_version: CONSENT_VERSION,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    });
  } catch (err) {
    console.warn("[consent] failed to persist remotely", err);
  }

  window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT, { detail: stored }));
  return stored;
}

export function openConsentManager() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
