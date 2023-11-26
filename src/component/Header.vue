<template>
  <div>
    <header class="bg-sky-700 text-white cusror">
      <router-link to="/" class="text-white">Header</router-link>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import Homepage from "./Homepage.vue";
import StoreListTable from "./StoreListTable.vue";
</script>
<style scoped>
header {
  height: 50px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
