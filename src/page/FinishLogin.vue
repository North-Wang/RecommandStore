<template>
  <div class="p-4 grid grid-cols-2 grid-rows-2">
    <div>完成登入</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const getToken = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const state = urlParams.get("state");

  if (!code) {
    error.value = "缺少授權碼";
    return;
  }

  try {
    const response = await axios.post("https://example.com/api/auth/line", {
      code,
      state,
    });
    console.log("用戶資料:", response.data);

    // 重定向到其他分頁，例如用戶主頁
    window.location.href = "/home";
  } catch (err) {
    error.value = "授權處理失敗";
  }
};
onMounted(() => {
  getToken();
});
</script>
