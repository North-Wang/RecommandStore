import { defineStore } from "pinia";

export const useStoreInfo = defineStore({
  id: "storeInfo",
  state: () => ({
    storeList: [], //全部的店家資料
    storeListAfterFilterType: [], //篩選完type的店家資料
    matchStore: [], //符合所有篩選條件的店家,

    titleList: [], //所有標題
    allTypeOption: [], //所有type
    allPurpleOption: [], //所有"目的"
    allFeatureOption: [],
    allCategoryOption: [],
    allAddressTag: [], //所有的商圈標籤
  }),
  actions: {
    filterType(type) {
      //根據type來決定其他option要出現出現什麼選項
      //因為變更的次數較少，所以更新時會重新篩選storeList，以減少其他選項要篩選的資料筆數
      this.storeListAfterFilterType = this.storeList.filter((store) => {
        return store.type === type;
      });
    },
    setTypeOption() {
      const allType = new Set();
      this.storeList.forEach((store) => {
        if (!allType.has(store.type)) {
          allType.add(store.type);
        }
      });
      this.allTypeOption = Array.from(allType);
      // console.log("all type", this.allTypeOption);
    },
    setAddressTag() {
      const allAddressTag = new Set();
      this.storeListAfterFilterType.forEach((store) => {
        store.addressTag.forEach((item) => {
          if (item === "") return;
          if (!allAddressTag.has(item)) {
            allAddressTag.add(item);
          }
        });
      });
      this.allAddressTag = Array.from(allAddressTag);
    },
    setAllOption() {
      const allPurple = new Set();
      // const allAddress = new Set();
      const allFeature = new Set();
      const allCategory = new Set();

      this.storeListAfterFilterType.forEach((store) => {
        //get all purple options
        const purpleArray = store.purple.split(/[,，、]/);
        purpleArray.forEach((item) => {
          if (item === "") return;
          if (!allPurple.has(item)) {
            allPurple.add(item);
          }
        });

        //get all feature options
        const featureArray = store.feature.split(/[,，、]/);
        featureArray.forEach((item) => {
          if (item === "") return;
          if (!allFeature.has(item)) {
            allFeature.add(item);
          }
        });

        //get all category options
        const categoryArray = store.category.split(/[,，、]/);
        categoryArray.forEach((item) => {
          if (item === "") return;
          if (!allCategory.has(item)) {
            allCategory.add(item);
          }
        });
      });

      this.allPurpleOption = Array.from(allPurple);
      // this.allAddressOption = Array.from(allAddress);
      this.allFeatureOption = Array.from(allFeature);
      this.allCategoryOption = Array.from(allCategory);
    },
  },
  persist: true,
});
