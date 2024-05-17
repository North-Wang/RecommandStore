<template>
  <ul>
    <button>click</button>
    <!-- 建議有小孩出遊的選項 -->
    <h3>店家資料</h3>
    <form
      :action="url"
      class="flex flex-col justify-center"
      method="get"
      ref="formElement"
    >
      <input type="text" :value="testStore?.name" />
      <input type="text" :value="testStore?.type" />
      <input type="text" :value="testStore?.address" />
      <input type="text" :value="testStore?.addressTag" />
      <input type="text" :value="testStore?.feature" />
      <input type="text" :value="testStore?.category" />
      <input type="text" :value="testStore?.權重" />
      <input type="submit" value="送出" class="cursor-pointer" />
    </form>
  </ul>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const formElement = ref(null);
const testStore = ref({
  name: "測試用店家",
  type: "餐廳",
  purple: "普通吃飯",
  address: "115台北市南港區南港路一段201號",
  addressTag: "台北車站",
  feature: "划算",
  category: "滷味,水餃",
  權重: 1,
});
const sheetId = "AIzaSyD4tjE_hNQpGPegRSGPD-Ut_Avo9G59zgU";
// const url = ref(
//   `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/住宿`
// );
let url =
  "https://script.google.com/macros/s/AKfycbz4KXKxDe5JQAI9WQNOUnkhy8KOaxt8tfjONPZp7W6AcFgZb0EQ5GV13H2ScS59nzT_Ig/exec";

function addStore() {
  try {
    fetch(url)
      .then(function (response) {
        // 直接轉成JSON格式
        console.log(response);
        return response.json();
      })
      .then(function (j) {
        // `j`會是一個JavaScript物件
        console.log(j);
      })
      .catch(function (err) {
        // Error :(
      });
  } catch (error) {
    console.log("新增店家失敗", error);
  }
}

onMounted(() => {
  if (formElement.value) {
    formElement.value.addEventListener("submit", (e) => {
      // e.preventDefault();
    });
  }
});
</script>

<style scoped></style>
