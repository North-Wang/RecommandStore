<template>
  <div class="container select-none" ref="filterList">
    <div class="flex justify-between">
      <h3 class="title" @click="closeOption()">
        {{ titleInterface[dataType] || "- -" }}
      </h3>
      <input
        type="button"
        value="清空"
        class="cursor-pointer"
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
        <!-- <i class="pi pi-times ml-2 cursor-pointer" style="font-size: 1rem" /> -->
      </label>
    </div>
    <Transition>
      <div class="wrapper-tag" v-show="showOptions && data.length">
        <label
          :for="items"
          class="tag bg-slate-200"
          v-for="items in data"
          :key="items"
        >
          <input
            :type="inputType"
            :value="items"
            :id="items"
            name="address-tag"
            class="text-[16px] mr-1"
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
import { ref, defineProps, defineEmits, Transition } from "vue";
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
  //想要選項的選項
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
});

const emits = defineEmits(["change"]);

const filterList = ref(null);
const showOptions = ref(false);
const titleInterface = ref({
  type: "TYPE 類型",
  addressTag: "SHOPPING AREA 商圈標籤",
  purple: "PURPLE 目的",
  feature: "FEATURE 特色",
  category: "CATEGORY 種類",
});
const selectedOptions = ref([]); //被勾選的選項
onClickOutside(filterList, () => {
  showOptions.value = false;
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

defineExpose({
  selectedOptions,
});
</script>

<style scoped lang="scss">
.container {
  padding: 24px 20px;
  border-bottom: 1px solid white;
  background-color: rgba(0, 0, 0, 0.8);
  .title {
    font-family: "Francois One", sans-serif;
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
      cursor: pointer;
    }
  }
}
</style>
