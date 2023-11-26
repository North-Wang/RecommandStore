<template>
  <div>
    <div class="text-3xl font-bold underline">店家列表</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";

const storeInfo = useStoreInfo();
const { storeList, titleList } = storeToRefs(storeInfo);

onMounted(() => {
  console.log("全部的店家資訊", storeList.value);
  console.log("欄位標題", titleList.value);
});
</script>
<style scoped></style>
