import type { NextConfig } from "next";
import { legacyRedirects } from "./src/lib/redirects.ts";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // Old tabbed-site links (?panel=, ?study=, /work/<old-slug>) keep working.
  redirects: async () => legacyRedirects(),
};

export default nextConfig;
