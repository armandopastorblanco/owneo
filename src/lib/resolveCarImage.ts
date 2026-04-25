// Robust car image resolver — handles http URLs, local /src/assets paths
// (eager-imported via Vite glob), and falls back to a branded SVG placeholder.

const localImageModules = import.meta.glob(
  "/src/assets/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" }
) as Record<string, string>;

function brandPlaceholder(brand?: string): string {
  const initials = (brand || "OW")
    .split(/\s|-/)
    .map((w) => w.trim()[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1f1f1f"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
  </defs>
  <rect width="400" height="250" fill="url(#g)"/>
  <text x="50%" y="50%" font-family="Inter, system-ui, sans-serif" font-size="64"
        font-weight="700" fill="#c9a96e" text-anchor="middle" dominant-baseline="middle">
    ${initials}
  </text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Resolve any image reference into a valid URL.
 * - http(s):// → returned as-is
 * - /assets/... or assets/... or /src/assets/... → resolved via Vite glob
 * - anything else / null → branded SVG placeholder
 */
export function resolveCarImage(path: string | null | undefined, brand?: string): string {
  if (!path) return brandPlaceholder(brand);
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }

  // Normalize to /src/assets/... form
  let normalized = path.trim();
  if (normalized.startsWith("/src/assets/")) {
    // already correct
  } else if (normalized.startsWith("/assets/")) {
    normalized = `/src${normalized}`;
  } else if (normalized.startsWith("assets/")) {
    normalized = `/src/${normalized}`;
  } else if (normalized.startsWith("src/assets/")) {
    normalized = `/${normalized}`;
  }

  const resolved = localImageModules[normalized];
  if (resolved) return resolved;

  // Last-ditch: maybe it's a public path
  if (path.startsWith("/")) return path;

  return brandPlaceholder(brand);
}
