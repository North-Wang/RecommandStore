<template>
  <div class="select-none">
    <h4 class="cursor-pointer" @click.prevent="showOption = !showOption">
      商圈標籤
    </h4>
    <h5
      class="w-auto button-option border-2 p-2 rounded-lg cursor-pointer flex justify-center"
    >
      {{ selectedTag || "- -" }}
    </h5>

    <Transition name="slide">
      <div v-if="showOption">
        <ul
          class="grid grid-cols-3 gap-2 justify-center mt-3 max-h-[200px] overflow-y-auto"
        >
          <li
            v-for="options in optionList"
            :key="options"
            class="option-button button-option border-2 p-2 rounded-lg cursor-pointer flex justify-center hover:bg-blue-400 hover:text-white"
          >
            <input
              type="radio"
              :id="options"
              :value="options"
              :name="title"
              class="cursor-pointer w-[20px]"
              :checked="options === selectedTag"
              @input="update(options)"
            />
            <label :for="options" class="cursor-pointer pl-1"
              >{{ options }}
            </label>
          </li>
        </ul>
        <hr />
        <ul class="flex justify-center gap-2 mt-2">
          <!-- <li
            @click.prevent="update(selectedTag)"
            class="px-4 py-2 bg-blue-400 rounded-lg"
          >
            確定
          </li> -->
          <li
            @click.prevent="update('')"
            class="mb-2 px-4 py-2 bg-red-400 rounded-lg"
          >
            重設
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  watch,
  computed,
  defineProps,
  defineEmits,
  Transition,
} from "vue";

const props = defineProps({
  optionList: {
    type: Array,
    default: [],
  },
});

const emits = defineEmits(["update"]);
const showOption = ref(true);
const selectedTag = ref("");

const update = (option) => {
  selectedTag.value = option;
  emits("update", option);
};
</script>

<style scoped>
.option-button:has(input[type="radio"]:checked) {
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
