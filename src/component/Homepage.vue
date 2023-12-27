<template>
  <ul class="flex flex-col items-center">
    <!-- <li class="text-3xl font-bold"></li> -->
    <!-- <button @click="addNewStore">新增店家</button> -->
    <li
      class="w-full p-6 rounded-lg border-[1px] border-white flex flex-col justify-center items-center mt-4 text-center"
    >
      <h2 class="h-[72px] leading-tight whitespace-break-spaces text-start">
        {{ storeName }}
      </h2>
      <button
        class="w-[300px] border-[0.5px] border-white p-2 rounded-l mt-2 overflow-hidden"
      >
        <h5 ref="answerAddress" class="text- whitespace-nowrap">
          {{ address }}
        </h5>
      </button>
      <button @click="copyText()">copy</button>
    </li>
    <!-- <div class="relative flex items-center justify-center mt-20">
      <img
        :src="blackBlurButton"
        alt="blackBlurButton"
        class="w-[100px] h-[100px] cursor-pointer pointer-events-none"
        oncontextmenu="return false"
      />
      <h5
        class="text-white absolute z-20 select-none whitespace-nowrap"
        @click="lotteryStore"
      >
        search
      </h5>
    </div> -->
    <!-- <h3 class="btn select-none text-white mt-10" @click="lotteryStore">抽選</h3> -->
    <h4
      class="w-[140px] bg-blue-400 border-2 py-1 rounded-lg select-none text-white mt-10 cursor-pointer hover:bg-blue-600"
      @click="lotteryStore"
    >
      抽選
    </h4>

    <li class="w-16 h-16 mt-4 cursor-pointer relative">
      <img
        class=" "
        :src="settingIconWhite"
        alt="setting-icon"
        @mouseover.passive="showAnimateSettingIcon = true"
        @mouseleave.passive="showAnimateSettingIcon = false"
        @touchstart.passive="showAnimateSettingIcon = true"
        @touchend.passive="showAnimateSettingIcon = false"
        oncontextmenu="return false"
        v-if="isDarkMode && !showAnimateSettingIcon"
      />
      <img
        class=" "
        :src="settingIconBlack"
        alt="setting-icon"
        @mouseover.passive="showAnimateSettingIcon = true"
        @mouseleave.passive="showAnimateSettingIcon = false"
        @touchstart.passive="showAnimateSettingIcon = true"
        @touchend.passive="showAnimateSettingIcon = false"
        oncontextmenu="return false"
        v-if="!isDarkMode && !showAnimateSettingIcon"
      />
      <img
        class=" "
        :src="animationSettingIconWhite"
        alt="animate-setting-icon"
        @mouseover.passive="showAnimateSettingIcon = true"
        @mouseleave.passive="showAnimateSettingIcon = false"
        @touchstart.passive="showAnimateSettingIcon = true"
        @touchend.passive="showAnimateSettingIcon = false"
        oncontextmenu="return false"
        v-if="isDarkMode && showAnimateSettingIcon"
      />
      <img
        class=" "
        :src="animationSettingIconBlack"
        alt="animate-setting-icon"
        @mouseover.passive="showAnimateSettingIcon = true"
        @mouseleave.passive="showAnimateSettingIcon = false"
        @touchstart.passive="showAnimateSettingIcon = true"
        @touchend.passive="showAnimateSettingIcon = false"
        oncontextmenu="return false"
        v-if="!isDarkMode && showAnimateSettingIcon"
      />
      <!-- <div
        class="w-20 h-20 bg-blue-400 rounded-full absolute top-3 left-3 z-10 flex justify-center items-center"
        style="transform: translate(48px, 48px)"
      >
        feature
      </div>
      <div
        class="w-20 h-20 bg-blue-600 rounded-full absolute top-3 left-3 z-10 translate-x-[101.82px] flex justify-center items-center"
        style="transform: translate(67.812px, 0px)"
      >
        purpose
      </div> -->
    </li>
    <div class="w-[250px] h-[250px] bg-slate-600 rounded-lg mt-4"></div>
  </ul>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import detectiveDarkMode from "../js/detectiveDarkMode.js";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import "animate.css";

//picture
import moreOptionWhite from "../assets/moreOptionWhite.svg";
import moreOptionBlack from "../assets/moreOptionBlack.svg";
import blackBlurButton from "../assets/blackBlurButton.svg";
import copyIcon from "../assets/copy.svg";
import settingIconBlack from "../assets/setting_icon_black.svg";
import settingIconWhite from "../assets/setting_icon_white.svg";
import animationSettingIconBlack from "../assets/animate_setting_icon_black.gif";
import animationSettingIconWhite from "../assets/animate_setting_icon_white.gif";

const storeName = ref("Dreamers Coffee Roasters 微風復興店");
const address = ref(" 10556台北市松山區復興南路一段45號4428293777");
const isDarkMode = detectiveDarkMode();
const answerAddress = ref(null);
const storeInfo = useStoreInfo();
const { storeList } = storeToRefs(storeInfo);

const showAnimateSettingIcon = ref(false);

const lotteryStore = () => {
  console.log("全部的店家資料", storeList.value);
  const randomNumber = Math.floor(Math.random() * storeList.value.length);
  const answerStore = storeList.value[randomNumber];
  if (answerStore) {
    storeName.value = answerStore.name || "";
    address.value = answerStore.address || "";
  } else {
    console.warn("出現不存在的店家", storeList.value, randomNumber);
  }
};

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
.btn,
.btn:hover,
.btn:focus {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  background: #ed1c5b;
  transition: box-shadow 400ms cubic-bezier(0.2, 0, 0.7, 1),
    transform 200ms cubic-bezier(0.2, 0, 0.7, 1);
}
.btn:hover {
  box-shadow: 0 0 1px 15px rgba(138, 59, 88, 0.4),
    0 0 1px 30px rgba(138, 59, 88, 0.1), 0 0 1px 45px rgba(138, 59, 88, 0.1);
}
</style>
