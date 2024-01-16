<template>
  <ul class="flex flex-col items-center" id="homepage">
    <!-- <li class="text-3xl font-bold"></li> -->
    <!-- <button @click="addNewStore">新增店家</button> -->
    <li
      class="w-full flex flex-col justify-center items-center mt-4 text-center"
    >
      <h2 class="h-[72px] leading-tight whitespace-break-spaces text-start">
        {{ lotteryResult?.name }}
        <span v-if="lotteryResult?.name === undefined" class="text-red-500"
          >沒有匹配的店家</span
        >
      </h2>
      <h5 class="text-blue-400 dark:text-yellow-400">
        {{ lotteryResult?.feature }}
      </h5>
      <div
        class="w-[96%] flex items-center justify-center gap-x-2 mt-2 relative lg:w-full"
      >
        <button
          class="min-h-[54px] border-[0.5px] flex-1 border-white p-2 rounded-l overflow-hidden lg:max-w-[600px]"
        >
          <h5 ref="answerAddress" class="text-start whitespace-nowrap px-2">
            {{ lotteryResult?.address }}
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
      @click="pickup()"
    >
      抽選
    </h4>
    <h5>總共匹配到{{ suitableStoreList.length }}筆資料</h5>
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
                v-if="types === '地點類型'"
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
                    v-model="allFilterFactor.type"
                    :checked="options === allFilterFactor.type"
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
                    type="checkbox"
                    :id="options"
                    :value="options"
                    class="cursor-pointer w-[20px]"
                    v-model="allFilterFactor.purple"
                    :checked="options === allFilterFactor.purple"
                  />
                  <label :for="options" class="cursor-pointer pl-1"
                    >{{ options }}
                  </label>
                </div>
              </li>
              <li
                v-if="types === '特色'"
                class="grid grid-cols-3 gap-2 justify-center mt-2"
              >
                <div
                  v-for="features in featureList"
                  :key="features"
                  class="border-2 p-2 rounded-lg cursor-pointer hover:bg-blue-600 flex justify-center"
                >
                  <input
                    type="checkbox"
                    :id="features"
                    :value="features"
                    class="cursor-pointer w-[20px]"
                    v-model="allFilterFactor.feature"
                    :checked="features === allFilterFactor.purple"
                  />
                  <label :for="features" class="cursor-pointer pl-1"
                    >{{ features }}
                  </label>
                </div>
              </li>
              <li
                v-if="types === '餐廳種類'"
                class="grid grid-cols-3 gap-2 justify-start mt-2"
              >
                <div
                  v-for="category in storeInfo.allCategoryOption"
                  :key="category"
                  class="border-2 p-2 rounded-lg cursor-pointer hover:bg-blue-600 flex justify-center"
                >
                  <input
                    type="checkbox"
                    :id="category"
                    :value="category"
                    class="cursor-pointer w-[20px]"
                    v-model="allFilterFactor.category"
                    :checked="category === allFilterFactor.category"
                  />
                  <label :for="category" class="cursor-pointer pl-1"
                    >{{ category }}
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
const filterButtonList = ref(["地點類型", "目的", "特色", "餐廳種類"]);
const featureList = ref([
  "划算",
  "老店",
  "人氣",
  "久坐",
  "插座",
  "特色",
  "道地",
  "好吃",
]);
const suitableStoreList = ref({});
const lotteryResult = ref({});

const showSuccessCopy = ref(false);
const showMoreOptions = ref(true);
const showOptionModal = ref(false);

const allFilterFactor = ref({
  //選擇的各種篩選條件
  type: "餐廳",
  purple: [],
  feature: [],
  category: [],
});

const filterType = () => {
  suitableStoreList.value = storeList.value.filter((store) => {
    return store.type === allFilterFactor.value.type;
  });
};
const filterFactor = (factor) => {
  suitableStoreList.value = suitableStoreList.value.filter((store) => {
    return allFilterFactor.value[factor].includes(store[factor]);
  });
};
const filterFeature = (factorList) => {
  suitableStoreList.value = suitableStoreList.value.filter((store) => {
    const isMatch = allFilterFactor.value.feature.some((feature) => {
      return store.feature.indexOf(feature) != -1;
    });
    return isMatch;
  });
};
const filterCategory = (factorList) => {
  suitableStoreList.value = suitableStoreList.value.filter((store) => {
    const isMatch = allFilterFactor.value.category.some((category) => {
      return store.category.indexOf(category) != -1;
    });
    return isMatch;
  });
};
const filterAllFactor = async function (filterGroup) {
  await filterType();
  if (filterGroup.purple.length) filterFactor("purple");
  if (filterGroup.feature.length) filterFeature();
  if (filterGroup.category.length) filterCategory();
  console.log("符合條件的店家名單", suitableStoreList.value);
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
const pickup = () => {
  const randomNumber = Math.floor(
    Math.random() * suitableStoreList.value.length
  );
  const answer = suitableStoreList.value[randomNumber];
  if (!answer) {
    console.warn("沒有匹配的結果");
  }
  console.log("抽選結果", answer);
  lotteryResult.value = answer || {};
};

watch(storeList, async function (list) {
  //when go into this page, will do this function first
  if (list.length != 0) {
    await filterType();
    pickup();
  }
});
watch(
  allFilterFactor,
  async function (filterGroup) {
    console.log("篩選條件變化", filterGroup);
    if (
      filterGroup.purple.length === 0 &&
      filterGroup.feature.length === 0 &&
      filterGroup.category.length === 0
    ) {
      await filterType();
      console.log("沒有選擇篩選條件");
    } else {
      await filterAllFactor(filterGroup);
    }
    pickup();
  },
  { deep: true }
);
onMounted(() => {});
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
