<template>
  <div class="relative">
    <div class="h-10" @click="showDropdown = !showDropdown">
      <input
        type="text"
        :placeholder="placeholder"
        :value="selectedOption"
        class="px-2 py-1 w-[160px] rounded-lg cursor-pointer text-start"
        style="border: 1px solid black"
        readonly
      />
    </div>
    <div
      :ref="refName"
      class="dropdownWrapper shadow-lg w-[160px]"
      style="border: 1px solid black"
      v-if="showDropdown"
    >
      <div
        v-for="(option, index) in options"
        :key="index"
        class="px-2 py-1 text-start cursor-pointer"
        @click.prevent="change(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
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
const selectedOption = ref("");
const showDropdown = ref(false);
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
}
.dropdownWrapper::-webkit-scrollbar {
  display: none;
}
</style>
