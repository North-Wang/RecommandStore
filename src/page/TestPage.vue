<template>
  <ul>
    <li>test</li>
    <button @click="addStore">送出</button>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const testStore = ref({
  name: "測試用店家",
  type: "日式",
  address: "115台北市南港區南港路一段201號",
  feature: "划算",
  category: "滷味,水餃",
  purple: "普通吃飯",
  tag: "划算、吃飽",
  權重: 1,
});
const url = ref(
  "https://script.google.com/macros/s/AKfycbx-XiVtX2xlSdyIlfF7CoAsBau8Q6rJ4gQtMJeMG0gA0De4Tr_rojqBE-egZEw2u7xsFQ/exec"
);
console.log("google script:", url.value);
function addStore() {
  const data = {
    redirect: "follow",
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(testStore.value),
  };
  try {
    axios.post(url.value, data).then((res) => {
      console.log("res", res);
    });
  } catch (error) {
    console.log("連線有誤", error);
  }
}
</script>

<style scoped></style>
