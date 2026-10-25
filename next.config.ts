import type { NextConfig } from "next";
import { legacyRedirects } from "./src/lib/redirects.ts";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // Old tabbed-site links (?panel=, ?study=, /work/<old-slug>) keep working.
  redirects: async () => [
    ...legacyRedirects(),
    // The Frappe / ERPNext CV was dropped. Send old links to the main CV.
    { source: "/cv.html", destination: "/cv-developer.html", permanent: false },
    {
      source: "/Almarie_Bullo_CV.pdf",
      destination: "/Almarie_Bullo_Developer_CV.pdf",
      permanent: false,
    },
  ],
};

export default nextConfig;
