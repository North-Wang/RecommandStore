<template>
  <div class="select-none">
    <div class="text-3xl font-bold">店家列表</div>
    <div class="flex">
      <input
        type="text"
        v-model="keyword"
        placeholder="搜尋店家名稱或特色"
        class="w-full my-4 text-center"
      />
    </div>
    <div class="h-[420px]">
      <DataTable
        id="storeTable"
        :value="storeTable"
        class="mt-4 rounded-lg overflow-hidden"
        showGridlines
        stripedRows
        scrollable
        scrollHeight="flex"
        :loading="loadingTable"
      >
        <template #loading>
          <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        </template>
        <Column :field="'name'" header="店家名稱" sortable>
          <template #body="{ data, index }">
            <div class="text-start">
              <h4 class="font-bold" style="line-height: 1.1">
                {{ data.name }}
              </h4>
              <div
                class="text-red-400 font-[500] mt-1 dark:text-white lg:text-[20px]"
              >
                {{ data.feature }}
              </div>
              <div class="mt-2 lg:text-[20px]">{{ data.address }}</div>
            </div>
          </template>
        </Column>

        <Column :field="'purple'" header="目的" sortable></Column>
        <Column :field="'category'" header="種類" sortable>
          <template #body="{ data, index }">
            <h5 class="text-start">{{ data.category }}</h5>
          </template>
        </Column>
        <Column :field="'type'" header="類型" sortable></Column>
        <!-- <Column :field="'feature'" header="店家特色" sortable></Column> -->
        <template #empty>
          <div class="h-[360px] flex items-center justify-center">
            沒有符合的店家資料
          </div>
        </template>
      </DataTable>
      <Paginator
        :rows="rows"
        :totalRecords="Math.ceil(storeTable.length / rows)"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} of {totalRecords}"
        class="mt-4"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Paginator from "primevue/paginator";
import { FilterMatchMode } from "primevue/api";
// import "primevue/resources/themes/arya-orange/theme.css"; //內建的主題樣式之一

const storeInfo = useStoreInfo();
const { storeList, titleList } = storeToRefs(storeInfo);
const storeTable = ref([]);
const isMobile = computed(() => {
  const info = navigator.userAgent;
  return /mobile/i.test(info);
});
const testList = ref([{ name: "測試" }]);
const keyword = ref("");
const rows = ref(10);
let loadingTable = false;

const search = (keyword) => {
  storeTable.value = storeTable.value.filter((store) => {
    console.log("搜尋", store, keyword);
    return store.name.includes(keyword) || store.feature.includes(keyword);
  });
};
watch(keyword, (keyword) => {
  if (keyword != "") {
    search(keyword);
  } else {
    storeTable.value = storeList.value || [];
  }
});

onMounted(() => {
  console.log("全部的店家資訊", storeList.value);
  console.log("欄位標題", titleList.value);
  storeTable.value = storeList.value || [];
});
</script>
<style scoped>
input[type="text"] {
  border: 1px solid black;
  border-radius: 10px;
  height: 40px;
}
:deep(#storeTable thead th) {
  padding: 8px 16px;
  background-color: white;
  /* border: 1px solid gray; */
}
:deep(#storeTable tbody td) {
  padding: 8px 16px;
  /* border: 1px solid gray; */
}
/* dark mode */
@media (prefers-color-scheme: dark) {
  :deep(#storeTable thead th) {
    background-color: rgb(53, 53, 53);
  }
}
</style>
