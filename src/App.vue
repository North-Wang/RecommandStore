<template>
  <div class="flex flex-col w-screen">
    <Header class="" />
    <routerView class="p-6 flex-1"></routerView>
    <!-- <Footer class="" /> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "./store/useStoreInfo.js";
import axios from "axios";
import Header from "./component/Header.vue";
import Footer from "./component/Footer.vue";

const storeInfo = useStoreInfo();
const allStoreInfo = ref([]); //全部的店家資訊
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
        // console.log("標題", titleList);
        // console.log("店家", storeList);

        storeList.forEach((store) => {
          allStoreInfo.value.push({
            name: store[0],
            type: store[1],
            peopleLimit: store[2],
            purple: store[3],
            lowPrice: store[4],
            highPrice: store[5],
            address: store[6],
            feature: store[7],
            category: store[8],
          });
        });
        // console.log("全部的店家資訊", allStoreInfo.value);

        //update data to Pinia
        storeInfo.storeList = allStoreInfo.value;
        storeInfo.titleList = titleList;
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
