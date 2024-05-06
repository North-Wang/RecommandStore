<template>
  <main
    class="bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] h-full flex flex-col"
  >
    <section class="">
      <h3 class="py-[20px]">店家列表</h3>
      <h4 class="py-3">共{{ tableData.length?.toLocaleString() }}筆資料</h4>
      <div class="px-2 relative">
        <input
          type="text"
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
    <Paginator
      :totalRecords="total"
      :first="0"
      :rows="rows"
      :pageLinkSize="3"
      :alwaysShow="true"
      template="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink  "
      @page="onPage($event)"
    >
    </Paginator>
    <div class="overflow-y-auto" style="height: calc(100vh - 269px)">
      <ul v-if="isMobile && currentPageStore.length">
        <li
          v-for="(store, index) in currentPageStore"
          :key="index"
          class="store bg-white"
        >
          <h3 class="title">{{ store?.name }}</h3>
          <h4
            class="address"
            v-if="moreOptionMap.has(store?.name) && store?.address"
          >
            {{ store?.address }}
          </h4>
          <h4
            class="text-[#E09A30] text-left font-bold py-2"
            v-if="store?.feature"
          >
            {{ store?.feature }}
          </h4>

          <ul class="wrapper-tag mt-[12px]">
            <li
              v-for="purples in store?.purple.split('、')"
              v-if="store?.purple"
            >
              <div class="tag bg-yellow">{{ purples }}</div>
            </li>
            <li
              v-for="addressTags in store?.addressTag"
              v-if="store?.addressTag"
            >
              <div class="tag bg-blue">{{ addressTags }}</div>
            </li>
          </ul>
          <li class="wrapper-tag mt-2">
            <ul
              v-for="cates in store?.category.split('、')"
              v-if="store?.category"
            >
              <li class="tag bg-[#d6d6d6]">{{ cates }}</li>
            </ul>
          </li>
          <ul
            v-if="moreOptionMap.has(store?.name) && store?.note"
            class="mt-3"
            style="border-top: 0.5px solid gray"
          >
            <div class="text-left my-1">備註：</div>
            <textarea name="" id="" cols="30" rows="10" class="dark:bg-lightGray text-gray-500 dark:text-gray-500">{{
              store?.note
            }}</textarea>
          </ul>

          <ul class="flex justify-end items-center h-8 mt-2">
            <li class="flex gap-x-2 items-center">
              <!-- <img :src="editIcon" alt="editIcon" class="h-6 ursor-not-allowed" /> -->

              <button
                class="w-[72px] text-left bg-inherit text-blue hover:bg-[#4baaf5] hover:text-white"
                @click="toggleShowMoreOption(store?.name)"
              >
                <div v-if="moreOptionMap.has(store?.name)">close</div>
                <div v-else>more...</div>
              </button>
            </li>
          </ul>
        </li>
      </ul>
      <ul
        class="font-semibold h-full flex items-center justify-center select-none"
        v-else-if="!isMobile && currentPageStore.length"
      >
      <DataView :value="currentPageStore">
        <template #list="slotProps">
          <div class="grid grid-nogutter ">
            <div v-for="(item, index) in slotProps.items" :key="index" class="w-full h-[40PX] flex items-center justify-start px-4 select-none">
              {{ item.name }}
            </div>
          </div></template>
      </DataView>
      <!-- <li
          v-for="(store, index) in currentPageStore"
          :key="index"
          class="store"
        >{{ store.name }}
      </li> -->
      </ul>
      <h4
        class="font-semibold h-full flex items-center justify-center text-black dark:text-black"
        v-else-if="!currentPageStore.length"
      >
        沒有店家資料
      </h4>
    </div>

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
import isMobileDevice from "../js/isMobileDevice";
import Paginator from "primevue/paginator";
import "primeicons/primeicons.css";
import DataView from 'primevue/dataview';

//picure
import editIcon from "../assets/editIcon.svg";

const storeInfo = useStoreInfo();
const { matchStore } = storeToRefs(storeInfo);
const tableData = ref(matchStore.value);
const total = computed(() => {
  return tableData.value.length;
});
const rows = ref(10); //一頁顯示幾筆資料
const currentPageStore = ref([]); //篩選完的店家資料
const moreOptionMap = ref(new Map());
const isMobile = isMobileDevice();
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

//watch pinia

watch(matchStore, (store) => {
  tableData.value = store;
  setStoreData();
});

onMounted(() => {
  setStoreData();
});
</script>

<style scoped lang="scss">
section {
  background-color: black;
  color: white;
}
input[type="text"] {
  border-radius: 5px;
  height: 40px;
  padding-left: 32px;
  padding-right: 8px;
}
.store {
  padding: 12px 20px;
  border-bottom: 0.5px solid black;
  position: relative;
  color: black;
  h3 {
    border-bottom: 0.5px solid #929292;
  }
  h4 {
    border-bottom: 0.5px solid #929292;
  }
  .title {
    text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: 900;
    padding-bottom: 8px;
  }
  .address {
    padding-top: 8px;
    padding-bottom: 8px;
    border-bottom: 0.5px solid #929292;
    text-align: left;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    padding-bottom: 8px;
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
  textarea {
    width: 100%;
    padding: 4px 8px;
    overflow-y: auto;
    height: 80px;
    border-radius: 5px;
    border: 1px solid gray;
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
}
</style>
