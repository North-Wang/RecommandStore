import { defineConfig, loadEnv } from "vite"; //loadEnv：下載.env
import vue from "@vitejs/plugin-vue";
import mkcert from "vite-plugin-mkcert"; //讓專案有https

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 可以根據當前工作目錄中的 `mode` 加載 .env 文件
  // 設置第三個參數為 '' 來加載所有環境變量，而不管是否有 `VITE_` 前綴
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: `/${env.VITE_LINE_PAY_CHANNEL_ID}/`,
    server: {
      https: true,
    },
    plugins: [vue(), mkcert()],
    base: [process.env.line_pay_channel_id],
    esbuild: {
      // 讓打包後不會出現console.log
      drop:
        process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
    },
  };
});
