<template>
  <main
    class="bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] h-full flex flex-col"
  >
    <section class="">
      <div class="flex justify-between items-center px-[20px] py-[20px]">
        <h3></h3>
        <h3>店家列表</h3>
        <button class="text-black" disabled><h4>新增</h4></button>
      </div>

      <h4 class="py-3">共{{ total }}筆資料</h4>
      <div class="px-2 relative">
        <input
          type="search"
          placeholder="請輸入店家名稱、目的、商圈標籤、特色、種類"
          class="w-full text-center text-black dark:text-white lg:max-w-[300px] mb-[8px]"
          v-model="keyword"
          @change="search()"
        />
        <span
          class="pi pi-search absolute left-[16px] top-[10px] text-black dark:text-white"
        ></span>
      </div>
    </section>
    <DataView :dataList="tableData" :rows="rows" v-if="isMobile" />
    <DataTableView :dataList="tableData" :rows="rows" v-if="!isMobile" />
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import { useWindowSize } from "@vueuse/core";
import isMobileDevice from "../js/isMobileDevice";
import "primeicons/primeicons.css";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import DataView from "../component/storeList/DataView.vue";
import DataTableView from "../component/storeList/DataTableView.vue";

const storeInfo = useStoreInfo();
const { storeListAfterFilterType, matchStore } = storeToRefs(storeInfo);
const { width, height } = useWindowSize();
const tableData = ref(matchStore.value); //經過搜尋完的結果，符合篩選條件的店家
const total = computed(() => {
  return tableData.value.length.toLocaleString();
});
const rows = ref(10); //一頁顯示幾筆資料
const currentPageStore = ref([]); //篩選完的店家資料
const moreOptionMap = ref(new Map());
// const isMobile = isMobileDevice();
const isMobile = ref(true);
const keyword = ref("");

function search() {
  console.log("搜尋", keyword.value);
  if (keyword.value.trim() === "") {
    tableData.value = matchStore.value;
  } else {
    console.log("aaa 這裡有可能maatchStore為0");
    tableData.value = matchStore.value.filter((item) => {
      let matchStore = item.name.includes(keyword.value);
      let matchAddressTag = item.addressTag.includes(keyword.value);
      let matchPurple = item.purple.includes(keyword.value);
      let matchCategory = item.category.includes(keyword.value);
      let matchFeature = item.feature.includes(keyword.value);
      return (
        matchStore ||
        matchAddressTag ||
        matchPurple ||
        matchCategory ||
        matchFeature
      );
    });
  }
  console.log("搜尋結果", tableData.value);
  setDefaultStoreData();
}

function setDefaultStoreData() {
  currentPageStore.value = tableData.value.slice(0, rows.value - 1);
}

watch(
  width,
  (width) => {
    isMobile.value = width < 1024;
  },
  { immediate: true }
);

watch(matchStore, (store) => {
  tableData.value = store;
  setDefaultStoreData();
});

onMounted(() => {
  if (matchStore.value.length == 0) {
    console.log("尚未變更篩選條件");
    tableData.value = storeListAfterFilterType.value;
  }
  if (isMobile.value) {
    setDefaultStoreData();
  }
});
</script>

<style scoped lang="scss">
section {
  background-color: black;
  color: white;
}
input[type="search"] {
  border-radius: 5px;
  height: 40px;
  padding-left: 32px;
  padding-right: 8px;
}
// .grid-items{
//   width: 100%;
//   flex-grow: 1;
//   color: black;
//   display: flex;
//   align-items: center;
//   -webkit-user-select: none !important;
//     -moz-user-select: none !important;
//     user-select: none !important;
//     padding-left: 16px;
//     padding-right: 16px;
//   @media (prefers-color-shceme: dark) {
//     color: black;
//   }
// }
:deep(.p-paginator) {
  display: flex;
  justify-content: center;
  background-color: black;
  color: white;
  padding-bottom: 8px;
  .p-paginator-element {
    padding: 8px 12px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .p-paginator-pages {
    display: flex;
    flex-wrap: nowrap;
  }
  .p-highlight {
    background-color: #4baaf5;
    color: white;
  }
  .p-disabled {
    background-color: unset;
    color: white;
  }
}
</style>
