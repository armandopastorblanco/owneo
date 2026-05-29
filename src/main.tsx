import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { applyConsent, getStoredConsent } from "./lib/consent";

// Re-apply previously granted consent (loads GA + PostHog only if accepted).
const stored = getStoredConsent();
if (stored) {
  applyConsent({
    analytics: stored.analytics,
    marketing: stored.marketing,
    personalization: stored.personalization,
  });
}

const host = window.location.hostname;
const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();

const isPreviewOrDev =
  isInIframe ||
  host.includes("id-preview--") ||
  host.includes("lovableproject.com") ||
  host.includes("preview") ||
  host.includes("localhost") ||
  host === "127.0.0.1";

async function clearStalePreviewCaches() {
  let clearedSomething = false;

  if ("serviceWorker" in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        registrations.map(async (registration) => {
          const unregistered = await registration.unregister();
          clearedSomething = clearedSomething || unregistered;
        }),
      );
    } catch {
      // noop
    }
  }

  if ("caches" in window) {
    try {
      const keys = await caches.keys();
      await Promise.all(
        keys.map(async (key) => {
          const deleted = await caches.delete(key);
          clearedSomething = clearedSomething || deleted;
        }),
      );
    } catch {
      // noop
    }
  }

  return clearedSomething;
}

if (isPreviewOrDev) {
  const reloadKey = `preview-cache-cleared:${window.location.pathname}`;

  clearStalePreviewCaches().then((clearedSomething) => {
    if (clearedSomething && !sessionStorage.getItem(reloadKey)) {
      sessionStorage.setItem(reloadKey, "true");
      window.location.reload();
      return;
    }

    if (!clearedSomething) {
      sessionStorage.removeItem(reloadKey);
    }
  });
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
