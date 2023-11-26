<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "./store/useStoreInfo.js";
import Homepage from "./component/Homepage.vue";
import Header from "./component/Header.vue";
import Footer from "./component/Footer.vue";

const storeInfo = useStoreInfo();
const allStoreInfo = ref([]); //全部的店家資訊
const getStoreList = async function () {
  axios
    .get(
      "https://sheets.googleapis.com/v4/spreadsheets/1_3W1EeAV2n4InaUCczUp7BVPzXxB1mVsneRrD7Ygb_0/values/工作表1?key=AIzaSyD4tjE_hNQpGPegRSGPD-Ut_Avo9G59zgU"
    )
    .then((result) => {
      console.log("result", result);
      const titleList = result.data.values[0];
      const storeList = result.data.values.slice(1);
      console.log("標題", titleList);
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
      console.log("全部的店家資訊", allStoreInfo.value);
      // storeInfo.updateStoreList(allStoreInfo.value);

      //update data to Pinia
      storeInfo.storeList = allStoreInfo.value;
      storeInfo.titleList = titleList;
    })
    .catch((error) => console.log(error));
};

onMounted(() => {
  getStoreList();
});
</script>

<template>
  <div>
    <Header />
    <routerView class="wrapper"></routerView>
    <Footer />
  </div>
</template>

<style scoped>
.wrapper {
  min-height: calc(100vh - 200px);
}
</style>
