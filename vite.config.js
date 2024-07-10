import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    https: true,
  },
  plugins: [vue(), mkcert()],
  esbuild: {
    // 讓打包後不會出現console.log
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  },
});
