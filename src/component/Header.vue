<template>
  <!-- bg-sky-700 -->
  <header
    class="w-dvw gap-x-5 relative bg-gradient-to-b from-[#09203f] to-[#15417a]"
  >
    <img
      :src="moreOptionWhite"
      alt="更多選項"
      class="w-[32px] absolute left-3 top-[15px] rotate-90 cursor-pointer"
      @click="showMoreOption = !showMoreOption"
    />
    <router-link to="/" class="select-none">
      <h4 class="text-white select-none">HOME</h4>
    </router-link>
    <router-link to="/" class="select-none">
      <h4 class="text-white select-none">測試挑選</h4>
    </router-link>
    <router-link to="/StoreListTable" class="select-none">
      <h4 class="text-white select-none">店家列表</h4>
    </router-link>
  </header>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";

//picture
import moreOptionBlack from "../assets/moreOptionBlack.svg";
import moreOptionWhite from "../assets/moreOptionWhite.svg";

const env = computed(() => {
  return process.env.NODE_ENV;
});

const showMoreOption = ref(false);
</script>
<style scoped>
header {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
