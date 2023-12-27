<template>
  <div>
    <div class="text-3xl font-bold">店家列表</div>

    <DataTable :value="storeList" class="mt-4">
      <Column :field="'name'" header="店家名稱" sortable>
        <template #body="{ data, index }">
          <div class="text-start">
            <span>{{ data.name }}</span>
          </div></template
        >
      </Column>
      <!-- <Column :field="'type'" header="地點種類"></Column> -->
      <Column :field="'purple'" header="類型" sortable></Column>

      <Column :field="'address'" header="地址"></Column>
    </DataTable>
    <Paginator
      :rows="10"
      :totalRecords="120"
      template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Paginator from "primevue/paginator";

const storeInfo = useStoreInfo();
const { storeList, titleList } = storeToRefs(storeInfo);
const testList = ref([{ name: "測試" }]);

onMounted(() => {
  console.log("全部的店家資訊", storeList.value);
  console.log("欄位標題", titleList.value);
});
</script>
<style scoped></style>
