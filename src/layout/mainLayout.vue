<template>
  <div class="w-screen min-h-screen flex flex-col">
    <Header />
    <div class="flex-1 relative overflow-y-auto">
      <router-view v-slot="{ Component }" class="h-full">
        <component :is="Component" />
      </router-view>
      <Loading v-if="loading" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import Header from "../component/Header.vue";
import Loading from "../component/Loading.vue";

const loading = ref(false);
</script>
