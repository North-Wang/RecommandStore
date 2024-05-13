<template>
  <header
    class="header w-dvw gap-x-5 bg-gradient-to-b from-[#062d4b] to-[#045588] text-base select-none"
  >
    <Teleport to="body">
      <Transition
        enter-active-class="animate__animated animate__slideInLeft animate__faster"
        leave-active-class="animate__animated animate__slideOutLeft animate__faster"
      >
        <FilterBar
          ref="filterBar"
          v-show="showFilterBar"
          @closeModal="showFilterBar = false"
        />
      </Transition>
    </Teleport>

    <img
      :src="moreOptionWhite"
      alt="更多選項"
      class="w-[32px] absolute left-3 top-[15px] rotate-90 cursor-pointer"
      @click="showFilterBar = !showFilterBar"
      v-if="showIcon"
    />

    <div v-for="route in routerList" :key="route">
      <router-link :to="route.path" class="select-none">
        <span class="text-white select-none">{{ route.name }}</span>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch, computed, Transition, Teleport } from "vue";
import { useRoute } from "vue-router";
import FilterBar from "./FilterBar.vue";
import { onClickOutside } from "@vueuse/core";

//picture
import moreOptionBlack from "../assets/moreOptionBlack.svg";
import moreOptionWhite from "../assets/moreOptionWhite.svg";

const route = useRoute();
const env = computed(() => {
  return process.env.NODE_ENV;
});
const showIcon = computed(() => {
  switch (route.path) {
    case "/ContactMe":
      return false;

    default:
      return true;
  }
});
const filterBar = ref(null);
const showFilterBar = ref(false);
onClickOutside(filterBar, () => {
  showFilterBar.value = false;
});

const routerList = ref([
  { path: "/", name: "首頁" },
  // {path:"/", name:"測驗跳選", },
  { path: "/StoreListTable", name: "店家列表" },
  { path: "/ContactMe", name: "聯絡我" },
]);
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  // position: fixed;
  top: 0;
  left: 0;
  z-index: 60;
}
</style>
