<template>
  <ul class="flex flex-col items-center">
    <!-- <li class="text-3xl font-bold"></li> -->
    <!-- <button @click="addNewStore">新增店家</button> -->
    <li
      class="w-full p-6 rounded-lg border-[1px] border-white flex flex-col justify-center items-center mt-4 text-center"
    >
      <h2
        class="leading-tight translate-x-0 delay-[1s] hover:translate-x-[ translateX(calc(200px - 100%))]"
      >
        {{ answer }}
      </h2>
      <button
        class="w-[300px] border-[0.5px] border-white p-2 rounded-l mt-2 overflow-hidden"
      >
        <h4 ref="answerAddress" class="text- whitespace-nowrap">
          10556台北市松山區復興南路一段45號4428293777
        </h4>
      </button>
      <button @click="copyText()">copy</button>
      <i class="fa-solid fa-copy"></i>
    </li>
    <!-- <div class="relative flex items-center justify-center mt-20">
      <div
        class="bg-white w-[56px] h-[56px] rounded-[50%] absolute top-0 left-0"
      ></div>
      <img
        :src="blackBlurButton"
        alt="blackBlurButton"
        class="w-[100px] h-[100px] cursor-pointer pointer-events-none"
        oncontextmenu="return false"
      />
      <h5 class="text-white absolute z-20 select-none whitespace-nowrap">
        pick up
      </h5>
    </div> -->
    <ul class="w-20 h-20 bg-white rounded-full relative">
      <li
        class="w-8 h-8 bg-red-500 rounded-full absolute top-0 left-0 right-0 bottom-0 m-auto"
      ></li>
    </ul>

    <div
      class="border border-white rounded-full h-16 w-16 flex justify-center items-center pointer-events-none mt-4"
    >
      <img
        :src="moreOptionWhite"
        alt="moreOptionWhite"
        class="h-10 w-10 hover:opacity-50 blur:opacity-100"
        oncontextmenu="return false"
        v-if="isDarkMode"
      />
      <img
        :src="moreOptionBlack"
        alt="moreOptionBlack"
        class="h-10 w-10 hover:opacity-50 blur:opacity-100"
        oncontextmenu="return false"
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
import blackBlurButton from "../assets/blackBlurButton.svg";

const answer = ref("Dreamers Coffee Roasters 微風復興店");
const isDarkMode = detectiveDarkMode();

const answerAddress = ref(null);

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

const copyText = async function (text) {
  console.log("text：", answerAddress.value.innerText);
  const address = answerAddress.value.innerText;
  navigator.clipboard.writeText(address);
};
</script>
<style scoped>
.lottery-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
