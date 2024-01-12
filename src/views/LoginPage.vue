<script lang="ts" setup>
import {onMounted, ref} from "vue";
import LoginContainer from "@/components/login/LoginContainer.vue";
import SignUpContainer from "@/components/login/SignUpContainer.vue";

onMounted(() => {
  setLoginPageContainerBackground()
      .catch((error) => {
        console.error(error);
      });
});
const loginPageBackgroundRef = ref<HTMLElement | null>(null);
const wallpaper = "https://images.unsplash.com/photo-1704574155820-47a04256005d?w=600";
const setLoginPageContainerBackground = async () => {
  // const bingWallpaper = await getBingWallpaper();
  if (!loginPageBackgroundRef.value) {
    throw new Error("loginPageContainer is null");
  }
  loginPageBackgroundRef.value.style.backgroundImage = `url(${wallpaper})`;
};
const isLogin = ref(true);

</script>

<template>
  <div class="w-full h-full flex flex-row gap-0.5 bg-neutral-50">
    <div ref="loginPageBackgroundRef" class="flex-2 bg-cover bg-no-repeat bg-center rounded-r-xl"/>
    <div class="flex-1 h-full flex flex-col justify-center">
      <div class="w-96 mx-auto">
        <h1 class="pb-4 text-center font-bold text-xl leading-10">Chat Gpt Dashboard</h1>
        <LoginContainer v-if="isLogin" @switchSignUp="isLogin = false"/>
        <SignUpContainer v-else @switchLogin="isLogin = true"/>
      </div>
    </div>
  </div>
</template>
