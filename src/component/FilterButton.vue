<template>
  <Teleport to="#app">
    <ul class="w-dvw h-[96px] flex justify-center fixed bottom-[160px]">
      <h3
        class="w-[96px] h-[96px] rounded-full bg-red-300 flex justify-center items-center text-white"
        @click.prevent="deFilter()"
      >
        抽選
      </h3>
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
