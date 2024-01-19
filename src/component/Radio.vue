<template>
  <div>
    <h4>{{ title }}</h4>
    <div class="grid grid-cols-3 gap-2 justify-center mt-2">
      <div
        v-for="options in optionList"
        :key="options"
        class="button-option border-2 p-2 rounded-lg cursor-pointer flex justify-center hover:bg-blue-400 hover:text-white"
      >
        <input
          type="radio"
          :id="options"
          :value="options"
          :name="props.title"
          class="cursor-pointer w-[20px]"
          :v-model="vModel"
          :checked="options === vModel"
        />
        <label :for="options" class="cursor-pointer pl-1">{{ options }} </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, defineProps, Transition } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "標題",
  },
  optionList: {
    type: Array,
    default: [],
  },
  vModel: {
    type: Array,
    default: [],
  },
});
</script>

<style scoped></style>
