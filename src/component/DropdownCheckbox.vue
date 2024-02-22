<template>
  <div :ref="refName" class="relative">
    <div class="h-10">
      <input
        type="text"
        :placeholder="placeholder"
        class="px-2 py-1 w-[160px] rounded-lg cursor-pointer text-start"
        style="border: 1px solid black"
        readonly
        @click="showDropdown = !showDropdown"
      />
    </div>
    <div
      class="dropdownWrapper shadow-lg w-[160px]"
      style="border: 1px solid black"
      v-if="showDropdown"
    >
      <label
        v-for="(option, index) in options"
        :key="index"
        :for="option"
        class="options"
      >
        <input
          type="checkbox"
          :id="option"
          :value="option"
          name="label"
          v-model="selectedOption"
          @change="change(option)"
        />
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  refName: {
    //為了避免開錯下拉選單
    type: String,
    default: "dropdownCheckbox",
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "選取項目",
  },
});

const emits = defineEmits(["change"]);
const selectedOption = ref([]);
const showDropdown = ref(false);

watch(selectedOption, (val) => {
  console.log("複選內容", val);
});

onClickOutside(props.refName, () => {
  showDropdown.value = false;
});

function change(option) {
  selectedOption.value = option;
  emits("change", option);
}
</script>

<style scoped lang="scss">
.dropdownWrapper {
  max-height: 240px;
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 40;
  border-radius: 8px;
  background-color: white;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  text-align: start;
}
.dropdownWrapper::-webkit-scrollbar {
  display: none;
}
</style>
