<template>
  <Teleport to="#app">
    <ul class="w-full h-[96px] flex justify-center fixed bottom-[150px]">
      <!-- <h3
        class="w-[96px] h-[96px] rounded-full bg-[#FF6B6B] flex justify-center items-center text-white cursor-pointer select-none"
        @click.prevent="deFilter()"
      >
        抽選
      </h3> -->
      <button
      class="fixed bottom-[100px] z-40 w-3/5 max-w-[240px] bg-[#FF6B6B] text-white cursor-pointer select-none hover:bg-[#ad4747]"
      @click.prevent="deFilter()"
    >
    抽選
    </button>
    </ul>
  </Teleport>
</template>

<script setup>
import { ref, Teleport, defineEmits } from "vue";
import { useRouter } from "vue-router";

const emits = defineEmits("filter");
const router = useRouter();

function deFilter() {
  //   emits("filter");
  router.push("/FilterResult");
}
</script>
