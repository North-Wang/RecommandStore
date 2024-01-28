<template>
  <ul class="flex flex-col items-center select-none" id="homepage">
    <!-- <button @click="addNewStore">新增店家</button> -->
    <li
      class="w-[96%] flex flex-col justify-center items-center mt-4 text-center"
    >
      <h1 class="min-h-[72px] leading-tight whitespace-break-spaces text-start">
        <span v-if="answer.name">{{ answer.name }}</span>
        <span v-else class="text-red-500">沒有匹配的店家</span>
      </h1>
      <ul class="w-full grid grid-cols-1 grid-rows-5 gap-2 justify-center mt-2">
        <li v-for="tags in answer?.addressTag">
          <h5 class="px-3 py-1 rounded-lg bg-slate-200 dark:text-black">
            {{ tags }}
          </h5>
        </li>
      </ul>

      <h3 class="mt-4 text-blue-400 dark:text-yellow-400">
        {{ answer?.category || "- -" }}
      </h3>
      <h5 class="text-blue-400 dark:text-yellow-400">
        {{ answer?.feature || "- -" }}
      </h5>
      <h5 class="text-blue-400 dark:text-yellow-400">
        {{ answer?.purple || "- -" }}
      </h5>
      <div
        class="w-full flex items-center justify-center gap-x-2 mt-2 relative lg:w-full"
      >
        <button
          class="min-h-[54px] border-[0.5px] flex-1 border-white p-2 rounded-l overflow-hidden lg:max-w-[600px]"
        >
          <h5 ref="answerAddress" class="text-start whitespace-wrap px-2">
            {{ answer?.address }}
          </h5>
        </button>
        <i
          class="w-[32px] pi pi-copy relative cursor-pointer"
          style="font-size: 2rem"
          @click.prevent="copyText()"
          v-if="!isMobile"
        >
          <transition>
            <div
              class="absolute right-0 top-[48px] text-white bg-gray-400 dark:bg-gray-400 p-2 px-3 rounded-md z-20 whitespace-nowrap text-[16px]"
              v-if="showSuccessCopy"
            >
              已經複製地址
            </div>
          </transition>
        </i>
      </div>
    </li>
    <h5 class="mt-2">總共匹配到{{ suitableStoreList.length || 0 }}筆資料</h5>

    <h4
      class="h-[80px] w-[80px] bg-blue-400 py-1 rounded-full select-none mt-[80px] text-white cursor-pointer flex items-center justify-center hover:bg-blue-600 lg:mt-[40px]"
      @click="pickup()"
    >
      抽選
    </h4>

    <li class="w-16 mt-4 cursor-pointer relative">
      <i
        class="pi pi-bars"
        style="font-size: 2rem"
        v-if="!showMoreOptions"
        @click.stop="showMoreOptions = true"
      />
      <i
        class="pi pi-bars"
        style="font-size: 2rem"
        v-else
        @click.stop="showMoreOptions = false"
      />
    </li>
    <li class="w-full mb-[40px] flex justify-center overflow-hidden">
      <Transition name="slide">
        <ul
          class="w-[92%] flex flex-col justify-center items-center"
          v-if="showMoreOptions"
          ref="moreOptionDropdown"
        >
          <h4 class="">篩選條件</h4>
          <li class="w-full">
            <input
              type="text"
              placeholder="以地址搜尋"
              v-model="address"
              class="w-full min-h-[48px] p-2 text-center text-4 rounded-lg lg:text-6"
              style="border: 1px solid gray"
            />
          </li>

          <li
            class="w-full grid grid-cols-1 grid-rows-5 gap-2 justify-start mt-2"
          >
            <ul
              v-for="types in allOptions"
              :key="types"
              class="w-full min-h-[48px] px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer text-[black] hover:light:text-white dark:text-white dark:bg-black dark:hover:text-blue"
              style="border: 1px solid gray"
            >
              <AddressTag
                :optionList="storeInfo.allAddressTag"
                :addressTag="selectedAddressTag"
                @update="(option) => (selectedAddressTag = option)"
                v-if="types === '商圈標籤'"
              />
              <Radio
                :title="types"
                :optionList="storeInfo.allTypeOption"
                :vModel="selectedType"
                @update="
                  (radio) => {
                    selectedType = radio;
                  }
                "
                v-if="types === '地點類型'"
              />
              <Checkbox
                :title="types"
                :optionList="storeInfo.allPurpleOption"
                :vModel="allFilterFactor.purple"
                :type="'purple'"
                @update="(list) => (allFilterFactor.purple = list)"
                v-if="types === '目的'"
              />
              <Checkbox
                :title="types"
                :optionList="featureList"
                :vModel="allFilterFactor.feature"
                :type="'feature'"
                @update="(list) => (allFilterFactor.feature = list)"
                v-if="types === '特色'"
              />
              <Checkbox
                :title="types"
                :optionList="storeInfo.allCategoryOption"
                :vModel="allFilterFactor.category"
                :type="'category'"
                @update="(list) => (allFilterFactor.category = list)"
                v-if="types === '地點標籤'"
              />
            </ul>
          </li>
        </ul>
      </Transition>
    </li>
  </ul>
</template>

