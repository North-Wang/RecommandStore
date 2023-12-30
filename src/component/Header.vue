<template>
  <div>
    <header class="bg-sky-700 gap-x-5 text-white cusror">
      <router-link to="/" class="text-white">
        <h4>HOME</h4>
      </router-link>
      <router-link to="/StoreListTable"
        ><h4 class="text-white">店家列表</h4>
      </router-link>
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
  height: 72px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
