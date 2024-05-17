// 儲存已經選擇的篩選條件
import { defineStore } from "pinia";

export const useFilter = defineStore({
  id: "filterInfo",
  state: () => ({
    type: "",
    addressTag: "",
    purple: "",
    feature: [],
    category: [],
  }),
  action: {},
  // persist: true,
});
