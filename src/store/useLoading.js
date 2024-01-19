import { defineStore } from "pinia";

export const useLoading = defineStore({
  id: "loading",
  state: () => ({
    isLoading: false,
  }),
  action: {},
  persist: true,
});
