<template>
  <main class="bg-gradient-to-b from-[#fdfbfb] to-[#ebedee]">
    <section class="select-none">
      <h3 class="py-[20px] bg-black">{{ $t("view.filterResult.title") }}</h3>
      <h4 class="bg-black pb-4">
        {{
          $t("navbar.title", { count: countMatchStore.toLocaleString() || "0" })
        }}
      </h4>
      <ul class="w-full bg-black py-4" v-if="countMatchStore === 0">
        {{
          $t("view.filterResult.noData")
        }}
      </ul>
      <ul
        class="flex justify-center min-h-[320px] max-h-[480px] mt-5 mb-[20px] md:mb-[32px]"
      >
        <li
          class="rounded-lg wrapper-result bg-white dark:bg-white max-w-[500px] md:max-w-[400px] px-[20px] pt-[16px] pb-[20px] md:pt-[12px]"
          v-if="countMatchStore !== 0"
        >
          <h3 class="select-all" :v-tooltip.bottom="resultPickup?.name">
            {{ resultPickup?.name }}
          </h3>
          <h3 class="text-darkYellow" v-if="resultPickup?.feature">
            {{ resultPickup?.feature }}
          </h3>
          <div
            class="flex gap-x-2 justify-between"
            style="border-bottom: 1.5px solid #929292"
          >
            <h4 class="text-left leading-[1.2] select-all">
              {{ resultPickup.address }}
            </h4>
            <img
              :src="copyIcon"
              alt="copyIcon"
              class="cursor-pointer select-none"
              @click.prevent="copyText(resultPickup?.address)"
            />
          </div>
          <ul class="wrapper-tag" v-if="resultPickup?.addressTag">
            <li v-for="tags in resultPickup?.addressTag">
              <h4 class="tag bg-blue">{{ tags }}</h4>
            </li>
          </ul>
          <ul class="wrapper-tag" v-if="resultPickup?.purple">
            <li v-for="tags in resultPickup?.purple.split('、')">
              <h4 class="tag bg-yellow">{{ tags }}</h4>
            </li>
          </ul>
          <ul class="wrapper-tag" v-if="resultPickup?.feature">
            <li v-for="tags in resultPickup?.feature.split('、')">
              <h4 class="tag bg-[#A9A9A9]">{{ tags }}</h4>
            </li>
          </ul>
          <ul
            class="mt-[8px]"
            style="border-top: 0.5px solid gray"
            v-if="resultPickup?.note"
          >
            <div class="text-left my-1">備註：</div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              class="dark:bg-lightGray text-gray-500 dark:text-gray-500"
              >{{ resultPickup?.note }}</textarea
            >
          </ul>
        </li>
      </ul>
    </section>

    <Teleport to="#app">
      <div
        class="w-full flex justify-center animate-pulse bottom-[0px] absolute"
        v-if="countMatchStore !== 0"
      >
        <button class="btn-filter select-none" @click.prevent="doFilter()">
          抽選
        </button>
      </div>
    </Teleport>
  </main>
</template>

<script setup>
import { ref, onMounted, watch, computed, Teleport } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import Tooltip from "primevue/tooltip";

import copyIcon from "../assets/copy.svg";

const storeInfo = useStoreInfo();
const { storeResult, storeTemporary } = storeToRefs(storeInfo);
const countMatchStore = computed(() => {
  return storeResult.value.length;
});
const resultPickup = ref({}); //抽選的結果

async function copyText(text) {
  navigator.clipboard.writeText(text);
}

//隨機抽選一個店家
function doFilter() {
  if (storeResult.value.length === 0) {
    //沒有選擇除了type以外的篩選條件
    const index = Math.floor(Math.random() * storeTemporary.value.length);
    resultPickup.value = storeTemporary.value[index] || {};
  } else {
    const index = Math.floor(Math.random() * storeResult.value.length);
    resultPickup.value = storeResult.value[index] || {};
  }

  console.log("抽選的結果", resultPickup.value);
}

watch(storeResult, () => {
  doFilter();
});

onMounted(() => {
  doFilter();
});
</script>

<style scoped lang="scss">
main {
  background-image: linear-gradient(
      rgba(255, 255, 253, 0.5),
      rgba(32, 60, 90, 0.5)
    ),
    url("../assets/bgMap.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  position: relative;
}
section {
  // background-color: black;
  color: white;
}
.wrapper-result {
  width: 80%;
  // background-color: #ededed;
  color: black;
  text-align: left;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  user-select: none !important;
  h3:first-child {
    font-weight: 700;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  h3 {
    padding-top: 8px;
    padding-bottom: 8px;
    // margin-top: 8px;
    // margin-bottom: 8px;
    border-bottom: 1.5px solid #929292;
  }
  h4 {
    padding-top: 8px;
    padding-bottom: 8px;
  }
  textarea {
    width: 100%;
    padding: 4px 8px;
    overflow-y: auto;
    height: 80px;
    border-radius: 5px;
    border: 1px solid gray;
  }
}
.wrapper-tag {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  color: black;
  font-weight: 600;
}
.btn-filter {
  z-index: 40;
  width: 60%;
  max-width: 240px;
  cursor: pointer;
}

:deep {
  .p-tooltip {
    background-color: steelblue;
    color: white;
  }
}
</style>
