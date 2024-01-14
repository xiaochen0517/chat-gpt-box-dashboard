<script lang="ts" setup>
import {getCurrentInstance, ref, watch} from "vue";

const instance = getCurrentInstance();

type Props = {
  visible: boolean,
  title: string,
  description?: string,
  descAlign?: "left" | "center" | "right",
  width?: string | number,
  closeOnClickModal?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  title: "",
  description: "",
  descAlign: "left",
  width: "50%",
  closeOnClickModal: true,
});

const showDialog = ref(false);
watch(() => props.visible, (value) => {
  showDialog.value = value;
});
watch(showDialog, (value) => {
  if (!instance) return;
  instance.emit("update:visible", value);
});

</script>

<template>
  <el-dialog
      v-model="showDialog"
      :close-on-click-modal="closeOnClickModal"
      :show-close="false"
      :width="width"
  >
    <template #header>
      <div v-if="title && title.length > 0" class="px-4 py-2 text-sm font-bold">{{ title }}</div>
      <slot v-else name="title"/>
    </template>
    <div class="bg-white">
      <div
          v-if="description && description.length !== 0"
          :class="{'justify-end': descAlign === 'right', 'justify-center': descAlign === 'center'}"
          class="px-4 pb-1 flex flex-row gap-1"
      >
        <i class="iconfont icon-info-circle text-neutral-500 dark:text-neutral-400"></i>
        {{ description }}
      </div>
      <div class="w-full px-4 pt-1 pb-4 flex flex-row">
        <slot name="default"/>
      </div>
    </div>
    <template #footer>
      <div class="px-4 py-2">
        <slot name="footer"/>
      </div>
    </template>
  </el-dialog>
</template>
