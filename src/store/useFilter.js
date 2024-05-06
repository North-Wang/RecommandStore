// 儲存已經選擇的篩選條件
import { defineStore } from "pinia";
import { useStoreInfo } from "./useStoreInfo";

export const useFilter = defineStore({
  id: "filterInfo",
  state: () => ({
    type: "",
    addressTag: "",
    purple: "",
    feature: [],
    category: [],
  }),
  action: {
    //根據state的所有篩選條件進行篩選
    // returnFilterAns() {
    //   //如果沒有選擇任何條件，
    //   if (
    //     this.purple === "" &&
    //     !this.addressTag.length &&
    //     !this.feature.length &&
    //     !this.category.length
    //   ) {
    //     return storeListAfterFilterType.value;
    //   }
    //   const ans = storeList.value.filter((item) => {
    //     //如果有選擇addressTag
    //     let matchAddressTag = true;
    //     if (this.addressTag !== "") {
    //       matchAddressTag = item.addressTag.indexOf(this.addressTag) != -1;
    //       // console.log("比較商圈", matchAddressTag);
    //     }
    //     //如果有選擇purple
    //     let matchPurple = true;
    //     if (purple.value !== "") {
    //       matchPurple = item.purple.split(/[,，、]/).some((str) => {
    //         return str == purple.value;
    //       });
    //     }
    //     //如果有選擇feature
    //     let matchFeature = true;
    //     if (category.value.length !== 0) {
    //       matchFeature = item.feature.split(/[,，、]/).some((str) => {
    //         return feature.value.includes(str);
    //       });
    //     }
    //     //如果有選擇category
    //     let matchCategory = true;
    //     if (category.value.length !== 0) {
    //       matchCategory = item.category.split(/[,，、]/).some((str) => {
    //         return category.value.includes(str);
    //       });
    //     }
    //     //回傳同時符合上述篩選條件的
    //     return matchAddressTag && matchPurple && matchFeature && matchCategory;
    //   });
    //   matchStore.value = ans;
    //   return ans;
    // },
  },
  // persist: true,
});
