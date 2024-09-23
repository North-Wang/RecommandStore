/** 所有篩選條件選項 */
import { defineStore } from "pinia";

export const useOptionInfo = defineStore({
  id: "storeInfo",
  state: () => ({
    titleList: [], //所有標題
    allTypeOption: [], //所有type
    allPurpleOption: [], //所有"目的"
    allFeatureOption: [],
    allCategoryOption: [],
    allAddressTag: [], //所有的商圈標籤
  }),
  actions: {
    /* 設定所有type */
    setTypeOption() {
      const allType = new Set();
      this.storeRawData.forEach((store) => {
        if (store.type.trim() === "") {
          //排除空值
          return;
        }
        if (!allType.has(store.type)) {
          allType.add(store.type);
        }
      });
      this.allTypeOption = Array.from(allType);
    },
  },
});
