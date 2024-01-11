<script setup lang="ts">
import axios from "axios";
import {onMounted, ref} from "vue";
import LoginContainer from "@/components/login/LoginContainer.vue";

onMounted(() => {
  setLoginPageContainerBackground()
      .catch((error) => {
        console.error(error);
      });
});
const getBingWallpaper = async () => {
  const res = await axios.get(`https://corsproxy.io/?${encodeURIComponent("https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN")}`);
  if (!res || res.status != 200 || !res.data || !res.data.images || !res.data.images[0]) {
    throw new Error("get bing wallpaper failed");
  }
  return `https://cn.bing.com${res.data.images[0].url}`;
};
const loginPageBackgroundRef = ref<HTMLElement | null>(null);
const setLoginPageContainerBackground = async () => {
  const bingWallpaper = await getBingWallpaper();
  if (!loginPageBackgroundRef.value) {
    throw new Error("loginPageContainer is null");
  }
  loginPageBackgroundRef.value.style.backgroundImage = `url(${bingWallpaper})`;
};

</script>

<template>
  <div class="w-full h-full flex flex-row bg-neutral-50">
    <div ref="loginPageBackgroundRef" class="flex-1 bg-cover bg-no-repeat bg-center rounded-r-3xl"/>
    <div class="w-96 h-full flex flex-col justify-center bg-neutral-100 bg-opacity-95 rounded-2xl">
      <h1 class="py-2 text-center text-xl leading-15">Chat Gpt Dashboard</h1>
      <LoginContainer/>
      <div class="text-center text-xs">
        Don't have an account?
        <a class="underline text-blue-600 cursor-pointer">Sign Up now</a>
      </div>
    </div>
  </div>
</template>
