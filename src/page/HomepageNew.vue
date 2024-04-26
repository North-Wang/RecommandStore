<template>
  <main
    class="bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] relative flex justify-center"
  >
    <div
      class="w-screen h-2/5 bg-[#1B1A1A]/90 text-white flex flex-column items-center justify-between"
    >
      <div class="w-[80%] mt-[56px]">
        <h1 class="text-left break-keep text-[48px] md:text-[64px] font-black">
          RECOMMEND STORE
        </h1>
        <h2 class="font-bold">Choose the best place</h2>
      </div>
    </div>
    <!-- <FilterButton /> -->
    <button
      class="fixed bottom-[150px] z-40 w-3/5"
      @click="router.push('/FilterResult')"
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
import { useRouter } from "vue-router";
import isMobileDevice from "../js/isMobileDevice";

import FilterButton from "../component/FilterButton.vue";

const storeInfo = useStoreInfo();
const loading = useLoading();
const { storeList, titleList, storeListAfterFilterType, allTypeOption } =
  storeToRefs(storeInfo);
const isMobile = isMobileDevice();
const router = useRouter();

function doFilter(params) {}

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
  /* letter-spacing: -0.025em; */
}
h2 {
  margin-top: 16px;
}
input[type="text"] {
  background-color: #fff;
  height: 40px;
  margin-bottom: 32px;
  color: #c4c4c4;
  text-align: center;
}
</style>
