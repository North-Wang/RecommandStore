<template>
  <div class="flex justify-center items-center black">
    <!-- <button @click="addStore">新增店家</button> -->
    測試用頁面
    <div class="flex flex-col">
      <button @click="searchAddress">輸入店名，輸出地址</button>
      <input type="text" v-model="address" readonly />
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

const address = ref("");
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
const sheetId = "AIzaSyD4tjE_hNQpGPegRSGPD-Ut_Avo9G59zgU";
// const url = ref(
//   `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/住宿`
// );
const url = ref(
  "https://script.google.com/macros/s/AKfycbz26MkFvz_NpSHsbUqCQVF5EXuIDCJEoQPxvELZ8xuFlGP1D7aGjsUCkHB42ixmXcFjwg/exec"
);

async function searchAddress() {
  const sheetId = "AIzaSyD4tjE_hNQpGPegRSGPD-Ut_Avo9G59zgU";
  const placeName = "忠孝｜燒肉政宗 YAKINIKU MASAMUNE";
  const headers = {
    accept: "application/json",
  };
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeName}&inputtype=textquery&key=${sheetId}`;
  try {
    const res = await axios.get(url);
    console.log("查詢地址 成功", res);
  } catch (error) {
    console.warn("查詢地址 失敗");
  }
}

async function addStore() {
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

onMounted(() => {
  // if (formElement.value) {
  //   formElement.value.addEventListener("submit", (e) => {
  //     // e.preventDefault();
  //   });
  // }
});
</script>

<style scoped></style>
