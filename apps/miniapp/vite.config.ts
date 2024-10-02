import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/prediction/public": {
        target: "https://tgqa.noahlabs.tech/",
        changeOrigin: true,
        secure: false,
        configure(proxy) {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("origin", "https://tgqa.noahlabs.tech");
          });

          proxy.on("proxyRes", (proxyRes, res) => {
            console.log(proxyRes.headers, { res: res.headers });
          });
        },
        cookieDomainRewrite: {
          "*": "localhost",
        },
      },
      "/prediction/private": {
        target: "https://tgqa.noahlabs.tech/",
        changeOrigin: true,
        secure: false,
        configure(proxy) {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("origin", "https://tgqa.noahlabs.tech");
          });

          proxy.on("proxyRes", (proxyRes, res) => {
            console.log(proxyRes.headers, { res: res.headers });
          });
        },
        cookieDomainRewrite: {
          "*": "localhost",
        },
      },
    },
  },
  plugins: [
    react(),
    nodePolyfills({
      include: ["buffer"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
