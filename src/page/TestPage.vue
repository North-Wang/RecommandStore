<template>
  <div class="flex flex-col justify-center items-center black gap-2">
    <!-- <button @click="addStore">新增店家</button> -->
    <h2>測試用頁面</h2>

    <div class="flex flex-col gap-2">
      <h4>輸入店名，輸出地址</h4>
      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        ref="fileEle"
        @input="handleFileUpload"
      />
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
    <DataTable
      :value="tableData"
      :scrollable="true"
      scrollHeight="flex"
      :paginator="true"
      paginatorPosition="top"
      :pageLinkSize="3"
      :first="0"
      :rows="10"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      class="w-full h-full dark:text-black"
    >
      <Column
        field="name"
        header="店名"
        class="text-left"
        style="width: 30%"
      ></Column>
      <Column
        field="address"
        header="地址"
        class="text-left py-2 w-[500px]"
      ></Column>
      <Column field="note" header="備註" class="text-left"></Column>
      <template #empty>
        <div class="text-black dark:text-black">沒有店家資料</div>
      </template>
    </DataTable>

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

import DataTable from "primevue/datatable";
import Column from "primevue/column";

const keyword = ref("");
const address = ref("");
const csvData = ref(""); //儲存file檔案資料
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
const fileEle = ref(null);
const tableData = ref([]);

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
    return address.value;
  } catch (error) {
    console.warn("查詢地址 失敗");
    return "";
  }
}

/**
 * 上傳excel檔案
 */
function handleFileUpload() {
  if (!fileEle.value) {
    console.warn("沒有檔案");
    return;
  }

  const target = fileEle.value?.files[0];
  console.log("檔案", target);

  if (!target) {
    console.warn("沒有檔案");
    return;
  }

  console.log("檔案名稱", target.name);
  const fileType = target.name.split(".")[1];
  const fileSize = Math.round((target.size / 1024) * 10) / 10;
  const updateDate = target.lastModifiedDate; //更新日期

  //驗證成功，儲存檔案資料
  readFile(target);
}

/**
 * 取得csv表單資料
 * @param {*} fileData
 */
function readFile(fileData) {
  if (!fileData) return;

  const file = fileData;
  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    const rows = text.split("\n").map((row) => row.split(","));
    // console.log(rows); // 這裡你可以處理每一行的數據

    csvData.value = rows.slice(1);
    console.log("表單的資料", csvData.value);
    getAllAddress();
  };
  reader.readAsText(file);
}

/**
 * 取得所有地點的地址
 */
async function getAllAddress() {
  const promises = csvData.value.map(async (place) => {
    const address = await searchAddress(place[0]);
    return {
      name: place[0],
      address: address,
      note: place[1],
    };
  });

  tableData.value = await Promise.all(promises);
  console.log("整理結果", tableData.value);
}

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

<style scoped lang="scss">
:deep(.p-paginator) {
  .p-paginator-pages {
    display: flex;
    flex-wrap: nowrap;
  }
}
</style>
