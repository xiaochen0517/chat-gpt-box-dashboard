<script lang="ts" setup>
import router from "@/router/Router.ts";
import {onMounted, ref, watch} from "vue";

type MenuItemProps = {
  active?: boolean,
  hover?: boolean,
  icon?: string,
  title?: string,
  path?: string,
}
const props = withDefaults(defineProps<MenuItemProps>(), {
  active: false,
  hover: false,
  icon: "icon-alert",
  title: "Test",
});
const jumpRouterHandle = () => {
  if (props.path) {
    router.push(props.path);
  }
};

const isInvisible = ref(true);
onMounted(() => {
  isInvisible.value = !props.hover;
});
watch(() => props.hover, (newValue) => {
  if (!newValue) {
    return;
  }
  isInvisible.value = !newValue;
});
const handleTransitionEnd = () => {
  if (props.hover) {
    return;
  }
  isInvisible.value = true;
};
</script>

<template>
  <li
      :class="active ? 'text-green-600 hover:text-green-800 bg-green-200 hover:bg-green-300 active:bg-green-300': 'text-stone-500 hover:text-stone-900 hover:bg-neutral-200 active:bg-neutral-300'"
      class="flex flex-row items-center gap-3 px-2.5 py-2 mb-1 cursor-pointer rounded-lg select-none"
      @click="jumpRouterHandle"
  >
    <i :class="icon" class="iconfont leading-5"/>
    <span
        :class="{'visible': !isInvisible,'invisible': isInvisible}"
        class="flex-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out delay-200"
        @transitionend="handleTransitionEnd"
    >
      {{ title }}
    </span>
  </li>
</template>
