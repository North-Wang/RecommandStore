<!-- 篩選器彈窗 -->
<template>
  <Teleport to="body">
    <ul class="wrapper-filter">
      <li class="px-[12px] py-[12px]" style="border-bottom: 1px solid white">
        <img
          :src="iconX"
          alt="x"
          class="w-[30px] h-[32px] cursor-pointer"
          @click.self="closeModal"
        />
      </li>
      <h3 class="container text-center">
        總共有{{ storeListAfterFilterType.length || "- -" }}筆資料符合
      </h3>
      <li class="container">
        <h3 class="title">LOCATION 地點</h3>
        <ul class="">
          <li></li>
        </ul>
      </li>
      <li class="container">
        <h3 class="title">SHOPPING AREA 商圈標籤</h3>
        <ul>
          <li></li>
        </ul>
      </li>
      <li class="container">
        <h3 class="title">PURPLE 目的</h3>
        <ul>
          <li></li>
        </ul>
      </li>
      <li class="container">
        <h3 class="title">FEATURE 特色</h3>
        <ul>
          <li></li>
        </ul>
      </li>
      <li class="container">
        <h3 class="title">TYPES 種類</h3>
        <ul>
          <li></li>
        </ul>
      </li>
      <li
        class="w-screen px-[20px] py-[24px] text-white flex justify-between fixed bottom-[76px]"
      >
        <button class="bg-red">確認</button>
        <button class="bg-white text-red" @click.self="closeModal()">
          取消
        </button>
      </li>
    </ul>
  </Teleport>
</template>

<script setup>
import { ref, Teleport, defineEmits } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "../store/useStoreInfo";

//picture
import iconX from "../assets/X.svg";

const emits = defineEmits(["closeModal"]);

const storeInfo = useStoreInfo();
const { storeListAfterFilterType } = storeToRefs(storeInfo);

function closeModal() {
  console.log("關閉彈窗");
  emits("closeModal");
}
</script>

<style scoped lang="scss">
.wrapper-filter {
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  z-index: 50;
  .container {
    padding: 24px 20px;
    border-bottom: 1px solid white;
    background-color: rgba(0, 0, 0, 1);
    .title {
      font-family: "Francois One", "Arial Narrow", Arial, sans-serif;
    }
    > ul {
      display: grid;
    }
  }
}
button {
  width: 144px;
}
</style>
