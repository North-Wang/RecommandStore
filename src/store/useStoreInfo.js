import { defineStore } from "pinia";

export const useStoreInfo = defineStore({
  id: "storeInfo",
  state: () => ({
    storeList: ["default"], //全部的店家資料
    titleList:[] //所有標題
  }),
  actions: {
    
  },
  persist: true,
});
