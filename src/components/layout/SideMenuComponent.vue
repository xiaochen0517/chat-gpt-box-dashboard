<script setup lang="ts">
import {menus} from "@/router/Menu.ts";
import {onMounted, ref} from "vue";
import {RouteRecordRaw} from "vue-router";
import SideMenuListItem from "@/components/layout/sidebar/SideMenuListItem.vue";

const menuList = ref<RouteRecordRaw[]>([]);
onMounted(() => {
  // Filter has permission menu
  menuList.value = menus;
});
</script>

<template>
  <div class="relative h-full w-12">
    <div class="z-10 bg-white hover:shadow-right absolute left-0 top-0 bottom-0 h-full flex flex-col w-12 group hover:w-64 transition-all ease-in-out duration-500 delay-100 text-xl text-neutral-700 border-r border-neutral-200">
      <i class="iconfont icon-menu mx-3 mt-2 mb-2"/>
      <ul class="p-1 flex-1">
        <SideMenuListItem
            v-for="menuItem in menuList"
            :key="menuItem.path"
            :active="$route.name === menuItem.name"
            :icon="menuItem.meta?.icon"
            :title="menuItem.meta?.title"
            :path="menuItem.path"
        />
      </ul>
      <ul class="p-1 pb-2">
        <SideMenuListItem icon="icon-alert" title="Feedback"/>
        <SideMenuListItem icon="icon-export" title="Logout" @click="$router.push({path: '/login'})"/>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
