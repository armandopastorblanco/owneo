import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initPostHog } from "./lib/posthog";

initPostHog();

// Ensure users always see the latest version: aggressively clear any stale
// Service Worker and browser caches on every load (except in published prod).
const host = window.location.hostname;
const isPublishedProd =
  host.endsWith("lovable.app") &&
  !host.includes("preview") &&
  !host.includes("lovableproject");

const cleanupStaleCaches = async () => {
  let didCleanup = false;

  if ("serviceWorker" in navigator) {
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      if (regs.length > 0) {
        await Promise.all(regs.map((r) => r.unregister()));
        didCleanup = true;
      }
    } catch {}
  }

  if (typeof window !== "undefined" && window.caches) {
    try {
      const keys = await caches.keys();
      if (keys.length > 0) {
        await Promise.all(keys.map((k) => caches.delete(k)));
        didCleanup = true;
      }
    } catch {}
  }

  // If we actually removed a stale SW/cache, force one hard reload so the
  // user immediately gets the freshest assets (only once per session).
  if (didCleanup && !sessionStorage.getItem("__owneo_cache_cleared")) {
    sessionStorage.setItem("__owneo_cache_cleared", "1");
    window.location.reload();
  }
};

if (!isPublishedProd) {
  cleanupStaleCaches();
}

createRoot(document.getElementById("root")!).render(<App />);
