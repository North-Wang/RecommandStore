<template>
  <div
    class="bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] relative flex justify-center"
  >
    <div
      class="w-screen h-2/5 bg-[#1B1A1A]/90 text-white flex flex-column items-center justify-between"
    >
      <div class="w-[80%] mt-[56px]">
        <h1 class="">RECOMMEND</h1>
        <h1 class="">STORE</h1>
        <h2>Choose the best place</h2>
      </div>
      <input
        type="text"
        value="尋找理想中的地點"
        class="w-[80%] rounded-lg"
        readonly
      />
    </div>
    <FilterButton />
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  watch,
  computed,
  Transition,
  Teleport,
  provide,
} from "vue";

import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import { useLoading } from "../store/useLoading";

import FilterButton from "../component/FilterButton.vue";

const storeInfo = useStoreInfo();
const loading = useLoading();
const { storeList, titleList, storeListAfterFilterType } =
  storeToRefs(storeInfo);

function doFilter(params) {}
</script>

<style scoped>
h1 {
  font-size: 64px;
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
