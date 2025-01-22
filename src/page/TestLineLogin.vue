<template>
  <div class="p-4 grid grid-cols-2 grid-rows-2">
    <button @click="lineLogin">Line 登入</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

async function lineLogin() {
  const channelId = import.meta.env.VITE_LINE_PAY_CHANNEL_ID;
  const callbackUrl = import.meta.env.VITE_line_pay_callback_url;
  const state = Math.random().toString(36).substring(2, 15); // 隨機 state 值
  const scope = "profile%20openid%20email";
  const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelId}&redirect_uri=${callbackUrl}&state=${state}&scope=${scope}&nonce=09876xyz`;
  window.location.href = lineAuthUrl;
}

onMounted(() => {});
</script>

<style scoped lang="scss">
button {
  width: 100px;
  background-color: #06c755;
  color: white;
  &:active,
  &:hover {
    background-color: (0, 0, 0, 0.3);
    background-color: #06c755;
  }
}
</style>
