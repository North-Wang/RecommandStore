<template>
  <div>
    <footer class="bg-sky-700 gap-x-5 sm:h-[50px]">
      <router-link to="/"><h4 class="text-white">首頁</h4> </router-link>
      <router-link to="/StoreListTable"
        ><h4 class="text-white">店家列表</h4>
      </router-link>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
</script>
<style scoped>
footer {
  height: 72px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
