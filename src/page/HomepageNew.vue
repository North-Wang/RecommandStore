<template>
  <main
    class="bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] relative flex justify-center select-none"
  >
    <div
      class="w-screen h-2/5 bg-[#1B1A1A]/90 text-white flex flex-column items-center justify-between"
    >
      <div class="w-[80%]">
        <h1
          class="text-left break-keep text-[48px] md:text-[64px] font-black md:text-center py-[48px]"
        >
          <span>{{ $t("homepage.title") }}</span>
        </h1>
        <h2 class="font-bold">
          <span>{{ $t("homepage.intro") }}</span>
        </h2>
        <ul class="grid col-span-4 text-black gap-2 mt-3 justify-center">
          <li v-for="types in allTypeOption" :key="types" class="">
            <button
              class="font-semibold dark:bg-white"
              :style="currentType === types ? 'background-color:#87D4FF' : ''"
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
      class="fixed bottom-[100px] z-40 w-3/5 max-w-[240px] cursor-pointer select-none animate-bounce"
      @click="doFilter()"
    >
      {{ $t("homepage.button") }}
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
import { useI18n } from "vue-i18n";
import isMobileDevice from "../js/isMobileDevice";

import FilterButton from "../component/FilterButton.vue";

const storeInfo = useStoreInfo();
const filterInfo = useFilter();
const loading = useLoading();
const { allTypeOption } = storeToRefs(storeInfo);
const { type } = storeToRefs(filterInfo);
const { t, locale } = useI18n({
  inheritLocale: true,
  useScope: "global",
});

const isMobile = isMobileDevice();
const router = useRouter();
const currentType = ref("");

function doFilter() {
  storeInfo.filterType(currentType.value);
  router.push("/FilterResult");
}

function changeType(type) {
  currentType.value = type;
  filterInfo.type = type;
}

function setDefaultType() {
  currentType.value = allTypeOption.value[0];
  filterInfo.type = allTypeOption.value[0];
}

watch(
  allTypeOption,
  () => {
    //第一次進來的時候，要設定currentType
    setDefaultType();
  },
  { immediate: true }
);

onMounted(() => {
  if (type.value !== "") {
    //如果有選擇過type
    currentType.value = type.value;
  } else {
    setDefaultType();
  }
});
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
