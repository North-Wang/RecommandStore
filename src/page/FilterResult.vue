<template>
  <main class="bg-gradient-to-b from-[#fdfbfb] to-[#ebedee]">
    <section class="select-none">
      <h3 class="py-[20px]">篩選結果</h3>
      <h4>共{{ matchStore.length.toLocaleString() }}筆資料符合</h4>
      <ul class="flex justify-center min-h-[320px] mt-5 mb-[20px] md:mb-[32px]">
        <li
          class="rounded-lg wrapper-result bg-white dark:bg-white max-w-[500px] md:max-w-[400px] px-[20px] pt-[16px] pb-[20px] md:pt-[12px]"
          v-if="Object.keys(result).length"
        >
          <h3 class="select-all" :v-tooltip.bottom="result?.name">
            {{ result?.name }}
          </h3>
          <h3 class="text-darkYellow" v-if="result?.feature">
            {{ result?.feature }}
          </h3>
          <div
            class="flex gap-x-2 justify-between"
            style="border-bottom: 1.5px solid #929292"
          >
            <h4 class="text-left leading-[1.2] select-all">
              {{ result.address }}
            </h4>
            <img :src="copyIcon" alt="copyIcon" class="cursor-pointer" />
          </div>
          <ul class="wrapper-tag" v-if="result?.addressTag">
            <li v-for="tags in result?.addressTag">
              <h4 class="tag bg-blue">{{ tags }}</h4>
            </li>
          </ul>
          <ul class="wrapper-tag" v-if="result?.purple">
            <li v-for="tags in result?.purple.split('、')">
              <h4 class="tag bg-yellow">{{ tags }}</h4>
            </li>
          </ul>
          <ul class="wrapper-tag" v-if="result?.feature">
            <li v-for="tags in result?.feature.split('、')">
              <h4 class="tag bg-[#A9A9A9]">{{ tags }}</h4>
            </li>
          </ul>
          <ul
            class="mt-[8px]"
            style="border-top: 0.5px solid gray"
            v-if="result?.note"
          >
            <div class="text-left my-1">備註：</div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              class="dark:bg-lightGray text-gray-500 dark:text-gray-500"
              >{{ result?.note }}</textarea
            >
          </ul>
        </li>
        <li v-else></li>
      </ul>
    </section>

    <div class="flex justify-center" v-if="Object.keys(result).length">
      <button
        class="fixed bottom-[100px] z-40 w-3/5 max-w-[240px] bg-red text-white cursor-pointer select-none hover:bg-[#ad4747]"
        @click.prevent="doFilter()"
      >
        抽選
      </button>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import Tooltip from "primevue/tooltip";

import copyIcon from "../assets/copy.svg";

const storeInfo = useStoreInfo();
const { matchStore, storeListAfterFilterType } = storeToRefs(storeInfo);
const result = ref({});

function doFilter() {
  if (matchStore.value.length === 0) {
    //沒有選擇除了type以外的篩選條件
    const index = Math.floor(
      Math.random() * storeListAfterFilterType.value.length
    );
    result.value = storeListAfterFilterType.value[index] || {};
  } else {
    const index = Math.floor(Math.random() * matchStore.value.length);
    result.value = matchStore.value[index] || {};
  }

  console.log("抽選的結果", result.value);
}

watch(matchStore, () => {
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
}
section {
  background-color: black;
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
:deep {
  .p-tooltip {
    background-color: steelblue;
    color: white;
  }
}
</style>
