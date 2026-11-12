import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // One cacheable chunk per content module instead of one huge bundle.
        manualChunks(id) {
          const m = id.match(/src[\\/]data[\\/](module\d+)/);
          if (m) return `content-${m[1]}`;
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
});
