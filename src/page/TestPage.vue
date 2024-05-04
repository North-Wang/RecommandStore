<template>
  <ul>
    <li>test</li>
    <!-- 建議有小孩出遊的選項 -->
    <!-- <button @click="addStore">送出</button> -->
  </ul>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const testStore = ref({
  name: "測試用店家",
  type: "日式",
  address: "115台北市南港區南港路一段201號",
  feature: "划算",
  category: "滷味,水餃",
  purple: "普通吃飯",
  tag: "划算、吃飽",
  權重: 1,
});
const sheetId = "AIzaSyD4tjE_hNQpGPegRSGPD-Ut_Avo9G59zgU";
const url = ref(
  `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/住宿`,
);

function addStore() {
  try {
    axios.post(url, testStore).then((res) => {
      console.log("res", res);
    });
  } catch (error) {
    console.log("新增店家失敗", error);
  }
}
</script>

<style scoped></style>
