import { defineStore } from "pinia";

export const useStoreInfo = defineStore({
  id: "storeInfo",
  state: () => ({
    storeRawData: [], //全部的店家資料
    storeTemporary: [], //篩選完type和商圈標籤的店家資料
    storeResult: [], //符合所有篩選條件的店家,

    titleList: [], //所有標題
    allTypeOption: [], //所有type
    allPurpleOption: [], //所有"目的"
    allFeatureOption: [],
    allCategoryOption: [],
    allAddressTag: [], //所有的商圈標籤
  }),
  actions: {
    /**
     * 篩選type
     * @param {String} type 種類
     * @description 因為type的變更次數少，所以更新時會重新篩選storeList，以減少要篩選的資料筆數
     */
    filterType(type) {
      this.storeTemporary = this.storeRawData.filter((store) => {
        return store.type === type;
      });
    },
    /**
     * 篩選商圈標籤
     * @param {String} addressTag 商圈標籤
     */
    filterAddressTag(addressTag) {
      console.log("篩選商圈標籤");
      this.storeTemporary = this.storeRawData.filter((store) => {
        return store?.addressTag.includes(addressTag);
      });
    },
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
    /* 設定所有商圈標籤 */
    setAddressTag() {
      const allAddressTag = new Set();
      this.storeTemporary.forEach((store) => {
        store.addressTag.forEach((item) => {
          if (item.trim() === "") return;
          if (!allAddressTag.has(item)) {
            allAddressTag.add(item);
          }
        });
      });
      this.allAddressTag = Array.from(allAddressTag);
    },
    /**
     * 設定所有【目的】【特色】【種類】
     * @description 當商圈標籤變更時，要顯示該商圈標籤的【目的】、【特色】、【種類】
     */
    setAllOption() {
      const defaultCategory = [
        "驅寒",
        "避暑",
        "台式",
        "日式",
        "中式",
        "韓式",
        "墨西哥菜",
        "印度式",
        "美式",
        "越式",
        "義式",
        "馬來西亞",
        "港式",
      ];
      const allPurple = new Set();
      const allFeature = new Set();
      const allCategory = new Set(defaultCategory);

      this.storeTemporary.forEach((store) => {
        //get all purple options
        const purpleArray = store.purple.split(/[,，、]/);
        purpleArray.forEach((item) => {
          if (item.trim() === "") return;
          if (!allPurple.has(item)) {
            allPurple.add(item);
          }
        });

        //get all feature options
        const featureArray = store.feature.split(/[,，、]/);
        featureArray.forEach((item) => {
          if (item.trim() === "") return;
          if (!allFeature.has(item.trim())) {
            allFeature.add(item.trim());
          }
        });

        //get all category options
        const categoryArray = store.category.split(/[,，、]/);
        categoryArray.forEach((item) => {
          if (item.trim() === "") return;
          if (!allCategory.has(item.trim())) {
            allCategory.add(item.trim());
          }
        });
      });

      this.allPurpleOption = Array.from(allPurple);
      this.allFeatureOption = Array.from(allFeature);
      this.allCategoryOption = Array.from(allCategory);
    },
  },
  persist: true,
});
