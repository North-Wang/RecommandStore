<template>
  <header
    class="w-dvw gap-x-5 bg-gradient-to-b from-[#062d4b] to-[#045588] text-base select-none"
  >
    <ul ref="filterBar">
      <img
        :src="moreOptionWhite"
        alt="更多選項"
        class="w-[32px] absolute left-3 top-[15px] rotate-90 cursor-pointer"
        @click="showFilterBar = !showFilterBar"
        v-if="showIcon"
      />
      <Transition
        enter-active-class="animate__animated animate__slideInLeft animate__faster"
        leave-active-class="animate__animated animate__slideOutLeft animate__faster"
      >
        <FilterBar v-show="showFilterBar" @closeModal="showFilterBar = false" />
      </Transition>
    </ul>

    <ul class="flex gap-4">
      <div v-for="route in routerList" :key="route">
        <router-link :to="route.path" class="select-none">
          <span class="text-white select-none">{{ route.name }}</span>
        </router-link>
      </div>
    </ul>

    <ul class="relative" ref="languageElement">
      <img
        :src="langWhite"
        alt="earth"
        class="w-[32px] aspect-square cursor-pointer"
        @click="showLanguage = !showLanguage"
      />
      <div class="wrapper-lang" v-if="showLanguage">
        <select v-model="$i18n.locale">
          <option
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
            class="option-lang"
          >
            {{ langObj[locale] || "" }}
          </option>
        </select>
      </div>
    </ul>
  </header>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  watch,
  computed,
  Transition,
  Teleport,
} from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

import FilterBar from "./FilterBar.vue";
import { onClickOutside } from "@vueuse/core";

//picture
import moreOptionBlack from "../assets/moreOptionBlack.svg";
import moreOptionWhite from "../assets/moreOptionWhite.svg";
import langBlack from "../assets/header/languageBlack.svg";
import langWhite from "../assets/header/languageWhite.svg";

const route = useRoute();
const { t, locale } = useI18n({
  inheritLocale: true,
  useScope: "global",
});
const showIcon = computed(() => {
  switch (route.path) {
    case "/ContactMe":
      return false;

    default:
      return true;
  }
});
const filterBar = ref(null);
const languageElement = ref(null);
const lang = ref(locale.value);
const showFilterBar = ref(false);
const showLanguage = ref(false);
onClickOutside(filterBar, () => {
  showFilterBar.value = false;
});
onClickOutside(languageElement, () => {
  showLanguage.value = false;
});

const routerList = ref([
  {
    path: "/",
    name: computed(() => {
      return t("header.home");
    }),
    key: "home",
  },
  // { path: "/", name: "測驗跳選", key: "testPage" },
  {
    path: "/StoreListTable",
    name: computed(() => {
      return t("header.storeList");
    }),
    key: "storeList",
  },
  // {
  //   path: "/ContactMe",
  //   name: computed(() => {
  //     return t("header.contactUs");
  //   }),
  //   key: "contactUs",
  // },
]);

const langObj = ref({
  en: "English",
  zh_tw: "繁體中文",
});

//儲存選擇的語言種類
watch(lang, (val) => {
  locale.value = val;
  sessionStorage.setItem("lang", lang.value);
});
</script>

<style scoped lang="scss">
header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // position: fixed;
  padding: 0 20px;
  top: 0;
  left: 0;
  z-index: 60;
}

.option-lang {
  padding: 2px 6px;
}
.wrapper-lang {
  position: absolute;
  right: 0;
  top: 32px;
  > select {
    margin-top: 8px;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      outline: none;
    }
    > option {
      cursor: pointer;
    }
  }
}
</style>
