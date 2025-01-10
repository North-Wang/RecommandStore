<template>
  <div class="p-4 grid grid-cols-2 grid-rows-2">
    <div>完成登入</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const getToken = async () => {
  try {
    const response = await axios.get(
      "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1234567890&redirect_uri=https%3A%2F%2Fexample.com%2Fauth%3Fkey%3Dvalue&state=12345abcde&scope=profile%20openid&nonce=09876xyz"
    );
    const token = response.data.access_token;
    console.log("Token:", token);
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};
onMounted(() => {
  getToken();
});
</script>
