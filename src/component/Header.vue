<template>
  <header
    class="header w-dvw gap-x-5 relative bg-gradient-to-b from-[#09203f] to-[#15417a] text-base"
  >
    <img
      :src="moreOptionWhite"
      alt="更多選項"
      class="w-[32px] absolute left-3 top-[15px] rotate-90 cursor-pointer"
      @click="showMoreOption = !showMoreOption"
    />
    <div v-for="route in routerList" :key="route">
      <router-link :to="route.path" class="select-none">
      <span class="text-white select-none">{{ route.name }}</span>
    </router-link>
    </div>
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
const routerList = ref([
  {path:"/", name:"首頁", },
  // {path:"/", name:"測驗跳選", },
  {path:"/StoreListTable", name:"店家列表", }
])


</script>


<style scoped lang="scss">
.header {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
