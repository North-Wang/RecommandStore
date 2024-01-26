import { defineStore } from "pinia";

export const useStoreInfo = defineStore({
  id: "storeInfo",
  state: () => ({
    storeList: [], //全部的店家資料
    storeListAfterFilterType: [], //篩選完的店家資料
    titleList: [], //所有標題
    allTypeOption: [],
    allPurpleOption: [],
    // allFeatureOption: [],
    allAddressOption: [],
    allCategoryOption: [],
    allAddressTag: [], //所有的商圈標籤
  }),
  actions: {
    filterStoreByType(type) {
      //根據type來決定其他option要出現出現什麼選項
      //因為變更的次數較少，所以更新時會重新篩選storeList，以減少其他選項要篩選的資料筆數
      this.storeListAfterFilterType = this.storeList.filter((store) => {
        return store.type === type;
      });
    },
    filterStoreByAddressTag(tag) {
      //根據商圈標籤來決定其他option要出現出現什麼選項
      //因為變更的次數較少，所以更新時會重新篩選storeList，以減少其他選項要篩選的資料筆數
      if (tag === "" || !tag) return;
      this.storeListAfterFilterType = this.storeListAfterFilterType.filter(
        (store) => {
          return store.addressTag.includes(tag);
        }
      );
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
      // const allFeature = new Set();
      const allAddress = new Set();
      const allCategory = new Set();

      this.storeListAfterFilterType.forEach((store) => {
        //get all feature options
        // if (!allFeature.has(store.feature)) {
        //   allFeature.add(store.feature);
        // }
        //get all address options
        if (!allAddress.has(store.address)) {
          allAddress.add(store.address);
        }

        //get all purple options
        const purpleArray = store.purple.split(/[,，、]/);
        purpleArray.forEach((item) => {
          if (item === "") return;
          if (!allPurple.has(item)) {
            allPurple.add(item);
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
      // this.allFeatureOption = Array.from(allFeature);
      this.allAddressOption = Array.from(allAddress);
      this.allCategoryOption = Array.from(allCategory);
    },
  },
  persist: true,
});
