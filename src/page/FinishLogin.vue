<template>
  <div class="p-4 grid grid-cols-2 grid-rows-2">
    <div>完成登入</div>
    <button>
      <a href="/TestLineLogin">回到Line登入頁</a>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

async function getToken() {
  const channelId = import.meta.env.VITE_LINE_PAY_CHANNEL_ID;
  const channelSecret = import.meta.env.VITE_line_pay_channel_secret;
  try {
    const response = await axios.post(
      "https://api.line.me/oauth2/v2.1/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: route.query.code,
        redirect_uri: "https://localhost:5173/auth/line-login", // 必須與 Line 平台設定一致
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
  } catch (error) {
    if (error.response) {
      console.error("Failed to exchange token:", error.response.data);
    } else {
      console.error("Error occurred:", error);
    }
  }
}

onMounted(() => {
  getToken();
});
</script>
