<template>
  <Teleport to="#app">
    <div
      class="loading w-full h-screen flex justify-center items-center z-50 fixed top-0 left-0 text-black"
    >
      <i class="pi pi-spin pi-spinner text-3xl"></i>
      <span class="ml-2">Loading...</span>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, Teleport } from "vue";
</script>

<style scoped>
.loading {
  background-color: white;
  opacity: 0.5;
}
</style>
