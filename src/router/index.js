import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

// import Homepage from "../page/Homepage.vue";
import Homepage from "../page/HomepageNew.vue";
import FilterResult from "../page/FilterResult.vue";
// import StoreListTable from "../page/StoreListTable.vue";
import StoreListTable from "../page/StoreListTableNew.vue";
import StoreListTableComputer from "../page/StoreListTableComputer.vue";
import TestPage from "../page/TestPage.vue";
import ContactMe from "../page/ContactMe.vue";

import isMobileDevice from "../js/isMobileDevice";
import { useLoading } from "../store/useLoading";

const isMobile = isMobileDevice();
// const loadingInfo = useLoading();

const router = createRouter({
  history: createWebHashHistory(), //如果填入"/object"，這樣進去每個分頁的前面都會有/object
  scrollBehavior(to, from, savedPosition) {
    //進到頁面都會回到頂端
    return { top: 0, behavior: "smooth" };
  },
  routes: [
    {
      //找不到網頁時，導回首頁
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      redirect: { name: "home", component: Homepage },
    },
    {
      path: "/",
      name: "home",
      component: Homepage,
    },
    {
      path: "/home",
      name: "Homepage",
      component: Homepage,
    },
    {
      path: "/FilterResult",
      name: "FilterResult",
      component: FilterResult,
    },
    {
      path: "/StoreListTable",
      name: "StoreListTable",
      component: StoreListTable,
    },
    {
      path: "/ContactMe",
      name: "ContactMe",
      component: ContactMe,
    },
    {
      path: "/TestPage",
      name: "TestPage",
      component: TestPage,
    },
  ],
});

/* 前置守衛 */
router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  // return false
  return true;
});

export default router;
