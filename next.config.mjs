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
};

export default nextConfig;
