<template>
  <ul class="flex flex-col items-center" id="homepage">
    <!-- <button @click="addNewStore">新增店家</button> -->
    <li
      class="w-[96%] flex flex-col justify-center items-center mt-4 text-center"
    >
      <h1 class="h-[72px] leading-tight whitespace-break-spaces text-start">
        {{ lotteryResult?.name }}
        <span v-if="lotteryResult?.name === undefined" class="text-red-500"
          >沒有匹配的店家</span
        >
      </h1>
      <h3 class="mt-4 text-blue-400 dark:text-yellow-400">
        {{ lotteryResult?.category || "- -" }}
      </h3>
      <h5 class="text-blue-400 dark:text-yellow-400">
        {{ lotteryResult?.feature || "- -" }}
      </h5>
      <div
        class="w-full flex items-center justify-center gap-x-2 mt-2 relative lg:w-full"
      >
        <button
          class="min-h-[54px] border-[0.5px] flex-1 border-white p-2 rounded-l overflow-hidden lg:max-w-[600px]"
        >
          <h5 ref="answerAddress" class="text-start whitespace-wrap px-2">
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
              v-if="showSuccessCopy && !isMobile"
            >
              已經複製地址
            </div>
          </transition>
        </i>
      </div>
    </li>
    <h5 class="mt-2">總共匹配到{{ suitableStoreList.length || 0 }}筆資料</h5>

    <h4
      class="h-[80px] w-[80px] bg-blue-400 py-1 rounded-full select-none text-white mt-[80px] cursor-pointer flex items-center justify-center hover:bg-blue-600 lg:mt-[40px]"
      @click="pickup()"
    >
      抽選
    </h4>

    <li
      class="w-16 mt-4 cursor-pointer relative"
      @click="showMoreOptions = !showMoreOptions"
    >
      <i class="pi pi-bars" style="font-size: 2rem" />
    </li>
    <li class="w-full mb-[40px] flex justify-center overflow-hidden">
      <Transition
        name="slide"
        enter-active-class="animate__animated animate__fadeInDown animate__fast"
        leave-active-class="animate__animated animate__fadeOutUp"
      >
        <ul
          class="w-[92%] flex flex-col justify-center items-center"
          v-if="showMoreOptions"
          ref="moreOptionDropdown"
        >
          <h4 class="">篩選條件</h4>
          <li
            class="w-full grid grid-cols-1 grid-rows-5 gap-2 justify-start mt-2"
          >
            <ul
              v-for="types in filterButtonList"
              :key="types"
              class="w-full px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer text-[black] hover:light:text-white dark:text-white dark:bg-black dark:hover:text-blue"
              style="border: 1px solid gray"
            >
              <Radio
                :title="types"
                :optionList="storeInfo.allTypeOption"
                :vModel="selectedType"
                @update="
                  (option) => {
                    selectedType = option;
                  }
                "
                v-if="types === '地點類型'"
              />
              <CheckboxOption
                :title="types"
                :optionList="storeInfo.allPurpleOption"
                :vModel="allFilterFactor.purple"
                v-if="types === '目的'"
              />
              <CheckboxOption
                :title="types"
                :optionList="featureList"
                :vModel="allFilterFactor.feature"
                v-if="types === '特色'"
              />
              <CheckboxOption
                :title="types"
                :optionList="storeInfo.allCategoryOption"
                :vModel="allFilterFactor.category"
                @update=""
                v-if="types === '種類'"
              />
            </ul>
          </li>
        </ul>
      </Transition>
    </li>
  </ul>

  <!-- <Teleport to="#homepage">
    <ul
      class="w-screen h-screen bg-slate-500 absolute top-0 left-0 opacity-50"
      v-if="showOptionModal"
    >
      <li class="text-white">彈窗</li>
    </ul>
  </Teleport> -->
</template>

<script setup>
import { ref, onMounted, watch, computed, Transition, Teleport } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import { useLoading } from "../store/useLoading";
import { onClickOutside } from "@vueuse/core";
import Radio from "../component/Radio.vue";
import CheckboxOption from "../component/CheckboxOption.vue";
import "animate.css";

import detectiveDarkMode from "../js/detectiveDarkMode.js";

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
const loading = useLoading();
const { storeList, StoreListAfterFilterType } = storeToRefs(storeInfo);

const featureList = computed(() => {
  const list = ["划算", "老店", "人氣", "久坐", "插座", "特色", "道地", "好吃"];
  return list;
});

const suitableStoreList = ref({}); //符合篩選條件的所有資料
const lotteryResult = ref({});

const showSuccessCopy = ref(false);
const showMoreOptions = ref(false);
const showOptionModal = ref(false);

const selectedType = ref("餐廳");
const allFilterFactor = ref({
  //選擇的各種篩選條件
  purple: [],
  feature: [],
  category: [],
});
const selectedFeatureList = ref([]);
const selectedCategoryList = ref([]);
const filterButtonList = computed(() => {
  switch (selectedType.value) {
    default:
      return ["地點類型", "目的", "特色", "種類"];
  }
});
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
  //set has selected feature
  selectedFeatureList.value = allFilterFactor.value.feature;
};
const filterCategory = (factorList) => {
  suitableStoreList.value = suitableStoreList.value.filter((store) => {
    const isMatch = allFilterFactor.value.category.some((category) => {
      return store.category.indexOf(category) != -1;
    });
    return isMatch;
  });
  //set has selected category
  selectedCategoryList.value = allFilterFactor.value.category;
};
const filterAllFactor = async function (filterGroup) {
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
  showSuccessCopy.value = true;
  console.log("text：", answerAddress.value.innerText);
  const address = answerAddress.value.innerText;
  navigator.clipboard.writeText(address);
  setTimeout(() => {
    showSuccessCopy.value = false;
  }, 2000);
};
const pickup = () => {
  console.log("抽選的資料總筆數", StoreListAfterFilterType.value.length);
  const randomNumber = Math.floor(
    Math.random() * suitableStoreList.value.length
  );
  const answer = suitableStoreList.value[randomNumber];
  if (!answer) {
    console.warn("沒有匹配的結果");
  }
  console.log("抽選結果", answer);
  lotteryResult.value = answer || {};
  loading.isLoading = false;
};
watch(StoreListAfterFilterType, (list) => {
  suitableStoreList.value = list;
});
watch(selectedType, async function (type) {
  console.log("watch type change", type);
  allFilterFactor.value.category = [];
  await storeInfo.filterStoreType(type);
  pickup();
});
watch(
  allFilterFactor,
  async (filterGroup, oldGroup) => {
    console.log("watch 篩選條件", filterGroup);

    if (filterGroup.category.length === 0) {
      selectedCategoryList.value = []; //reset
    }
    if (
      filterGroup.purple.length === 0 &&
      filterGroup.feature.length === 0 &&
      filterGroup.category.length === 0
    ) {
      console.log("沒有選擇篩選條件");
    } else {
      await filterAllFactor(filterGroup);
    }
    pickup();
  },
  { deep: true }
);
onMounted(() => {
  suitableStoreList.value = StoreListAfterFilterType.value;
  pickup();
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

input[type="radio"]:checked {
  background-color: blue !important;
  color: white;
  div {
    background-color: blue !important;
  }
}
</style>
