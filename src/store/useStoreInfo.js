import { defineStore } from "pinia";

export const useStoreInfo = defineStore({
  id: "storeInfo",
  state: () => ({
    storeList: ["default"], //全部的店家資料
    titleList: [], //所有標題
    allPurpleOption: [],
    allTypeOption: [],
    allFeatureOption: [],
    allAddressOption: [],
  }),
  actions: {
    getTheColumnAllOptions(columnName) {
      if (!columnName) {
        return;
      }

      switch (columnName) {
        case "purple":
          if (this.allPurpleOption.length === 0) {
            this.setPurpleOption();
          }
          break;
        case "type":
          if (this.allTypeOption.length === 0) {
            this.setTypeOption();
          }
          break;
        default:
          console.warn("undefined type:", columnName);
          break;
      }
    },
    setAllOption() {
      const allPurple = new Set();
      const allType = new Set();
      const allFeature = new Set();
      const allAddress = new Set();

      this.storeList.forEach((store) => {
        if (!allPurple.has(store.purple)) {
          allPurple.add(store.purple);
        }
        if (!allType.has(store.type)) {
          allType.add(store.type);
        }
        if (!allFeature.has(store.feature)) {
          allFeature.add(store.feature);
        }
        if (!allAddress.has(store.address)) {
          allAddress.add(store.address);
        }
      });

      this.allPurpleOption = Array.from(allPurple);
      this.allTypeOption = Array.from(allType);
      this.allFeatureOption = Array.from(allFeature);
      this.allAddressOption = Array.from(allAddress);
      console.log("all purple", this.allPurpleOption);
      console.log("all type", this.allTypeOption);
      console.log("all feature", this.allFeatureOption);
      // console.log("all address",this.allAddressOption, )
    },
  },
  persist: true,
});
