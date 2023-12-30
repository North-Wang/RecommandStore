<template>
  <div>
    <div class="text-3xl font-bold">店家列表</div>
    <div class="flex">
      <input
        type="text"
        v-model="keyword"
        placeholder="搜尋店家名稱或特色"
        class="w-full my-4 text-center"
      />
    </div>
    <div class="lg-h-[420px]">
      <DataTable
        id="storeTable"
        :value="storeTable"
        class="mt-4"
        scrollable
        scrollHeight="flex"
      >
        <Column :field="'name'" header="店家名稱" sortable>
          <template #body="{ data, index }">
            <div class="text-start">
              <span>{{ data.name }}</span>
            </div></template
          >
        </Column>
        <!-- <Column :field="'type'" header="地點種類"></Column> -->
        <Column :field="'purple'" header="目的" sortable></Column>
        <Column :field="'category'" header="種類" sortable></Column>
        <Column :field="'feature'" header="店家特色" sortable></Column>
        <Column :field="'address'" header="地址"> </Column>
      </DataTable>
      <Paginator
        :rows="10"
        :totalRecords="120"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
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

const storeInfo = useStoreInfo();
const { storeList, titleList } = storeToRefs(storeInfo);
const storeTable = ref([]);
const testList = ref([{ name: "測試" }]);
const keyword = ref("");

const search = (keyword) => {
  storeTable.value = storeTable.value.filter((store) => {
    console.log("搜尋", store, keyword);
    return store.name.includes(keyword);
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
}
:deep(#storeTable tbody td) {
  padding: 8px 16px;
}
</style>
