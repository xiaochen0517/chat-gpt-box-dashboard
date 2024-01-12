<script setup lang="ts">
import SideMenuComponent from "@/components/layout/SideMenuComponent.vue";

</script>

<template>
  <div class="w-full h-full flex flex-row gap-0.5">
    <div class="h-full">
      <SideMenuComponent/>
    </div>
    <div class="flex-1 h-full">
      <router-view/>
    </div>
  </div>
</template>
