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

//ccs
import "./reset.css"
import "./style.css";
import "animate.css";

import App from "./App.vue";
import router from "./router";

//PrimeVue DataTable start
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
//各種內建的表格主題：https://primevue.org/theming/
// import "primevue/resources/themes/md-light-deeppurple/theme.css";
// import "primevue/resources/themes/arya-orange/theme.css";
//PrimeVue DataTable end

// Vue.config.productionTip = false; //禁止開發模式的提示
const app = createApp(App);

app.config.errorHandler = (err) => {
  console.error("捕抓到錯誤訊息", err);
};

app.use(pinia).use(PrimeVue).use(router).mount("#app");
