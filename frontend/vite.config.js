import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url"; // Needed for ESM
import basicSsl from '@vitejs/plugin-basic-ssl'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  server: {
    https: true,
     
  },
  proxy: {
    '/api': 'https://127.0.0.1:8000',  // Proxy to backend
  },
  plugins: [react(),basicSsl()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "./src/index.css";`,
      },
    },
  },
});
