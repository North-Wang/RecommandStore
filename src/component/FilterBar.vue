<!-- 篩選器彈窗 -->
<template>
  <ul class="wrapper-filter h-screen md:w-[500px]">
    <li class="px-[12px] py-[12px] border-bottom flex justify-normal">
      <img
        :src="iconX"
        alt="x"
        class="w-[30px] h-[32px] cursor-pointer"
        @click.self="closeModal"
      />
    </li>
    <h3 class="container text-center select-none">
      總共有{{ matchStore.length || "0" }}筆資料符合
    </h3>
    <li class="container">
      <h3 class="title select-none">TYPE 類型</h3>
      <ul class="wrapper-tag">
        <label
          :for="types"
          class="tag bg-slate-200 cursor-pointer"
          v-for="types in allTypeOption"
          :key="types"
        >
          <input
            type="radio"
            :value="types"
            :id="types"
            :checked="currentType === types"
            name="types"
            class="text-[16px] mr-1 dark:accent-blue"
            @change="changeType(types)"
          />
          {{ types }}
        </label>
      </ul>
    </li>
    <FilterList
      ref="filterTag"
      :dataType="'addressTag'"
      :data="allAddressTag"
      :inputType="'radio'"
      @change="changeFilter"
    />
    <FilterList
      ref="filterPurple"
      :dataType="'purple'"
      :data="allPurpleOption"
      :inputType="'radio'"
      @change="changeFilter"
    />
    <FilterList
      ref="filterFeature"
      :dataType="'feature'"
      :data="allFeatureOption"
      :inputType="'checkbox'"
      @change="changeFilter"
    />
    <FilterList
      ref="filterCategory"
      :dataType="'category'"
      :data="allCategoryOption"
      :inputType="'checkbox'"
      @change="changeFilter"
    />
    <li
      class="w-full px-[20px] py-[24px] text-white flex justify-center gap-[8px]"
    >
      <button
        class="flex-1 text-black bg-blue max-w-[100px]"
        @click.self="certainChangeFilter()"
      >
        確認
      </button>
      <button
        class="bg-white text-black flex-1 hover:text-black max-w-[100px]"
        @click.self="closeModal()"
      >
        取消
      </button>
    </li>
  </ul>
</template>

<script setup>
import { ref, watch, Teleport, defineEmits, Transition } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import { useFilter } from "../store/useFilter";
import FilterList from "./Filterbar/FilterList.vue";

//picture
import iconX from "../assets/X.svg";

const emits = defineEmits(["closeModal"]);
const storeInfo = useStoreInfo();
const filterInfo = useFilter();
const {
  storeList,
  storeListAfterFilterType,
  allTypeOption,
  allAddressTag,
  allPurpleOption,
  allFeatureOption,
  allCategoryOption,
} = storeToRefs(storeInfo);
const {
  type: currentType,
  addressTag,
  purple,
  feature,
  category,
} = storeToRefs(filterInfo);
const filterTag = ref(null);
const filterPurple = ref(null);
const filterFeature = ref(null);
const filterCategory = ref(null);
const matchStore = ref([]);

//watch pinia
filterInfo.$subscribe((mutation, state) => {
  //state：被改動的整個state實例
  // console.table(state);
});

async function resetFilters() {
  filterInfo.$reset();
  await resetSelected();
}

async function changeType(type) {
  //由於type以外的選項會變更，因此要清空所選條件
  resetFilters();

  filterInfo.type = type;
  await storeInfo.filterType(type);
  //只顯示有該type(類型)才有的address、purple、feature、category...等
  await storeInfo.setAddressTag();
  storeInfo.setAllOption();
}

function changeFilter(obj) {
  console.log("篩選條件變更", obj);
  filterInfo[obj.type] = obj.option; //將各項篩選條件統一存到pinia
  console.log("新的篩選條件", filterInfo);
  // doFilter();
}

function doFilter() {
  //如果沒有選擇任何條件，
  if (
    filterInfo.purple === "" &&
    !filterInfo.addressTag.length &&
    !filterInfo.feature.length &&
    !filterInfo.category.length
  ) {
    matchStore.value = storeListAfterFilterType.storeListAfterFilterType;
    return;
  }

  const ans = storeListAfterFilterType.value.filter((item) => {
    //如果有選擇addressTag
    let matchAddressTag = true;
    if (addressTag.value !== "") {
      matchAddressTag = item.addressTag.indexOf(addressTag.value) != -1;
      // console.log("比較商圈", matchAddressTag);
    }

    //如果有選擇purple
    let matchPurple = true;
    if (purple.value !== "") {
      matchPurple = item.purple.split(/[,，、]/).some((str) => {
        return str == purple.value;
      });
    }

    //如果有選擇feature
    let matchFeature = true;
    if (feature.value.length !== 0) {
      matchFeature = item.feature.split(/[,，、]/).some((str) => {
        return feature.value.includes(str);
      });
    }

    //如果有選擇category
    let matchCategory = true;
    if (category.value.length !== 0) {
      matchCategory = item.category.split(/[,，、]/).some((str) => {
        return category.value.includes(str);
      });
    }

    //回傳同時符合上述篩選條件的
    return matchAddressTag && matchPurple && matchFeature && matchCategory;
  });
  matchStore.value = ans;
}

function closeModal() {
  emits("closeModal");
}

function certainChangeFilter() {
  storeInfo.matchStore = matchStore.value;
  closeModal();
}

function resetSelected() {
  filterTag.value.selectedOptions = "";
  filterPurple.value.selectedOptions = "";
  filterFeature.value.selectedOptions = [];
  filterCategory.value.selectedOptions = [];
}

//如果type有變更就在pinia篩選一次type，減少資料量
watch(
  storeListAfterFilterType,
  (storeList) => {
    matchStore.value = storeList;
  },
  { immediate: true },
);
</script>

<style scoped lang="scss">
.wrapper-filter {
  color: white;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: start;
  background-color: rgba(0, 0, 0);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  .container {
    padding: 24px 20px;
    border-bottom: 1px solid white;
    background-color: rgba(0, 0, 0, 0.8);
    .title {
      font-family: "Francois One", sans-serif;
    }
  }
}
.wrapper-tag {
  max-height: 136px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 8px;
  margin-top: 8px;
  color: black;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: auto;
  .tag {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 12px;
    padding-right: 12px;
    white-space: nowrap;
    text-wrap: nowrap;
    display: flex;
    align-items: center;
  }
}
</style>
