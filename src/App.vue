<template>
  <div class="flex flex-col w-screen">
    <Loading v-if="isLoading" />
    <Header></Header>
    <routerView class="px-2 py-4 flex-1 lg:px-6 lg:py-4"></routerView>
    <!-- <Footer class="" /> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "./store/useStoreInfo.js";
import { useLoading } from "./store/useLoading";
import axios from "axios";
import Header from "./component/Header.vue";
import Footer from "./component/Footer.vue";
import Loading from "./component/Loading.vue";

const storeInfo = useStoreInfo();
const loading = useLoading();
const { isLoading } = storeToRefs(loading);
const allStoreInfo = ref([]); //全部的店家資訊

const setOption = async function () {
  storeInfo.setTypeOption();
  await storeInfo.filterStoreByType("餐廳");
  await storeInfo.setAddressTag();
  storeInfo.setAllOption();
};
const getStoreList = async function () {
  try {
    axios
      .get(
        "https://sheets.googleapis.com/v4/spreadsheets/1_3W1EeAV2n4InaUCczUp7BVPzXxB1mVsneRrD7Ygb_0/values/工作表1?key=AIzaSyD4tjE_hNQpGPegRSGPD-Ut_Avo9G59zgU"
      )
      .then((result) => {
        console.log("成功取得店家資訊", result);
        const titleList = result.data.values[0];
        const storeList = result.data.values.slice(1);

        storeList.forEach((store) => {
          allStoreInfo.value.push({
            name: store[0],
            type: store[1],
            purple: store[2],
            address: store[3],
            addressTag: store[4].split(/[,，、]/),
            feature: store[5],
            category: store[6],
            weight: store[7],
          });
        });
        // console.log("全部的店家資訊", allStoreInfo.value);

        //update data to Pinia
        storeInfo.storeList = allStoreInfo.value;
        storeInfo.titleList = titleList;

        //get all options
        setOption();
      });
  } catch (error) {
    console.log("連線有誤", error);
  }
};

const stopCopyImage = () => {
  const imageElement = document.querySelectorAll("img");
  if (imageElement.length === 0) {
    return;
  }
  imageElement.setAttribute("oncentextmenu", "return false");
  imageElement.setAttribute("style", "pointer-events: none;");
  imageElement.setAttribute("style", "user-select: none;");
};

onMounted(async function () {
  Promise.all([getStoreList(), stopCopyImage()]);
});
</script>

<style scoped></style>
