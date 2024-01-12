<script setup lang="ts">
import { ref } from "vue";

const rejectLogin = ref(false);
</script>

<template>
  <div class="w-full h-full">
    <div class="px-6 py-2 text-2xl font-bold border-b">Settings</div>
    <div class="pl-6 pt-4">
      <div class="font-bold text-lg leading-10">Base</div>
      <div class="font-bold">Reject Login</div>
      <div class="text-sm text-stone-500">Turn on this switch system will reject all login request</div>
      <el-switch size="large" active-color="#22c55e" v-model="rejectLogin"/>
    </div>
  </div>
</template>
