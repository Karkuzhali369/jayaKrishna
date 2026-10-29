import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Strict Content-Security-Policy, added ONLY to the production build.
// (The dev server injects inline <style>/<script> tags for hot reload, which a strict CSP would block
//  and make the page look unstyled, so it is not applied during `npm run dev`.)
const CSP = "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-src https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'none'";
const securityMeta = () => ({
  name: "security-meta",
  transformIndexHtml(html, ctx) {
    if (ctx.server) return html; // dev server: skip
    return html.replace("<head>", `<head>\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`);
  },
});

// base "./" lets the build work on Netlify, Vercel, GitHub Pages and any static host
export default defineConfig({ plugins: [react(), securityMeta()], base: "./", build: { sourcemap: false } });
