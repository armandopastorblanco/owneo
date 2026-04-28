import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initPostHog } from "./lib/posthog";

const host = window.location.hostname;
const isPublishedProd =
  host.endsWith("lovable.app") &&
  !host.includes("preview") &&
  !host.includes("lovableproject");

// Build-time stamp injected by Vite. Changes on every build, so we can detect
// when the user is running an outdated bundle and force a refresh.
const BUILD_ID = (import.meta as any).env?.VITE_BUILD_ID || String(Date.now());

const bootstrap = async () => {
  if (!isPublishedProd) {
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

    const storedBuild = localStorage.getItem("__owneo_build_id");
    const buildChanged = storedBuild && storedBuild !== BUILD_ID;
    localStorage.setItem("__owneo_build_id", BUILD_ID);

    const alreadyReloaded = sessionStorage.getItem("__owneo_cache_cleared");
    if ((didCleanup || buildChanged) && !alreadyReloaded) {
      sessionStorage.setItem("__owneo_cache_cleared", "1");
      // Use replace to avoid polluting history, and add a cache-busting param.
      const url = new URL(window.location.href);
      url.searchParams.set("_v", BUILD_ID);
      window.location.replace(url.toString());
      return;
    }
  }

  initPostHog();
  createRoot(document.getElementById("root")!).render(<App />);
};

bootstrap();
