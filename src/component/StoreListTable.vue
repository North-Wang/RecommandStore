<template>
  <div class="select-none">
    <h3 class="text-3xl font-bold">店家列表</h3>
    <h5>總共{{ storeTable.length }}筆資料</h5>
    <div class="w-full flex flex-wrap gap-x-2 gap-y-2 my-2 lg:my-2 lg:gap-y-0">
      <input
        type="text"
        v-model="keywordStore"
        placeholder="搜尋店家名稱或種類"
        class="flex-1 text-center"
      />
      <input
        type="text"
        v-model="keywordFeature"
        placeholder="搜尋店家描述"
        class="flex-1 text-center"
      />
    </div>
    <div class="mt-[12px] lg:mt-4">
      <DataTable
        id="storeTable"
        :value="storeTable"
        class="rounded-lg overflow-hidden"
        stripedRows
        scrollable
        paginator
        :rows="10"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        :loading="loadingTable"
        resizableColumns
      >
        <template #loading>
          <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        </template>
        <Column :field="'name'" header="店家名稱" sortable class="max-w-[80vw]">
          <template #body="{ data, index }">
            <div class="text-start">
              <div class="font-bold lg:text-[20px]" style="line-height: 1.1">
                {{ data.name }}
              </div>
              <div
                class="text-yellow-400 font-[500] mt-2 ml-2 dark:text-white lg:text-[16px]"
              >
                {{ data.feature }}
              </div>
              <div class="ml-2 lg:text-[16px]">{{ data.address }}</div>
            </div>
          </template>
        </Column>

        <Column :field="'purple'" header="目的" sortable class="flex-1">
          <template #body="{ data, index }">
            <h5 class="text-start whitespace-nowrap">{{ data.purple }}</h5>
          </template>
        </Column>
        <Column :field="'category'" header="種類" sortable style="flex: 2">
          <template #body="{ data, index }">
            <h5 class="text-start">{{ data.category }}</h5>
          </template>
        </Column>
        <Column :field="'type'" header="類型" sortable class="flex-1"></Column>
        <!-- <Column :field="'feature'" header="店家特色" sortable></Column> -->
        <template #empty>
          <div class="h-[360px] flex items-center justify-center">
            沒有符合的店家資料
          </div>
        </template>
      </DataTable>
      <!-- <Paginator
          :rows="rows"
          :totalRecords="Math.ceil(storeTable.length / rows)"
          template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} of {totalRecords}"
          class="mt-4"
        /> -->
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
import Dropdown from "primevue/dropdown";
import { FilterMatchMode } from "primevue/api";
// import "primevue/resources/themes/arya-orange/theme.css"; //黑底白字 hightlight橘
// import "primevue/resources/themes/lara-light-blue/theme.css"; //白底藍字
// import "primevue/resources/themes/lara-dark-blue/theme.css"; //深藍底白字
// import "primevue/resources/themes/saga-blue/theme.css"; //白底藍字 hoghtlight藍
import "primevue/resources/themes/vela-blue/theme.css";

const storeInfo = useStoreInfo();
const { storeList, titleList } = storeToRefs(storeInfo);
const storeTable = ref([]);
const isMobile = computed(() => {
  const info = navigator.userAgent;
  return /mobile/i.test(info);
});
const testList = ref([{ name: "測試" }]);
const keywordStore = ref("");
const keywordFeature = ref("");
const loadingTable = ref(false);

const searchNameAndCategory = (keyword) => {
  storeTable.value = storeTable.value.filter((store) => {
    return store.name.includes(keyword) || store.category.includes(keyword);
  });
};
const searchFeature = (keyword) => {
  storeTable.value = storeTable.value.filter((store) => {
    return store.feature.includes(keyword);
  });
};

watch([keywordStore, keywordFeature], (keywordList) => {
  console.log("搜尋：", keywordList);

  const checkNoAnyKeyword = keywordList.every((keyword) => {
    return keyword === "";
  });
  if (checkNoAnyKeyword) {
    storeTable.value = storeList.value;
    return;
  }

  if (keywordList[0] != "") searchNameAndCategory(keywordList[0]);
  if (keywordList[1] != "") searchFeature(keywordList[1]);
});

onMounted(() => {
  console.log("全部的店家資訊", storeList.value);
  console.log("欄位標題", titleList.value);
  storeTable.value = storeList.value || [];
});
</script>
<style scoped lang="scss">
input[type="text"] {
  border: 1px solid black;
  border-radius: 10px;
  height: 40px;
}
:deep(#storeTable) {
  thead {
    th {
      padding: 16px 16px;
      /* border: 1px solid gray; */
      .p-column-title {
        font-size: 20px;
        font-weight: 700;
        white-space: nowrap;
        @media (max-width: 1280px) {
          font-size: 16px;
        }
      }
    }
  }
  tbody {
    td {
      padding: 16px 16px;
      /* border: 1px solid gray; */
    }
  }
  //loading
  .p-datatable-loading-overlay {
    background-color: black;
    opacity: 0.5;
  }
  //paginator
  .p-paginator {
    .p-paginator-element {
      @media (max-width: 1280px) {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
      }
    }
  }
}
@media (prefers-color-scheme: light) {
  // :deep(#storeTable thead th) {
  // background-color: white;
  // }
}
@media (prefers-color-scheme: dark) {
  :deep(#storeTable thead th) {
    background-color: rgb(53, 53, 53);
  }
}
</style>
