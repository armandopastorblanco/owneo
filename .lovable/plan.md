The user wants to enable GA4 debug mode by adding `{ debug_mode: true }` to the `gtag('config', ...)` call.

## Note on location
The `gtag('config', 'G-90KY76FQMY', ...)` line is **not** in `index.html`. It lives in `src/lib/consent.ts` inside the `loadGtag()` function:

```ts
gtag("config", GA_ID, { anonymize_ip: true, send_page_view: false });
```

## Change
In `src/lib/consent.ts`, update that line to:

```ts
gtag("config", GA_ID, { anonymize_ip: true, send_page_view: false, debug_mode: true });
```

This will send hits to GA4 DebugView for validation.