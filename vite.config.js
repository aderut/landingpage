import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // anything starting with /api will be forwarded
      "/api": {
        target: "https://dealer.ufuon.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
