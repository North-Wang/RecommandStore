<template>
  <ul class="flex flex-col items-center">
    <!-- <li class="text-3xl font-bold"></li> -->
    <!-- <button @click="addNewStore">新增店家</button> -->
    <li
      class="w-full rounded-lg border-[1.5px] border-black p-2 flex flex-col justify-center items-center mt-4"
    >
      <h4
        class="whitespace-nowrap translate-x-0 delay-[1s] hover:translate-x-[ translateX(calc(200px - 100%))]"
      >
        {{ answer }}
      </h4>
      <h4 class="" style="text-align: justify">
        10556台北市松山區復興南路一段45號
      </h4>
    </li>
    <button
      class="lottery-button h-[100px] w-[100px] rounded-full border border-white mt-10 select-none"
    >
      pick up
    </button>
    <div
      class="border border-white rounded-full h-16 w-16 flex justify-center items-center"
    >
      <img
        :src="moreOptionWhite"
        alt="moreOptionWhite"
        class="h-10 w-10 hover:opacity-50 blur:opacity-100"
        v-if="isDarkMode"
      />
      <img
        :src="moreOptionBlack"
        alt="moreOptionBlack"
        class="h-10 w-10 hover:opacity-50 blur:opacity-100"
        v-else
      />
    </div>
  </ul>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import detectiveDarkMode from "../js/detectiveDarkMode.js";

//picture
import moreOptionWhite from "../assets/moreOptionWhite.svg";
import moreOptionBlack from "../assets/moreOptionBlack.svg";

const answer = ref("Dreamers Coffee Roasters 微風復興店");
const isDarkMode = detectiveDarkMode();

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
<style scoped>
.lottery-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
