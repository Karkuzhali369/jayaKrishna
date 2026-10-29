import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// base "./" lets the build work on Netlify, Vercel, GitHub Pages and any static host
export default defineConfig({ plugins: [react()], base: "./" });
