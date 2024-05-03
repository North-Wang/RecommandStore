<!-- 篩選器彈窗 -->
<template>
  <ul class="wrapper-filter">
    <li class="px-[12px] py-[12px]" style="border-bottom: 1px solid white">
      <img
        :src="iconX"
        alt="x"
        class="w-[30px] h-[32px] cursor-pointer"
        @click.self="closeModal"
      />
    </li>
    <h3 class="container text-center">
      總共有{{ matchStore.length || "- -" }}筆資料符合
    </h3>
    <!-- <FilterList
      :dataType="'type'"
      :data="allTypeOption"
      :inputType="'radio'"
      @change="changeFilter"
    /> -->
    <li class="container">
      <h3 class="title">TYPE 類型</h3>
      <ul class="wrapper-tag">
        <label
          :for="types"
          class="tag bg-slate-200"
          v-for="types in allTypeOption"
          :key="types"
        >
          <input
            type="radio"
            :value="types"
            :id="types"
            :checked="currentType === types"
            name="types"
            class="text-[16px] mr-1"
            @change="changeType(types)"
          />
          {{ types }}
        </label>
      </ul>
    </li>
    <FilterList
      :dataType="'addressTag'"
      :data="allAddressTag"
      :inputType="'radio'"
      @change="changeFilter"
    />
    <FilterList
      :dataType="'purple'"
      :data="allPurpleOption"
      :inputType="'radio'"
      @change="changeFilter"
    />
    <li class="container">
      <h3 class="title">FEATURE 特色</h3>
      <ul>
        <li></li>
      </ul>
    </li>
    <FilterList
      :dataType="'category'"
      :data="allCategoryOption"
      :inputType="'checkbox'"
      @change="changeFilter"
    />
    <li
      class="w-screen px-[20px] py-[24px] text-white flex justify-between gap-[8px]"
    >
      <button class="bg-red flex-1">確認</button>
      <button class="bg-white text-red flex-1" @click.self="closeModal()">
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
  allCategoryOption,
} = storeToRefs(storeInfo);
const { type: currentType } = storeToRefs(filterInfo);

//watch pinia
filterInfo.$subscribe((mutation, state) => {
  //state：被改動的整個state實例
  console.table(state);
});
const matchStore = ref([]); //符合條件的店家

function closeModal() {
  console.log("關閉彈窗");
  emits("closeModal");
}

function changeType(type) {
  filterInfo.type = type;
  storeInfo.filterType(type);
}

function changeFilter(obj) {
  // console.log("篩選條件變更", obj.type, obj.option);
  filterInfo[obj.type] = obj.option;
  doFilter();
}

function doFilter() {
  //如果沒有選擇任何條件，
  if (
    filterInfo.purple === "" &&
    !filterInfo.addressTag.length &&
    !filterInfo.feature.length &&
    !filterInfo.category.length
  ) {
    matchStore.value = storeInfo.storeListAfterFilterType;
    return;
  }

  const ans = storeList.value.filter((item) => {
    console.log("aaa item", item);
    const filterList = ["purple", "category"]; //要被篩選的key

    for (const key in filterList) {
      //如果key值是Array且不為空陣列，就進行篩選
      if (Array.isArray(filterInfo[key]) && filterInfo[key].length) {
        console.log("aaa item[key]", item[key]);
        item[key].index;
      } else if (typeof filterInfo[key] == "string" && filterInfo[key] !== "") {
        //key值是String
        return item[key].includes(filterInfo[key]) != -1;
      }
    }
    //如果有選擇addressTag就篩選
    // if (filterInfo.addressTag !== "") {
    //   return item.addressTag.indexOf(filterInfo.addressTag) != -1;
    // }

    // //如果有選擇purple就篩選
    // if (filterInfo.purple !== "") {
    //   return item.purple === filterInfo.purple;
    // }
  });
  console.log("aaa 篩選結果", ans.length);
  matchStore.value = ans;
}

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
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
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
  // .tag:hover{
  //   background-color: #4baaf5;
  //   color: white;
  // }
}
</style>
