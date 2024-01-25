<template>
  <ul class="select-none">
    <h4 @click="showOptions = !showOptions">
      {{ title }}
    </h4>
    <Transition name="slide">
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
    </Transition>

    <Transition name="slide">
      <li
        class="grid grid-cols-3 gap-2 justify-start mt-2 max-h-[200px] overflow-y-auto"
        v-if="showOptions && optionList.length != 0"
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
            v-model="selectedList"
          />
          <label :for="options" class="cursor-pointer pl-1"
            >{{ options }}
          </label>
        </div>
      </li>
    </Transition>
    <li class="text-center text-gray-600" v-if="optionList.length === 0">
      沒有符合的資料
    </li>
  </ul>
</template>

<script setup>
import {
  ref,
  onMounted,
  watch,
  computed,
  defineProps,
  Transition,
  inject,
} from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "標題",
  },
  type: {
    type: String,
    default: "`",
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
const emits = defineEmits(["update"]);

const hasSelectedList = ref([]);
const selectedList = ref([]);
const showOptions = ref(false);

watch(selectedList, (list) => {
  console.log("watch selectedList", list);
  hasSelectedList.value = list;
  emits("update", list);
});

onMounted(() => {});
</script>

<style scoped>
.option-button:has(input[type="checkbox"]:checked) {
  background-color: #4bbaf5;
  color: white;
}
.slide-enter-active {
  transition: all 0.4s ease-out;
}
.slide-leave-active {
  transition: all 0.4s ease-in;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
