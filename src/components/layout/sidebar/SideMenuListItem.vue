<script setup lang="ts">
import router from "@/router/Router.ts";

type MenuItemProps = {
  active: boolean,
  icon: string,
  title: string,
  path?: string,
}
const props = withDefaults(defineProps<MenuItemProps>(), {
  active: false,
  icon: "icon-alert",
  title: "Test",
});
const jumpRouterHandle = () => {
  if (props.path) {
    router.push(props.path);
  }
};
</script>

<template>
  <li
      class="flex flex-row items-center gap-3 px-2 py-0.5 hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer rounded-lg select-none text-stone-500 hover:text-stone-900"
      :class="{'text-green-600 bg-green-50 hover:bg-green-100 active:bg-green-200 hover:text-green-700': props.active}"
      @click="jumpRouterHandle"
  >
    <i class="iconfont" :class="icon"/>
    <span class="flex-1 text-sm invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-500 delay-200">
      {{ title }}
    </span>
  </li>
</template>
