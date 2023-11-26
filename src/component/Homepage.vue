<template>
  <div>
    <div class="text-3xl font-bold underline">首頁</div>
    <button @click="addNewStore">新增店家</button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";

const addNewStore = async function () {
  const data = ["John Doe", 30, "Coding"];
  axios
    .post(
      "https://sheets.googleapis.com/v4/spreadsheets/1_3W1EeAV2n4InaUCczUp7BVPzXxB1mVsneRrD7Ygb_0/values/工作表1?key=AIzaSyD4tjE_hNQpGPegRSGPD-Ut_Avo9G59zgU",
      data
    )
    .then((result) => {
      console.log("新增資料", result);
    });
};
</script>
<style scoped></style>
