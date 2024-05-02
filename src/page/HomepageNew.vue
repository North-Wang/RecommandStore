<template>
  <main
    class="bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] relative flex justify-center"
  >
    <div
      class="w-screen h-2/5 bg-[#1B1A1A]/90 text-white flex flex-column items-center justify-between"
    >
      <div class="w-[80%]">
        <h1
          class="text-left break-keep text-[48px] md:text-[64px] font-black md:text-center py-[48px]"
        >
          RECOMMEND STORE
        </h1>
        <h2 class="font-bold">Choose a purple</h2>
        <ul class="grid col-span-4 text-black gap-2 mt-3 justify-center">
          <li v-for="types in allTypeOption" :key="types" class="">
            <button
              :class="currentType === types ? 'bg-blue ' : ''"
              @click="changeType(types)"
            >
              {{ types }}
            </button>
          </li>
        </ul>
      </div>
    </div>
    <!-- <FilterButton /> -->
    <button
      class="fixed bottom-[100px] z-40 w-3/5 max-w-[240px] cursor-pointer select-none"
      @click="doFilter()"
    >
      START
    </button>
  </main>
</template>

<script setup>
import { ref, onMounted, watch, computed, Transition, Teleport } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import { useLoading } from "../store/useLoading";
import { useFilter } from "../store/useFilter";
import { useRouter } from "vue-router";
import isMobileDevice from "../js/isMobileDevice";

import FilterButton from "../component/FilterButton.vue";

const storeInfo = useStoreInfo();
const filterInfo = useFilter();
const loading = useLoading();
const { allTypeOption } = storeToRefs(storeInfo);
const { type } = storeToRefs(filterInfo);
const isMobile = isMobileDevice();
const router = useRouter();
const currentType = ref(type || allTypeOption.value[0] || "餐廳");

function doFilter() {
  storeInfo.filterType(currentType.value);
  router.push("/FilterResult");
}

function changeType(type) {
  currentType.value = type;
  filterInfo.type = type;
}

onMounted(() => {});
</script>

<style scoped>
main {
  background-image: linear-gradient(
      rgba(255, 255, 253, 0.5),
      rgba(32, 60, 90, 0.5)
    ),
    url("../assets/bgMap.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
h1 {
  line-height: 1;
  text-wrap: wrap;
  text-align: left;
  font-family: "Francois One", sans-serif;
}
/* h2 {
  margin-top: 16px;
} */
input[type="text"] {
  background-color: #fff;
  height: 40px;
  margin-bottom: 32px;
  color: #c4c4c4;
  text-align: center;
}
</style>
