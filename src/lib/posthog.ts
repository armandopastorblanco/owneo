import posthog from 'posthog-js';

export const initPostHog = () => {
  const apiKey = import.meta.env.VITE_POSTHOG_KEY;

  if (!apiKey) {
    console.warn('[PostHog] VITE_POSTHOG_KEY is not defined. Skipping initialization.');
    return;
  }

  posthog.init(apiKey, {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
  });
};

export { posthog };
