<template>
  <main class="bg-gradient-to-b from-[#fdfbfb] to-[#ebedee]">
    <section class="">
      <h3 class="py-[20px]">篩選結果</h3>
      <h4>
        共{{ storeListAfterFilterType.length.toLocaleString() }}筆資料符合
      </h4>
      <ul class="flex justify-center mt-5">
        <li class="rounded-lg wrapper-result">
          <h3 class="" :v-tooltip.bottom="result?.name">
            {{ result?.name }}
          </h3>
          <h3 class="text-darkYellow" v-if="result?.feature">
            {{ result?.feature }}
          </h3>
          <div
            class="flex gap-x-2 justify-between"
            style="border-bottom: 1.5px solid #929292"
          >
            <h4 class="text-left leading-[1.2]">{{ result.address }}</h4>
            <img :src="copyIcon" alt="copyIcon" class="cursor-pointer" />
          </div>
          <ul class="wrapper-tag" v-if="result?.addressTag">
            <li v-for="tags in result?.addressTag">
              <h4 class="tag bg-blue">{{ tags }}</h4>
            </li>
          </ul>
          <ul class="wrapper-tag" v-if="result?.purple">
            <li v-for="tags in result?.feature.split('、')">
              <h4 class="tag bg-yellow">{{ tags }}</h4>
            </li>
          </ul>
          <ul class="wrapper-tag" v-if="result?.feature">
            <li v-for="tags in result?.feature.split('、')">
              <h4 class="tag bg-[#A9A9A9]">{{ tags }}</h4>
            </li>
          </ul>
        </li>
      </ul>
    </section>

    <div class="flex justify-center">
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
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import Tooltip from "primevue/tooltip";

import copyIcon from "../assets/copy.svg";

const storeInfo = useStoreInfo();
const { storeListAfterFilterType } = storeToRefs(storeInfo);
const result = ref({});

function doFilter() {
  const index = Math.floor(
    Math.random() * storeListAfterFilterType.value.length
  );
  result.value = storeListAfterFilterType.value[index];
  console.log("抽選的結果", result.value);
}

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
  max-width: 500px;
  padding: 24px 20px;
  margin-bottom: 20px;
  background-color: #ededed;
  color: black;
  text-align: left;
  h3:first-child {
    font-weight: 700;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  h3 {
    padding-top: 8px;
    padding-bottom: 8px;
    border-bottom: 1.5px solid #929292;
  }
  h4 {
    padding-top: 8px;
    padding-bottom: 8px;
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
