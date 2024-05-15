<template>
  <div
    class="font-semibold h-full flex items-center justify-center select-none"
  >
    <DataTable
      :value="props.dataList"
      :scrollable="true"
      scrollHeight="flex"
      :paginator="true"
      paginatorPosition="top"
      :pageLinkSize="3"
      :first="0"
      :rows="props.rows"
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
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const props = defineProps({
  dataList: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Number,
    default: 10,
  },
});
</script>

<style scoped lang="scss">
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
