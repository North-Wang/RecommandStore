import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue()],
  esbuild: {
    // 讓打包後不會出現console.log
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  },
});
