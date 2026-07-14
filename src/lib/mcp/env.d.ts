// Ambient declaration so tool files can reference `process.env.*` at authoring
// time. The plugin bundles these files into a Deno function where `process` is
// provided at runtime; at build time this keeps TS happy without pulling in
// @types/node globally.
declare const process: { env: Record<string, string | undefined> };
