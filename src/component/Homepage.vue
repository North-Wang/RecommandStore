<template>
  <div>
    <div class="text-3xl font-bold underline">首頁</div>
    <button @click="addNewStore">新增店家</button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";

const addNewStore = async function () {
  const newStore = {
    name: "北大荒水餃店",
    type: "日式",
    peopleLimit: "10",
    purple: "普通吃飯",
    lowPrice: "60",
    highPrice: "300",
    address: "115台北市南港區南港路一段201號",
    feature: "划算",
    category: "滷味,水餃",
  };
  const config = {
    method: "Post",
    body: newStore,
  };
  const url =
    "https://script.google.com/macros/library/d/1vFlvViGJaZRYNHJygvz9ImyQsZV38dszpYS6kgH1i_g-EMHSn4-S69OX/1";
  // fetch(url, config)
  //   .then((response) => response.json())
  //   .then((result) => {
  //     if (result === "success") {
  //       alert("資料已成功送出，我們下次見~");
  //     }
  //   })
  //   .catch((error) => console.log("error", error));
  axios.post(url, newStore).then((result) => {
    console.log("result", result);
  });
};
</script>
<style scoped></style>
