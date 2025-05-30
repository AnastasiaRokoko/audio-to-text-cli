import { defineConfig } from "vite";
export default defineConfig({
  optimizeDeps: {
    include: ["@ics/gx-vector-search"],
  },
  server: {
    proxy: {
      "/audio": {
        target: "http://localhost:3005",
        changeOrigin: true,
      },
      "/search": {
        target: "http://localhost:3005",
        changeOrigin: true,
      },
      "/text": {
        target: "http://localhost:3005",
        changeOrigin: true,
      },
    },
  },
});
