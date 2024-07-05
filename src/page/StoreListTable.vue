<template>
  <div class="select-none">
    <h3 class="text-3xl font-bold">店家列表</h3>
    <h5>總共{{ storeTable.length }}筆資料</h5>
    <!-- <div class="grid grid-cols-3">
      <DropdownCheckbox
        :options="allAddressTag"
        :placeholder="'商圈標籤'"
        @change="filterTable(option)"
      />
    </div> -->
    <div class="mt-[12px] lg:mt-4">
      <DataTable
        id="storeTable"
        :value="storeTable"
        v-model:filters="filters"
        :globalFilterFields="['name', 'type', 'addressTag']"
        filterDisplay="menu"
        class="rounded-lg overflow-hidden"
        stripedRows
        scrollable
        paginator
        :rows="10"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink JumpToPageInput"
        :loading="loadingTable"
        resizableColumns
        removableSort
      >
        <template #loading>
          <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        </template>
        <template #header>
          <div class="flex justify-center items-center gap-2 py-3">
            <i class="pi pi-times text-slate-900 dark:text-slate-300" />
            <InputText
              v-model="filters.global.value"
              class="text-center text-[16px] py-2 lg:text-[24px]"
              placeholder="請輸入店家名稱或商圈標籤"
            />
            <i class="pi pi-search text-slate-900 dark:text-slate-300" />
          </div>
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
        <Column
          :field="'type'"
          header="類型"
          sortable
          style="min-width: 80px"
        ></Column>
        <Column :field="'feature'" header="店家特色" sortable></Column>
        <Column :field="'addressTag'" header="商圈標籤" sortable class="flex-1">
          <template #body="{ data, index }">
            <h5 class="text-start whitespace-nowrap">
              {{ data.addressTag?.toString() }}
            </h5>
          </template>
        </Column>
        <Column :field="'purple'" header="目的" sortable class="flex-1">
          <template #body="{ data, index }">
            <h5 class="text-start whitespace-nowrap">{{ data.purple }}</h5>
          </template>
        </Column>
        <Column :field="'category'" header="餐廳種類" sortable style="flex: 2">
          <template #body="{ data, index }">
            <h5 class="text-start">{{ data.category }}</h5>
          </template>
        </Column>

        <template #empty>
          <div class="h-[360px] flex items-center justify-center">
            沒有符合的店家資料
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import { useLoading } from "../store/useLoading";
import { FilterMatchMode } from "primevue/api";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import DropdownCheckbox from "../component/DropdownCheckbox.vue";

import detectiveDarkMode from "../js/detectiveDarkMode.js";
import isMobileDevice from "../js/isMobileDevice.js";

// import "primevue/resources/themes/arya-orange/theme.css"; //黑底白字 hightlight橘
// import "primevue/resources/themes/lara-light-blue/theme.css"; //白底藍字
// import "primevue/resources/themes/lara-dark-blue/theme.css"; //深藍底白字
// import "primevue/resources/themes/saga-blue/theme.css"; //白底藍字 hoghtlight藍
import "primevue/resources/themes/vela-blue/theme.css";

const storeInfo = useStoreInfo();
const {
  storeRawData,
  titleList,
  allTypeOption,
  allPurpleOption,
  allAddressTag,
} = storeToRefs(storeInfo);
const storeTable = ref([]);
const loading = useLoading();
const keywordStore = ref("");
const keywordFeature = ref("");
const loadingTable = ref(false);

const allFilterOption = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  type: { value: null, matchMode: FilterMatchMode.EQUALS },
  addressTag: { value: null, matchMode: FilterMatchMode.EQUALS },
});
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

function filterTable(option) {
  console.log("篩選條件", option);
}

watch([keywordStore, keywordFeature], (keywordList) => {
  console.log("搜尋：", keywordList);

  const checkNoAnyKeyword = keywordList.every((keyword) => {
    return keyword === "";
  });
  if (checkNoAnyKeyword) {
    storeTable.value = storeRawData.value;
    return;
  }

  if (keywordList[0] != "") searchNameAndCategory(keywordList[0]);
  if (keywordList[1] != "") searchFeature(keywordList[1]);
});

onMounted(() => {
  storeTable.value = storeRawData.value || [];
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
  .p-datatable-header {
    padding-top: unset;
    padding-bottom: unset;
    background-color: unset;
  }
  tbody {
    td {
      padding: 16px 16px;
    }
  }
  //loading
  .p-datatable-loading-overlay {
    background-color: black;
    opacity: 0.5;
  }
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
