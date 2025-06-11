import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import Inspect from "vite-plugin-inspect";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && Inspect(), // Replaces componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
