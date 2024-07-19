<template>
  <main
    class="bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] h-full flex flex-col"
  >
    <section class="">
      <div class="flex justify-center items-center px-[20px] py-[20px]">
        <h3>{{ $t("view.storeInfo.title") }}</h3>
        <!-- <button class="text-black" disabled><h4>新增</h4></button> -->
      </div>

      <h4 class="py-3">{{ $t("navbar.title", { count: total || "0" }) }}</h4>
      <div class="px-2 relative">
        <input
          type="search"
          placeholder="請輸入店家名稱、目的、商圈標籤、特色、種類"
          class="lg:max-w-[300px] mb-[8px]"
          v-model="keyword"
          @input="search()"
        />
        <span
          class="pi pi-search absolute left-[16px] top-[10px] text-black dark:text-white"
        ></span>
      </div>
    </section>
    <DataView :dataList="storeResult" :rows="rows" v-if="isMobile" />
    <DataTableView :dataList="storeResult" :rows="rows" v-if="!isMobile" />
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
const { storeTemporary, storeResult } = storeToRefs(storeInfo);
const { width, height } = useWindowSize();
const storeAfterSearch = ref(storeResult.value); //經過搜尋完的結果，符合篩選條件的店家
const total = computed(() => {
  return storeResult.value.length.toLocaleString();
});
const rows = ref(10); //一頁顯示幾筆資料
const moreOptionMap = ref(new Map());
// const isMobile = isMobileDevice();
const isMobile = ref(true);
const keyword = ref("");

function search() {
  // console.log("搜尋", keyword.value);
  if (keyword.value.trim() === "") {
    setDefaultStore();
    return;
  }

  /* 開始搜尋 */
  if (storeResult.value.length == 0) {
    //尚未變更篩選條件
    storeResult.value = storeTemporary.value.filter((item) => {
      let storeResult = item?.name.includes(keyword.value);
      let matchAddressTag = item?.addressTag.includes(keyword.value);
      let matchPurple = item.purple?.includes(keyword.value);
      let matchCategory = item.category?.includes(keyword.value);
      let matchFeature = item.feature?.includes(keyword.value);
      return (
        storeResult ||
        matchAddressTag ||
        matchPurple ||
        matchCategory ||
        matchFeature
      );
    });
  } else {
    //有變更篩選條件
    storeResult.value = storeResult.value.filter((item) => {
      let storeResult = item.name?.includes(keyword.value);
      let matchAddressTag = item?.addressTag.includes(keyword.value);
      let matchPurple = item.purple?.includes(keyword.value);
      let matchCategory = item.category?.includes(keyword.value);
      let matchFeature = item.feature?.includes(keyword.value);
      return (
        storeResult ||
        matchAddressTag ||
        matchPurple ||
        matchCategory ||
        matchFeature
      );
    });
  }
  console.log("搜尋結果", storeResult.value);
}

//設定回預設店家資料
function setDefaultStore() {
  if (storeResult.value.length == 0) {
    //尚未變更篩選條件
    storeResult.value = storeTemporary.value;
  } else {
    storeResult.value = storeResult.value;
  }
}

watch(
  width,
  (width) => {
    isMobile.value = width < 1024;
  },
  { immediate: true }
);

watch(storeResult, (store) => {
  // storeResult.value = store;
  search();
});

onMounted(() => {
  setDefaultStore();
});
</script>

<style scoped lang="scss">
section {
  background-color: black;
  color: white;
}
</style>
