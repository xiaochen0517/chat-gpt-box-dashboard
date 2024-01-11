<script setup lang="ts">
import axios from "axios";
import {onMounted, ref} from "vue";

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
const loginPageContainer = ref<HTMLElement | null>(null);
const setLoginPageContainerBackground = async () => {
  const bingWallpaper = await getBingWallpaper();
  if (!loginPageContainer.value) {
    throw new Error("loginPageContainer is null");
  }
  loginPageContainer.value.style.backgroundImage = `url(${bingWallpaper})`;
};
</script>

<template>
  <div
      ref="loginPageContainer"
      class="w-full h-full bg-cover bg-no-repeat bg-center flex flex-row justify-center items-center"
  >
    <div class="w-96 h-64 bg-neutral-100 opacity-80 rounded-lg">
    </div>
  </div>
</template>
