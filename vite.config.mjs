import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";
import path from "path";

export default defineConfig({
  base: "./",
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep Three.js together
          if (id.includes("three")) {
            return "three";
          }
          // Keep React Three Fiber ecosystem together
          if (id.includes("@react-three")) {
            return "react-three";
          }
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
    dedupe: ["react", "react-dom", "three"],
  },
  optimizeDeps: {
    include: [
      "react", 
      "react-dom", 
      "three", 
      "@react-three/fiber", 
      "@react-three/drei"
    ],
  },
  plugins: [react(), tsconfigPaths(), tagger()],
  server: {
    port: 4028,
    host: "0.0.0.0",
    strictPort: true,
  },
});