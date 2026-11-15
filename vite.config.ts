import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages: https://d-direct.github.io/grandpnb/
  // Custom Domain: https://grandpnb.com (base path will be "/" once custom domain is configured)
  base: process.env.NODE_ENV === "production" ? "/grandpnb/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
