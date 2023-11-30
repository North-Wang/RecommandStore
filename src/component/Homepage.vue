<template>
  <div>
    <div class="text-3xl font-bold underline">首頁</div>
    <button @click="addNewStore">新增店家</button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";

const addNewStore = async function () {
  const newStore = {
    name: "北大荒水餃店",
    type: "日式",
    peopleLimit: "10",
    purple: "普通吃飯",
    lowPrice: "60",
    highPrice: "300",
    address: "115台北市南港區南港路一段201號",
    feature: "划算",
    category: "滷味,水餃",
  };
  const config = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Request-Method": "POST",
    },
    body: JSON.stringify(newStore),
  };
  const url =
    "https://script.google.com/macros/s/AKfycby861bkJ2z38iybFkkTBcIRaoyirXrk9wMc-XKtSbg8QTtc4o9tEFoW_BPpnDWpOIYJqA/exec";

  try {
    const result = fetch(url, config);
    console.log("result", result);
  } catch (error) {
    console.log("error", error);
  }
};
</script>
<style scoped></style>
