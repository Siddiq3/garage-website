import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

/**
 * Turbopack infers a workspace root by walking up for a lockfile. On a machine
 * where one sits above the repo it picks that instead and warns, so the root is
 * pinned to this directory: the build resolves the same way here and on Vercel.
 */
const nextConfig = {
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  // API_BASE_URL deliberately has no NEXT_PUBLIC_ prefix (it isn't a secret -
  // it's just the site's own backend host - but the name is what's used
  // consistently across this repo's docs and CI). Next.js only auto-exposes
  // NEXT_PUBLIC_* names to the browser, so this explicitly bakes this one
  // value into the client bundle at build time, the same way NEXT_PUBLIC_
  // vars are. Read via lib/config.js -> process.env.API_BASE_URL.
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

export default nextConfig;
