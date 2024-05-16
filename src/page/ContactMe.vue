<template>
  <main>
    <div class="h-screen p-4 bg-lightGray flex justify-center">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSdJGTDbmkwgOVViutr_I4Izt_A7SnPCVpuQNPlN6j6QEubHEg/viewform?embedded=true"
        width="640"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        >載入中…</iframe
      >
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useLoading } from "../store/useLoading";
import { storeToRefs } from "pinia";
import Loading from "../component/Loading.vue";

const loadingInfo = useLoading();
const { isLoading } = storeToRefs(loadingInfo);
</script>

<style scoped>
main {
  background-image: linear-gradient(
      rgba(255, 255, 253, 0.5),
      rgba(32, 60, 90, 0.5)
    ),
    url("../assets/bgMap.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
