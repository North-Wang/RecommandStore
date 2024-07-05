import { createApp } from "vue";
import PrimeVue from "primevue/config";
//pinia
import { createPinia, storeToRefs } from "pinia";
const pinia = createPinia();
pinia.use(
  createPersistedState({
    storage: sessionStorage, //設定Pinia檔persist為true時，默認資料儲存的位置
  })
);
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createPersistedState } from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

//ccs
import "./style.css";
import "animate.css";

//PrimeVue DataTable
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
//各種內建的表格主題：https://primevue.org/theming/
// import "primevue/resources/themes/md-light-deeppurple/theme.css";
// import "primevue/resources/themes/arya-orange/theme.css";

//i18n
import { createI18n } from "vue-i18n";
import { locale as en } from "./i18n/en.js";
import { locale as zh_tw } from "./i18n/zh_tw.js";
const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: sessionStorage.getItem("lang") || "zh_tw", //設定本地語言種類
  fallbackLocale: "en",
  messages: {
    en,
    zh_tw,
  },
});

// Vue.config.productionTip = false; //禁止開發模式的提示
const app = createApp(App);

app.config.errorHandler = (err) => {
  console.error("捕抓到錯誤訊息", err);
};

app.use(pinia).use(PrimeVue).use(router).use(i18n).mount("#app");
