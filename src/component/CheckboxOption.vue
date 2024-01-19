<template>
  <ul>
    <h4 @click="showOptions = !showOptions">{{ title }}</h4>
    <li
      class="grid grid-cols-3 gap-2 justify-start my-3 overflow-y-auto rounded-lg p-3"
      style="border: 1px solid rgb(194, 194, 194)"
      v-if="hasSelectedList.length != 0"
    >
      <div
        v-for="selected in hasSelectedList"
        :key="selected"
        class="border-2 p-2 rounded-lg cursor-pointer flex justify-center hover:bg-blue-400 hover:text-white"
      >
        <label :for="selected" class="cursor-pointer pl-1"
          >{{ selected }}
          <i class="pi pi-times" style="font-size: 1rem"></i>
        </label>
      </div>
    </li>
    <Transition name="slide">
      <li
        class="grid grid-cols-3 gap-2 justify-start mt-2 max-h-[200px] overflow-y-auto"
        v-if="showOptions"
      >
        <div
          v-for="options in optionList"
          :key="options"
          class="option-button border-2 p-2 rounded-lg cursor-pointer hover:bg-blue-400 hover:text-white flex justify-center"
        >
          <input
            type="checkbox"
            :id="options"
            :value="options"
            class="cursor-pointer w-[20px]"
            :v-model="props.vModel"
            :checked="options === props.vModel"
            @input="update(options)"
          />
          <label :for="options" class="cursor-pointer pl-1"
            >{{ options }}
          </label>
        </div>
      </li>
    </Transition>
  </ul>
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

const hasSelectedList = ref([]);
const showOptions = ref(false);

const update = (option) => {
  const hasSelectedSet = new Set(hasSelectedList.value);
  if (hasSelectedSet.has(option)) {
    hasSelectedSet.delete(option);
  } else {
    hasSelectedSet.add(option);
  }
  hasSelectedList.value = Array.from(hasSelectedSet);
};
onMounted(() => {});
</script>

<style scoped>
.option-button:has(input[type="checkbox"]:checked) {
  background-color: #4bbaf5;
  color: white;
}
</style>
