<template>
  <div class="bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] relative">
    <div
      class="w-dvw h-[364px] bg-[#1B1A1A]/90 text-white flex flex-column items-left px-[40px]"
    >
      <h1>RECOMMEND</h1>
      <h1>STORE</h1>
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
</script>

<style scoped>
h1 {
  font-size: 64px;
  text-align: left;
  letter-spacing: -0.025em;
}
</style>
