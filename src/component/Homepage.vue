<template>
  <ul class="flex flex-col items-center">
    <!-- <li class="text-3xl font-bold"></li> -->
    <!-- <button @click="addNewStore">新增店家</button> -->
    <li
      class="w-4/5 rounded-lg border-[1.5px] border-black p-2 flex flex-col justify-center items-center mt-4"
    >
      <h2>{{ answer }}</h2>
      <h3>10556台北市松山區復興南路一段45號</h3>
      <div></div>
    </li>
    <li
      class="h-[120px] w-[120px] rounded-full border border-white mt-10 flex justify-center items-center"
    >
      Click
    </li>
    <button>more detail</button>
  </ul>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";

const answer = ref("Dreamers Coffee Roasters 微風復興店");

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
