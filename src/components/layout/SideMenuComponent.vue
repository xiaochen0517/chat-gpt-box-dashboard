<script lang="ts" setup>
import {menus} from "@/router/Menu.ts";
import {onMounted, ref} from "vue";
import {RouteRecordRaw} from "vue-router";
import SideMenuListItem from "@/components/layout/sidebar/SideMenuListItem.vue";
import FeedbackDialog from "@/components/layout/sidebar/FeedbackDialog.vue";

const menuList = ref<RouteRecordRaw[]>([]);
onMounted(() => {
  // Filter has permission menu
  menuList.value = menus;
});
const feedbackDialogRef = ref<InstanceType<typeof FeedbackDialog> | null>(null);

const menuMouseHover = ref(false);
</script>

<template>
  <div class="relative h-full w-12">
    <div
        class="z-10 bg-white hover:shadow-right absolute left-0 top-0 bottom-0 h-full flex flex-col w-12 group hover:w-64 transition-all ease-in-out duration-500 delay-100 text-xl text-neutral-700 border-r border-neutral-200"
        @mouseenter="menuMouseHover = true"
        @mouseleave="menuMouseHover = false"
    >
      <i
          class="iconfont icon-menu mx-3 mt-2 mb-2 hover:text-green-600 cursor-pointer"
          @click="$router.push({path: '/main'})"
      />
      <ul class="p-1 flex-1">
        <SideMenuListItem
            v-for="menuItem in menuList"
            :key="menuItem.path"
            :active="$route.name === menuItem.name"
            :hover="menuMouseHover"
            :icon="menuItem.meta?.icon as string"
            :path="menuItem.path"
            :title="menuItem.meta?.title as string"
        />
      </ul>
      <ul class="p-1 pb-2">
        <SideMenuListItem
            :hover="menuMouseHover"
            icon="icon-alert"
            title="Feedback"
            @click="feedbackDialogRef?.show()"
        />
        <SideMenuListItem
            :hover="menuMouseHover"
            icon="icon-export"
            title="Logout"
            @click="$router.push({path: '/login'})"
        />
      </ul>
    </div>
    <FeedbackDialog ref="feedbackDialogRef"/>
  </div>
</template>
