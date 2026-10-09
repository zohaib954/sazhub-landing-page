import type { NextConfig } from "next";

// Fully static export: `npm run build` writes plain HTML/CSS/JS to `out/`,
// which can be served by Netlify, Vercel, Cloudflare Pages, S3 or any web server.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
