import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // don't allow vite to use another part, as we rely on it in our mkdocs setup
    strictPort: true,
    port: 8001,
    cors: {
      origin: "*",
    },
  },
  build: {
    outDir: "help/en/docs/js/build",
    manifest: true,
    rollupOptions: {
      input: "help/en/docs/js/grist.js",
    },
  },
});
