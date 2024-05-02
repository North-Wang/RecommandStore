<template>
  <div class="container" ref="filterList">
    <h3 class="title" @click="closeOption()">
      {{ titleInterface[dataType] || "- -" }}
    </h3>
    <div
      class="wrapper-tag min-h-[48px] rounded-lg p-1"
      style="border: 1px solid white"
      v-show="selectedOptions.length"
      v-if="inputType === 'radio' && selectedOptions != ''"
    >
      <label :for="selectedOptions" class="tag bg-slate-200">
        {{ selectedOptions }}
        <i
          class="pi pi-times ml-2 cursor-pointer"
          style="font-size: 1rem"
          @click="selectedOptions = ''"
        />
      </label>
    </div>
    <div
      class="wrapper-tag min-h-[48px] rounded-lg p-1"
      style="border: 1px solid white"
      v-show="selectedOptions.length"
      v-if="inputType === 'checkbox' && selectedOptions != ''"
    >
      <label
        :for="items"
        class="tag bg-slate-200"
        v-for="items in selectedOptions"
        :key="items"
      >
        {{ items }}
        <i class="pi pi-times ml-2 cursor-pointer" style="font-size: 1rem" />
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
  dataType: {
    //是什麼資料
    type: String,
    default: "",
  },
  data: {
    type: Array,
    default: () => [],
  },
  inputType: {
    //input類型
    type: String,
    default: "radio",
  },
});

const emits = defineEmits(["change"]);

const filterList = ref(null);
const showOptions = ref(false);
const titleInterface = ref({
  addressTag: "SHOPPING AREA 商圈標籤",
  purple: "PURPLE 目的",
  category: "CATEGORY 種類",
});
const selectedOptions = ref([]); //被勾選的選項
onClickOutside(filterList, () => {
  showOptions.value = false;
});

function closeOption() {
  filterSelected();
  showOptions.value = !showOptions.value;
}
function filterSelected() {}
function deleteSelected(item) {
  const index = selectedOptions.value.indexOf(item);
  selectedOptions.value.splice(index, 1);
}

function changeInput(type) {
  console.log("選擇的項目", selectedOptions.value);
  emits("change", {
    type: props.dataType,
    option: selectedOptions.value,
  });
}
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
    }
  }
}
</style>
