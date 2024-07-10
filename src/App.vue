<template>
  <div class="flex flex-col w-screen min-h-screen">
    <Loading v-if="isLoading" />
    <Header></Header>
    <routerView class="flex-1"></routerView>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "./store/useStoreInfo.js";
import { useLoading } from "./store/useLoading";
import { useFilter } from "./store/useFilter";
import axios from "axios";
import Header from "./component/Header.vue";
import Footer from "./component/Footer.vue";
import Loading from "./component/Loading.vue";

const storeInfo = useStoreInfo();
const filterInfo = useFilter();
const loading = useLoading();
const { isLoading } = storeToRefs(loading);
const { storeTemporary, allTypeOption } = storeToRefs(storeInfo);
const { type, addressTag, purple, feature, category } = storeToRefs(filterInfo); //selected filter

//set all filter's options
const setOptions = async function () {
  await storeInfo.setTypeOption();
  type.value = allTypeOption.value[0];
  await storeInfo.filterType(type.value);
  await storeInfo.setAddressTag();
  storeInfo.setAllOption();
};

async function getStoreList() {
  const sheetId = "AIzaSyD4tjE_hNQpGPegRSGPD-Ut_Avo9G59zgU";
  const name = "餐廳";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/1_3W1EeAV2n4InaUCczUp7BVPzXxB1mVsneRrD7Ygb_0/values/${name}?key=${sheetId}`;
  try {
    axios.get(url).then((result) => {
      console.log("成功取得店家資訊", result);
      const titleList = result.data.values[0];
      const storeList = result.data.values.slice(1);

      let allStore = [];
      storeList.forEach((store) => {
        allStore.push({
          name: store[0],
          type: store[1],
          purple: store[2],
          address: store[3],
          addressTag: store[4].split(/[,，、]/),
          feature: store[5],
          category: store[6],
          weight: store[7],
          note: store[8],
        });
      });
      // console.log("全部的店家資訊", allStore);

      //save storeInfo to Pinia
      storeInfo.storeRawData = allStore;
      storeInfo.titleList = titleList;

      setOptions();
    });
  } catch (error) {
    console.log("連線有誤", error);
  }
}

/**
 * 種類改變的時候，要重新篩選所有選項
 */
watch(type, async function () {
  if (type.value.trim() === "") {
    // 沒有選擇任何篩選條件的type
    type.value = allTypeOption.value[0] || "餐廳";
  }
  await storeInfo.filterType(type.value);
});

//當商圈標籤改變時，要從新篩選出暫時的店家資料
watch(addressTag, (tag) => {
  storeInfo.filterAddressTag(tag);
});

/**
 * 當暫存的店家資料改變時，要重新篩選出符合條件的店家
 * @description storeTemporary已經篩選完type、addressTag了
 * @description 需要重新篩選【目的】、【特色】、【種類】
 */
watch([storeTemporary, purple, feature, category], async function () {
  const result = storeTemporary.value.filter((item) => {
    //filter purple
    let matchPurple = true;
    if (purple.value !== "") {
      matchPurple = item?.purple?.includes(purple.value);
    }

    //filter feature
    let matchFeature = true;
    if (feature.value.length !== 0) {
      matchFeature = item?.feature.some((f) => {
        return feature.value.includes(f);
      });
    }

    //filter category
    let matchCategory = true;
    if (category.value.length !== 0) {
      matchFeature = item?.category.includes(category.value);
    }

    return matchPurple && matchFeature && matchCategory;
  });
  // console.log("符合所有篩選條件的店家", result);
  storeInfo.storeResult = result;
});

onMounted(async function () {
  await getStoreList();
});
</script>

<style scoped></style>
