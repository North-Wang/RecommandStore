<template>
  <div class="h-[100px] flex justify-center items-center">
    <!-- <button @click="addStore">新增店家</button> -->
    <form id="myForm">
      <input type="text" id="name" placeholder="Enter your name" />
      <input type="email" id="email" placeholder="Enter your email" />
      <button type="button" @click="addStore()">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";

const testStore = {
  name: "測試用店家",
  type: "日式",
  address: "115台北市南港區南港路一段201號",
  feature: "划算",
  category: "滷味,水餃",
  purple: "普通吃飯",
  tag: "划算、吃飽",
  權重: 1,
};
const sheetId = "AIzaSyD4tjE_hNQpGPegRSGPD-Ut_Avo9G59zgU";
// const url = ref(
//   `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/住宿`
// );
const url = ref(
  "https://script.google.com/macros/s/AKfycbz26MkFvz_NpSHsbUqCQVF5EXuIDCJEoQPxvELZ8xuFlGP1D7aGjsUCkHB42ixmXcFjwg/exec"
);

async function addStore() {
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}
</script>

<style scoped></style>
