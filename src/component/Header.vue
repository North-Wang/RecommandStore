<template>
  <header class="bg-sky-700 gap-x-5">
    <router-link to="/" class="select-none">
      <h4 class="text-white select-none">HOME</h4>
    </router-link>
    <router-link to="/StoreListTable" class="select-none">
      <h4 class="text-white select-none">店家列表</h4>
    </router-link>
    <router-link to="/TestPage" class="select-none">
      <h4 class="text-white select-none">測試</h4>
    </router-link>
  </header>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
</script>
<style scoped>
header {
  height: 72px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
