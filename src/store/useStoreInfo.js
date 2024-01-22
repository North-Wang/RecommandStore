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
    setAllOption() {
      const allPurple = new Set();
      // const allFeature = new Set();
      const allAddress = new Set();
      const allCategory = new Set();
      const allAddressTag = new Set();

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
          if (!allPurple.has(item)) {
            allPurple.add(item);
          }
        });
        //get all category options
        const categoryArray = store.category.split(/[,，、]/);
        categoryArray.forEach((item) => {
          if (!allCategory.has(item)) {
            allCategory.add(item);
          }
        });
        //get all address tag options
        store.addressTag.forEach((item) => {
          if (item === "") return;
          if (!allAddressTag.has(item)) {
            allAddressTag.add(item);
          }
        });
      });

      this.allPurpleOption = Array.from(allPurple);
      // this.allFeatureOption = Array.from(allFeature);
      this.allAddressOption = Array.from(allAddress);
      this.allCategoryOption = Array.from(allCategory);
      this.allAddressTag = Array.from(allAddressTag);
    },
  },
  persist: true,
});
