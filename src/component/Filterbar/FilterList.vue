<template>
  <div class="container select-none" ref="filterList">
    <div class="flex justify-between">
      <h3 class="title" @click="closeOption()">
        {{ titleInterface[dataType] || "- -" }}
      </h3>
      <input
        type="button"
        value="清空"
        class="cursor-pointer dark:accent-white"
        @click="cleanUp()"
        v-if="selectedOptions != ''"
      />
    </div>

    <div
      class="wrapper-tag"
      v-show="selectedOptions.length"
      v-if="inputType === 'radio' && selectedOptions != ''"
    >
      <label :for="selectedOptions" class="tag bg-blue font-semibold h-10">
        {{ selectedOptions }}
        <!-- <i
          class="pi pi-times ml-2 cursor-pointer"
          style="font-size: 1rem"
          @click="selectedOptions = ''"
        /> -->
      </label>
    </div>
    <div
      class="wrapper-tag"
      v-show="selectedOptions.length"
      v-if="inputType === 'checkbox' && selectedOptions != ''"
    >
      <label
        :for="items"
        class="tag bg-blue font-semibold h-10"
        v-for="items in selectedOptions"
        :key="items"
      >
        {{ items }}
      </label>
    </div>
    <Transition>
      <div class="wrapper-tag" v-show="showOptions && data.length">
        <input
          type="search"
          class="text-left mt-3 mb-2"
          :placeholder="placeHolder"
          v-model="keyword"
          @change="filterOptions(keyword)"
          v-if="needSearch"
        />
        <label
          :for="items"
          class="tag bg-slate-200"
          v-for="items in allOptions"
          :key="items"
        >
          <input
            :type="inputType"
            :value="items"
            :id="items"
            name="address-tag"
            class="text-[16px] mr-1 dark:accent-white"
            v-model="selectedOptions"
            @change="changeInput()"
          />
          {{ items }}
        </label>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  Transition,
  computed,
  watch,
} from "vue";
import { storeToRefs } from "pinia";
import { useFilter } from "../../store/useFilter";
import { useStoreInfo } from "../../store/useStoreInfo";
import { onClickOutside } from "@vueuse/core";

//picture
import iconX from "../../assets/xBlack.svg";

const props = defineProps({
  //定義是什麼類型的資料
  dataType: {
    type: String,
    default: "",
  },
  //該filter的所有選項
  data: {
    type: Array,
    default: () => [],
  },
  //input類型
  inputType: {
    type: String,
    default: "radio",
  },
  cleanAll: {
    type: Function,
  },
  placeHolder: {
    type: String,
    default: "搜尋",
  },
});

const emits = defineEmits(["change"]);
const rowData = computed(() => props.data); //原始的所有選項資料
const allOptions = ref([]); //篩選過關鍵字的選項

const filterList = ref(null);
const showOptions = ref(false);
const titleInterface = ref({
  type: "TYPE 類型",
  addressTag: "SHOPPING AREA 商圈標籤",
  purple: "PURPLE 目的",
  feature: "FEATURE 特色",
  category: "CATEGORY 種類",
});
const keyword = ref("");
const selectedOptions = ref([]); //被勾選的選項
onClickOutside(filterList, () => {
  showOptions.value = false;
});
const needSearch = computed(() => {
  switch (props.dataType) {
    case "purple":
      return false;

    default:
      return true;
  }
});

function closeOption() {
  showOptions.value = !showOptions.value;
}

function changeInput() {
  emits("change", {
    type: props.dataType,
    option: selectedOptions.value,
  });
}

function cleanUp() {
  if (props.inputType === "radio") {
    selectedOptions.value = "";
  } else if (props.inputType === "checkbox") {
    selectedOptions.value = [];
  }

  emits("change", {
    type: props.dataType,
    option: selectedOptions.value,
  });
}

//篩選出指定的選項
function filterOptions(keyword) {
  if (keyword.trim() === "") {
    allOptions.value = rowData.value;
    return;
  }

  allOptions.value = rowData.value.filter((item) => {
    return item.toLowerCase().includes(keyword.toLowerCase());
  });
}

defineExpose({
  selectedOptions,
});

watch(
  rowData,
  (data) => {
    allOptions.value = data;
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.container {
  padding: 24px 20px;
  border-bottom: 1px solid white;
  background-color: rgba(0, 0, 0, 0.8);
  .title {
    font-family: "Francois One", sans-serif;
    cursor: pointer;
  }
  .wrapper-tag {
    max-height: 160px;
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
      cursor: pointer;
    }
  }
}
</style>
