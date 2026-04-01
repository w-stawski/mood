import type { NextConfig } from 'next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Directory that contains this config and `node_modules` (avoids wrong root when a parent folder has an extra lockfile). */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  devIndicators: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
