import { useCallback } from "react";

export const useAnalytics = () => {
  const trackEvent = useCallback(
    (eventName: string, parameters: Record<string, unknown> = {}) => {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", eventName, {
          page_url: window.location.pathname,
          ...parameters,
        });
      }
    },
    []
  );
  return { trackEvent };
};
