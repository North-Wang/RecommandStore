<template>
  <ul class="flex flex-col items-center" id="homepage">
    <!-- <li class="text-3xl font-bold"></li> -->
    <!-- <button @click="addNewStore">新增店家</button> -->
    <li
      class="w-full flex flex-col justify-center items-center mt-4 text-center"
    >
      <h2 class="h-[72px] leading-tight whitespace-break-spaces text-start">
        {{ answerStore.name }}
      </h2>
      <h5 class="text-blue-400 dark:text-yellow-400">
        {{ answerStore?.feature }}
      </h5>
      <div
        class="w-[96%] flex items-center justify-center gap-x-2 mt-2 relative lg:w-full"
      >
        <button
          class="border-[0.5px] flex-1 border-white p-2 rounded-l overflow-hidden lg:max-w-[600px]"
        >
          <h5 ref="answerAddress" class="text-start whitespace-nowrap px-2">
            {{ answerStore.address }}
          </h5>
        </button>
        <i
          class="w-[32px] pi pi-copy relative cursor-pointer"
          style="font-size: 2rem"
          @click.stop="copyText()"
        >
          <transition>
            <div
              class="absolute right-0 top-[48px] dark:bg-gray-700 p-2 px-3 rounded-md z-20 whitespace-nowrap text-[16px]"
              v-if="showSuccessCopy"
            >
              已經複製地址
            </div>
          </transition>
        </i>
      </div>
    </li>
    <h4
      class="h-[80px] w-[80px] bg-blue-400 py-1 rounded-full select-none text-white mt-10 cursor-pointer flex items-center justify-center hover:bg-blue-600"
      @click="lotteryStore"
    >
      抽選
    </h4>

    <li class="w-16 mt-4 cursor-pointer relative">
      <i
        class="pi pi-bars"
        style="font-size: 2rem"
        @click="showMoreOptions = !showMoreOptions"
      ></i>
    </li>
    <li class="w-full flex justify-center overflow-hidden">
      <Transition
        enter-active-class="animate__animated animate__fadeInDown animate__fast"
        leave-active-class="animate__animated animate__fadeOutUp"
      >
        <ul
          class="w-4/5 flex flex-col justify-center items-center"
          v-if="showMoreOptions"
          ref="moreOptionDropdown"
        >
          <li class="">篩選條件</li>
          <li
            class="w-full grid grid-cols-1 grid-rows-5 gap-2 justify-start mt-2"
          >
            <ul
              v-for="types in filterButtonList"
              :key="types"
              class="moreOptionButton w-full px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer text-[black] hover:light:text-white dark:text-white dark:bg-black dark:hover:text-blue"
              style="border: 1px solid gray"
            >
              {{
                types
              }}
              <li
                v-if="types === '類型'"
                class="grid grid-cols-3 gap-2 justify-center mt-2"
              >
                <div
                  v-for="options in storeInfo.allTypeOption"
                  :key="options"
                  class="button-option border-2 p-2 rounded-lg cursor-pointer flex justify-center hover:bg-blue-600"
                >
                  <input
                    type="radio"
                    :id="options"
                    :value="options"
                    class="cursor-pointer w-[20px]"
                    v-model="selectedType"
                  />
                  <label :for="options" class="cursor-pointer pl-1"
                    >{{ options }}
                  </label>
                </div>
              </li>
              <li
                v-if="types === '目的'"
                class="grid grid-cols-3 gap-2 justify-center mt-2"
              >
                <div
                  v-for="options in storeInfo.allPurpleOption"
                  :key="options"
                  class="border-2 p-2 rounded-lg cursor-pointer hover:bg-blue-600 flex justify-center"
                >
                  <input
                    type="radio"
                    :id="options"
                    :value="options"
                    class="cursor-pointer w-[20px]"
                    v-model="selectedPurple"
                  />
                  <label :for="options" class="cursor-pointer pl-1"
                    >{{ options }}
                  </label>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </Transition>
    </li>
  </ul>

  <Teleport to="#homepage">
    <ul
      class="w-screen h-screen bg-slate-500 absolute top-0 left-0 opacity-50"
      v-if="showOptionModal"
    >
      <li class="text-white">彈窗</li>
      <li></li>
    </ul>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, watch, computed, Transition, Teleport } from "vue";
import axios from "axios";
import detectiveDarkMode from "../js/detectiveDarkMode.js";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import "animate.css";
import { onClickOutside } from "@vueuse/core";

//picture
import moreOptionWhite from "../assets/moreOptionWhite.svg";
import moreOptionBlack from "../assets/moreOptionBlack.svg";
import blackBlurButton from "../assets/blackBlurButton.svg";
import copyIcon from "../assets/copy.svg";
import settingIconBlack from "../assets/setting_icon_black.svg";
import settingIconWhite from "../assets/setting_icon_white.svg";
import animationSettingIconBlack from "../assets/animate_setting_icon_black.gif";
import animationSettingIconWhite from "../assets/animate_setting_icon_white.gif";

const moreOptionDropdown = ref(null);
onClickOutside(moreOptionDropdown, () => {
  showMoreOptions.value = false;
});
const isDarkMode = detectiveDarkMode();
const isMobile = computed(() => {
  const info = navigator.userAgent;
  return /mobile/i.test(info);
});
const answerAddress = ref(null);
const storeInfo = useStoreInfo();
const { storeList } = storeToRefs(storeInfo);
const answerStore = ref({});
const filterButtonList = ref(["類型", "目的", "特色", "種類"]);

const showSuccessCopy = ref(false);
const showMoreOptions = ref(false);
const showOptionModal = ref(false);

const selectedType = ref("餐廳");
const selectedPurple = ref("");

const allFilterFactor = ref({
  type:[],
  purple:[],
  feature:[],
})

const lotteryStore = () => {
  console.log("抽選");
  const randomNumber = Math.floor(Math.random() * storeList.value.length);
  const answer = storeList.value[randomNumber];
  answerStore.value = answer || {};
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
  if (isMobile.value) {
    return;
  }
  showSuccessCopy.value = true;
  console.log("text：", answerAddress.value.innerText);
  const address = answerAddress.value.innerText;
  navigator.clipboard.writeText(address);
  setTimeout(() => {
    showSuccessCopy.value = false;
  }, 2000);
};

onMounted(() => {
  lotteryStore();
});
</script>
<style scoped lang="scss">
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
.moreOptionButton:hover {
  background-color: #4baaf5;
  color: white;
}
input[type="radio"]:checked {
  background-color: blue !important;
  color: white;
  div {
    background-color: blue !important;
  }
}
</style>
