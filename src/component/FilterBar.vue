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
      {{ $t("navbar.title", { count: storeResult.length || "0" }) }}
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
    <li class="wrap-button">
      <button
        class="flex-1 text-black bg-blue max-w-[100px]"
        @click.self="certainChangeFilter()"
      >
        {{ $t("button.certain") }}
      </button>
      <!-- <button
        class="bg-white text-black flex-1 hover:text-black max-w-[100px]"
        @click.self="closeModal()"
      >
        {{ $t("button.cancel") }}
      </button> -->
    </li>
  </ul>
</template>

<script setup>
import { ref, watch, Teleport, defineEmits, Transition } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import { useFilter } from "../store/useFilter";
import { useI18n } from "vue-i18n";
import FilterList from "./Filterbar/FilterList.vue";

//picture
import iconX from "../assets/X.svg";

const emits = defineEmits(["closeModal"]);
const { t, locale } = useI18n({
  inheritLocale: true,
  useScope: "global",
});
const storeInfo = useStoreInfo();
const filterInfo = useFilter();
const {
  storeResult,
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

async function resetFilters() {
  filterInfo.$reset();
  await resetSelected();
}

/**
 * type改變
 * @description 由於type以外的選項會變更，因此要清空所選條件
 * @description 重新設定所有選項
 */
async function changeType(type) {
  resetFilters();

  filterInfo.type = type;
  await storeInfo.filterType(type);
  await storeInfo.setAddressTag();
  storeInfo.setAllOption();
}

/**
 * 變更篩選條件
 * @param {Object} obj 篩選的種類、選擇的選項
 */
function changeFilter(obj) {
  filterInfo[obj.type] = obj.option; //將各項篩選條件統一存到pinia
  console.log("新的" + obj.type, filterInfo[obj.type]);
}

function closeModal() {
  emits("closeModal");
}

function certainChangeFilter() {
  closeModal();
}

function resetSelected() {
  filterTag.value.selectedOptions = "";
  filterPurple.value.selectedOptions = "";
  filterFeature.value.selectedOptions = [];
  filterCategory.value.selectedOptions = [];
}
</script>

<style scoped lang="scss">
.wrapper-filter {
  color: white;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: start;
  background-color: rgba(0, 0, 0);
  position: fixed;
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
.wrap-button {
  width: 100%;
  padding: 24px 20px;
  color: white;
  display: flex;
  justify-content: center;
  row-gap: 8px;
  background-color: black;
}
</style>
