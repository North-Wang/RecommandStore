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

      <h4 class="py-3">共{{ tableData.length?.toLocaleString() }}筆資料</h4>
      <div class="px-2 relative">
        <input
          type="search"
          placeholder="請輸入店家名稱"
          class="w-full text-center text-black dark:text-white lg:max-w-[300px] mb-[8px]"
          v-model="keyword"
          @change="search()"
        />
        <span
          class="pi pi-search absolute left-[16px] top-[10px] text-black dark:text-white"
        ></span>
      </div>
    </section>
    <DataView :dataList="tableData" v-if="isMobile" />
    <ul
      class="font-semibold h-full flex items-center justify-center select-none"
      v-if="!isMobile"
    >
      <DataTable
        :value="tableData"
        :scrollable="true"
        scrollHeight="flex"
        :paginator="true"
        paginatorPosition="top"
        :pageLinkSize="3"
        :first="0"
        :rows="rows"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        class="w-full h-full dark:text-black"
      >
        <Column
          field="name"
          header="店名"
          class="text-left w-[400px]"
          frozen
        ></Column>
        <Column
          field="type"
          header="類型"
          :sortable="true"
          class="w-[80px]"
        ></Column>
        <Column field="purple" header="目的" :sortable="true">
          <template #body="{ data }">
            <ul class="w-[120px] wrapper-tag">
              <li
                v-for="tags in data?.purple.split(/[,，、]/)"
                :key="tags"
                class=" "
              >
                <span class="tag bg-yellow"> {{ tags }}</span>
              </li>
            </ul>
          </template>
        </Column>
        <Column
          field="addressTag"
          header="商圈標籤"
          :sortable="true"
          class="text-left flex-1"
        >
          <template #body="{ data }">
            <ul class="w-[120px] wrapper-tag">
              <li v-for="tags in data?.addressTag" :key="tags" class=" ">
                <span class="tag bg-blue"> {{ tags }}</span>
              </li>
            </ul>
          </template>
        </Column>
        <Column field="address" header="地點" class="text-left w-[400px]">
        </Column>
        <Column
          field="feature"
          header="特色"
          :sortable="true"
          class="text-left w-[400px]"
        ></Column>
        <Column
          field="category"
          header="種類"
          :sortable="true"
          class="text-left w-[400px]"
        >
          <template #body="{ data }">
            <ul class="wrapper-tag">
              <li
                v-for="tags in data?.category.split(/[,，、]/)"
                :key="tags"
                class=" "
              >
                <span class="tag bg-[#d6d6d6]"> {{ tags }}</span>
              </li>
            </ul>
          </template>
        </Column>
        <template #empty>
          <div class="text-black dark:text-black">沒有店家資料</div>
        </template>
      </DataTable>
      <!-- <li
          v-for="(store, index) in currentPageStore"
          :key="index"
          class="store"
        >{{ store.name }}
      </li> -->
    </ul>

    <!-- <Paginator
      class="fixed bottom-0 w-full"
      :totalRecords="total"
      :first="0"
      :rows="rows"
      :pageLinkSize="3"
      template="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink "
      @page="onPage($event)"
    /> -->
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import { useWindowSize } from "@vueuse/core";
import isMobileDevice from "../js/isMobileDevice";
import Paginator from "primevue/paginator";
import "primeicons/primeicons.css";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import DataView from "../component/storeList/DataView.vue";

//picure
import editIcon from "../assets/editIcon.svg";

const storeInfo = useStoreInfo();
const { storeListAfterFilterType, matchStore } = storeToRefs(storeInfo);
const { width, height } = useWindowSize();
const tableData = ref(matchStore.value); //符合篩選條件的店家
const total = computed(() => {
  return tableData.value.length;
});
const rows = ref(10); //一頁顯示幾筆資料
const currentPageStore = ref([]); //篩選完的店家資料
const moreOptionMap = ref(new Map());
// const isMobile = isMobileDevice();
const isMobile = ref(true);
const keyword = ref("");

function onPage(e) {
  currentPageStore.value = tableData.value.slice(e.first, e.first + e.rows);
}

//切換那些店家要顯示更多資訊
function toggleShowMoreOption(name) {
  if (moreOptionMap.value.has(name)) {
    moreOptionMap.value.delete(name);
  } else {
    moreOptionMap.value.set(name);
  }
}

function search() {
  console.log("搜尋", keyword.value);
  if (keyword.value === "") {
    tableData.value = matchStore.value;
  } else {
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
  setStoreData();
}

function setStoreData() {
  currentPageStore.value = tableData.value.slice(0, rows.value - 1);
}

watch(
  width,
  (width) => {
    isMobile.value = width < 1024;
  },
  { immediate: true },
);

watch(matchStore, (store) => {
  tableData.value = store;
  setStoreData();
});

onMounted(() => {
  if (matchStore.value.length == 0) {
    console.log("尚未變更篩選條件");
    tableData.value = storeListAfterFilterType.value;
  }
  if (isMobile.value) {
    setStoreData();
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
}
:deep(.p-datatable-wrapper) {
  thead {
    height: 60px;
    border-bottom: 1px solid gray;
    th {
      white-space: nowrap;
      padding-left: 12px;
      padding-right: 12px;
    }
  }
  tbody {
    td {
      padding-left: 12px;
      padding-right: 12px;
      padding-top: 16px;
      padding-bottom: 16px;
      border-bottom: 0.5px solid gray;
    }
  }
}
.wrapper-tag {
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 8px;
}
.tag {
  padding: 4px 12px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
}
</style>
