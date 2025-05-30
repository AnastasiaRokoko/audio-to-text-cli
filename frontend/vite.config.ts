import { defineConfig } from "vite";
export default defineConfig({
  optimizeDeps: {
    include: ["@ics/gx-vector-search"],
  },
});
