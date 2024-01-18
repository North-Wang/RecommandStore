import { defineStore } from "pinia";

export const useStoreInfo = defineStore({
  id: "storeInfo",
  state: () => ({
    storeList: ["default"], //全部的店家資料
    StoreListAfterFilterType: [], //篩選完的店家資料
    titleList: [], //所有標題
    allTypeOption: [],
    allPurpleOption: [],
    allFeatureOption: [],
    allAddressOption: [],
    allCategoryOption: [],
  }),
  actions: {
    filterStoreType(type = "餐廳") {
      //type改變時，要重新調整各個項目出現的選項
      this.StoreListAfterFilterType = this.storeList.filter((store) => {
        return store.type === type;
      });
      this.setAllOption();
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
      const allFeature = new Set();
      const allAddress = new Set();
      const allCategory = new Set();

      this.StoreListAfterFilterType.forEach((store) => {
        if (!allPurple.has(store.purple)) {
          allPurple.add(store.purple);
        }
        if (!allFeature.has(store.feature)) {
          allFeature.add(store.feature);
        }
        if (!allAddress.has(store.address)) {
          allAddress.add(store.address);
        }

        //get all category options
        const categoryArray = store.category.split(/[,，、]/);
        categoryArray.forEach((item) => {
          if (!allCategory.has(item)) {
            allCategory.add(item);
          }
        });
      });

      this.allPurpleOption = Array.from(allPurple);
      this.allFeatureOption = Array.from(allFeature);
      this.allAddressOption = Array.from(allAddress);
      this.allCategoryOption = Array.from(allCategory);
      // console.log("all purple", this.allPurpleOption);
      // console.log("all feature", this.allFeatureOption);
      // console.log("all address",this.allAddressOption, )
      // console.log("all category", this.allCategoryOption);
    },
  },
  persist: true,
});