<script setup>
import {
  ref,
  onMounted,
  watch,
  computed,
  Transition,
  Teleport,
  provide,
} from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";
import { useLoading } from "../store/useLoading";
import { onClickOutside } from "@vueuse/core";
import Radio from "../component/Radio.vue";
import Checkbox from "../component/Checkbox.vue";
import AddressTag from "../component/homepage/AddressTag.vue";
import "animate.css";

import detectiveDarkMode from "../js/detectiveDarkMode.js";
import isMobileDevice from "../js/isMobileDevice.js";

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
const isMobile = isMobileDevice();
const answerAddress = ref(null);
const storeInfo = useStoreInfo();
const loading = useLoading();
const { storeList, titleList, storeListAfterFilterType } =
  storeToRefs(storeInfo);

const featureList = computed(() => {
  const list = ["划算", "老店", "人氣", "久坐", "插座", "特色", "道地", "好吃"];
  return list;
});

const suitableStoreList = ref({}); //符合篩選條件的所有資料
const answer = ref({});

const showSuccessCopy = ref(false);
const showMoreOptions = ref(false);

const address = ref("");
const selectedAddressTag = ref("");
const selectedType = ref("餐廳");
const allFilterFactor = ref({
  //選擇的各種篩選條件
  purple: [],
  feature: [],
  category: [],
});
const allOptions = ref(["商圈標籤", "地點類型", "目的", "特色", "地點標籤"]);
const filterAddress = (address) => {
  suitableStoreList.value = storeListAfterFilterType.value.filter((store) => {
    return store.address.includes(address);
  });
};
const filterAddressTag = (tag) => {
  suitableStoreList.value = storeListAfterFilterType.value.filter((store) => {
    return store.addressTag.includes(tag);
  });
};
const filterMultiOptionInTheFactor = (factor) => {
  //篩選同種篩選條件，多種選項
  suitableStoreList.value = suitableStoreList.value.filter((store) => {
    const isMatch = allFilterFactor.value[factor].some((option) => {
      return store[factor].indexOf(option) != -1;
    });
    return isMatch;
  });
};
const filterStore = async function (filterGroup) {
  if (filterGroup.purple.length) filterMultiOptionInTheFactor("purple");
  if (filterGroup.feature.length) filterMultiOptionInTheFactor("feature");
  if (filterGroup.category.length) filterMultiOptionInTheFactor("category");
  console.log("符合條件的店家名單", suitableStoreList.value);
};

const copyText = async function (text) {
  showSuccessCopy.value = true;
  const address = answerAddress.value.innerText;
  navigator.clipboard.writeText(address);
  setTimeout(() => {
    showSuccessCopy.value = false;
  }, 2000);
};
const resetOption = () => {
  //清空已經選擇的選項
  selectedAddressTag.value = "";
  allFilterFactor.value.purple = [];
  allFilterFactor.value.feature = [];
  allFilterFactor.value.category = [];
};
const pickup = () => {
  const randomNumber = Math.floor(
    Math.random() * suitableStoreList.value.length
  );
  console.log("符合篩選條件的所有店家", suitableStoreList.value);
  const result = suitableStoreList.value[randomNumber];
  if (result) {
    // console.log("抽選結果", result);
    answer.value = result;
  } else {
    //沒有匹配的結果
    answer.value = {};
  }
  loading.isLoading = false;
};
watch(titleList, (newTitleList) => {
  /* first time pick up when open the webstie */
  suitableStoreList.value = storeListAfterFilterType.value;
  pickup();
});
watch(storeListAfterFilterType, (list) => {
  //監聽到pinia 根據type篩選完成之後的店家資料
  suitableStoreList.value = list;
});
watch(selectedType, async function (type) {
  //type 改變之後
  await storeInfo.filterStoreByType(type);
  storeInfo.setAllOption();
  resetOption();
  pickup();
});
watch(
  allFilterFactor,
  async (filterGroup, oldGroup) => {
    console.log("watch 篩選條件", filterGroup);

    if (
      filterGroup.purple.length === 0 &&
      filterGroup.feature.length === 0 &&
      filterGroup.category.length === 0
    ) {
      await storeInfo.filterStoreByType(selectedType.value);
    } else {
      suitableStoreList.value = storeListAfterFilterType.value; //reset
      await filterStore(filterGroup);
    }
    pickup();
  },
  { deep: true }
);
watch(address, async function (val) {
  if (val != "") {
    console.log("watch 搜尋地址", val);
    selectedAddressTag.value = ""; //reset
    await resetOption();
    filterAddress(val);
  }
});
watch(selectedAddressTag, async function (tag) {
  console.log("watch 商圈標籤", tag);
  if (tag === "") {
    await storeInfo.filterStoreByType(selectedType.value);
  } else {
    address.value = ""; //reset
    await storeInfo.filterStoreByType(selectedType.value);
    await storeInfo.filterStoreByAddressTag(tag);
  }
  await storeInfo.setAllOption();
  pickup();
});
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

input[type="radio"]:checked {
  background-color: blue !important;
  color: white;
  div {
    background-color: blue !important;
  }
}
.slide-enter-active {
  transition: all 0.5s ease;
}
.slide-leave-active {
  transition: all 0.5s ease-in;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
