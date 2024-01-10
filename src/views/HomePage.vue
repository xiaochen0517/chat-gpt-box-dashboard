<script setup lang="ts">
import {useConfigStore} from "@/store/ConfigStore.ts";

const configStore = useConfigStore();
</script>

<template>
  <div class="w-10 h-10 bg-red-500"/>
  <button @click="$router.push({path: '/about'})">jump</button>
  <div>{{ configStore.count }}</div>
  <button @click="configStore.increment">increment</button>
</template>
