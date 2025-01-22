<template>
  <div class="p-4 grid grid-cols-2 grid-rows-2">
    <div class="w-[100px]" v-if="Object.values(profile).length">
      <span>歡迎您! {{ profile?.name }}</span>
      <img
        :src="profile?.picture"
        :alt="profile?.name"
        class="rounded-full w-[100px] m-4"
      />
      <button class="w-[160px]">
        <a href="/auth/Login">回到Line登入頁</a>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const channelId = import.meta.env.VITE_LINE_PAY_CHANNEL_ID;
const channelSecret = import.meta.env.VITE_line_pay_channel_secret;
const callbackUrl = import.meta.env.VITE_line_pay_callback_url;
const profile = ref({});

async function getToken() {
  try {
    const response = await axios.post(
      "https://api.line.me/oauth2/v2.1/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: route.query.code,
        redirect_uri: callbackUrl, // 必須與 Line 平台設定一致
        client_id: channelId,
        client_secret: channelSecret,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // 設定正確的 Content-Type
        },
      }
    );

    console.log("Access Token:", response.data);
    if (response.data.id_token) {
      getProfile(response.data.id_token);
    }
  } catch (error) {
    if (error.response) {
      console.error("Failed to exchange token:", error.response.data);
    } else {
      console.error("Error occurred:", error);
    }
  }
}

async function getProfile(idToken) {
  const url = `https://api.line.me/oauth2/v2.1/verify/?id_token=${idToken}&client_id=${channelId}`;
  try {
    const res = await axios.post(url);
    console.log("取得profile", res);
    profile.value = res.data;
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

onMounted(() => {
  getToken();
});
</script>
