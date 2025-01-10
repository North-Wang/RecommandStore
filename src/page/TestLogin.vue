<template>
  <div class="p-4 grid grid-cols-2 grid-rows-2">
    <a :href="lineLoginUrl">Line 登入</a>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const lineLoginUrl = computed(() => {
  const channelId = 2006738100;
  const callbackUrl = "https://test-versel-rho.vercel.app/LineCallBackUrl.php";
  const generateState = () => Math.random().toString(36).substring(2, 15);
  const state = generateState();
  const timeStamp = new Date().getTime();
  return `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelId}&redirect_uri=${callbackUrl}&state=${timeStamp}&scope=profile%20openid&nonce=09876xyz`;
});

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
