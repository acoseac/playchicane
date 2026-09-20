import type { NextConfig } from "next";

/**
 * No `output: "export"` any more, and that is the series' doing.
 *
 * Every marketing page here is still prerendered at build time and served as a
 * static file. What a static *export* cannot do is regenerate one page on a
 * timer, which is how `/series/` shows a live season without the browser ever
 * contacting the API — the property that keeps this site's promise of no
 * cookies, no scripts and no forms literally true. Vercel is Next's own host,
 * so the runtime this needs is already there.
 */
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
