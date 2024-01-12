<script setup lang="ts">
import {ref} from "vue";
import BaseDialog from "@/components/base/BaseDialog.vue";

const dialogVisible = ref(false);
const show = () => {
  dialogVisible.value = true;
};
defineExpose({
  show,
});

type FeedbackFormData = {
  content: string
}
const feedbackFormData = ref<FeedbackFormData>({
  content: "",
});
const feedbackRules = ref({
  content: [
    {required: true, message: "Please input content", trigger: "blur"},
    {min: 5, max: 200, message: "Length should be 5 to 200", trigger: "blur"}
  ],
});
</script>

<template>
  <BaseDialog
      v-model:visible="dialogVisible"
      title="Send Feedback"
      description="Please describe your problem in the input box below"
  >
    <el-form class="w-full" :model="feedbackFormData" :rules="feedbackRules">
      <el-form-item prop="content">
        <el-input
            class="w-full"
            type="textarea"
            placeholder="Please describe your problem"
            v-model="feedbackFormData.content"
            show-word-limit
            maxlength="200"
            :autosize="{ minRows: 6, maxRows: 12}"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary">Confirm</el-button>
    </template>
  </BaseDialog>
</template>
