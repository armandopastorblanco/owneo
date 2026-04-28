import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initPostHog } from "./lib/posthog";

initPostHog();

// Ensure users always see the latest version on the Lovable preview / dev:
// unregister any stale Service Worker and clear its caches.
const host = window.location.hostname;
const isPreviewOrDev =
  host.includes("lovable.app") === false || // custom dev hosts
  host.includes("preview") ||
  host.includes("lovableproject") ||
  host.includes("localhost") ||
  host === "127.0.0.1";

if (isPreviewOrDev && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((regs) => regs.forEach((r) => r.unregister()))
    .catch(() => {});
  if (window.caches) {
    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k))).catch(() => {});
  }
}

createRoot(document.getElementById("root")!).render(<App />);
