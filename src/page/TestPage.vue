<template>
  <div class="flex flex-col justify-center items-center black gap-2">
    <!-- <button @click="addStore">新增店家</button> -->
    <h2>測試用頁面</h2>

    <div class="flex flex-col gap-2">
      <h4>輸入店名，輸出地址</h4>
      <input type="file" accept=".xlsx, .xls" />
      <input
        type="text"
        class="text-center border-2"
        v-model="keyword"
        placeholder="請輸入地點名稱"
      />
      <button @click="searchAddress(keyword)">送出</button>
      <input
        type="text"
        class="text-center w-[500px]"
        v-model="address"
        readonly
      />
    </div>

    <!-- <form id="myForm">
      <input type="text" id="name" placeholder="Enter your name" />
      <input type="email" id="email" placeholder="Enter your email" />
      <button type="button" @click="addStore()">Submit</button>
    </form> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const keyword = ref("");
const address = ref("");
const fileData = ref(""); //儲存file檔案資料
const testStore = {
  name: "測試用店家",
  type: "餐廳",
  purple: "普通吃飯",
  address: "115台北市南港區南港路一段201號",
  addressTag: "台北車站",
  feature: "划算",
  category: "滷味,水餃",
  權重: 1,
};
const apiKey = "AIzaSyD4tjE_hNQpGPegRSGPD-Ut_Avo9G59zgU";

/**
 * 輸入店名，輸出地址
 */
async function searchAddress(placeName) {
  if (placeName.trim() === "") return;
  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": apiKey,
    "X-Goog-FieldMask":
      "places.displayName,places.formattedAddress,places.priceLevel",
  };
  const body = {
    textQuery: placeName,
  };
  const url = `https://places.googleapis.com/v1/places:searchText`;
  try {
    const res = await axios.post(url, body, { headers });
    console.log("查詢地址 成功", res);
    address.value = res.data.places[0].formattedAddress;
  } catch (error) {
    console.warn("查詢地址 失敗");
  }
}

/**
 * 上傳excel檔案
 */
function uploadFile() {}

async function addStore() {
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

onMounted(() => {});
</script>

<style scoped></style>
