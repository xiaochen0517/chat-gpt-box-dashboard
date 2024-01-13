<script lang="ts" setup>
import {ref} from "vue";
import LoginContainer from "@/components/login/LoginContainer.vue";
import SignUpContainer from "@/components/login/SignUpContainer.vue";
import bgImage from "@/assets/images/login_bg.png";

const isLogin = ref(true);

</script>

<template>
  <div class="w-full h-full flex flex-row gap-0.5 bg-neutral-50">
    <div
        class="flex-2 bg-cover bg-no-repeat bg-center rounded-r-xl"
        :style="{backgroundImage: `url(${bgImage})`}"
    />
    <div class="flex-1 h-full flex flex-col justify-center">
      <div class="w-96 mx-auto">
        <h1 class="pb-4 text-center font-bold text-xl leading-10">Chat Gpt Dashboard</h1>
        <LoginContainer v-if="isLogin" @switchSignUp="isLogin = false"/>
        <SignUpContainer v-else @switchLogin="isLogin = true"/>
      </div>
    </div>
  </div>
</template>
