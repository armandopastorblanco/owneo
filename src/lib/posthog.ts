import posthog from 'posthog-js';

export const initPostHog = () => {
  posthog.init('phc_xR1vH5BqDVPs5g2qIUgbIOvO4vq5QJr8iGoeu7bSiiM', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
  });
};

export { posthog };
