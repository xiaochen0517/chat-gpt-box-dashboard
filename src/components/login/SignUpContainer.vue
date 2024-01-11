<script setup lang="ts">
import {ElForm} from "element-plus";
import {AxiosInstance} from "axios";
import {ref, inject} from "vue";

const signUpForm = ref({
  username: "",
  email: "",
  verifyCode: "",
  password: "",
});
const signUpFormRules = ref({
  username: [
    {required: true, message: "请输入用户名", trigger: "blur"},
    {min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur"}
  ],
  email: [
    {required: true, message: "请输入邮箱", trigger: "blur"},
    {type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"]}
  ],
  verifyCode: [
    {required: true, message: "请输入验证码", trigger: "blur"},
    {min: 6, max: 6, message: "长度为 6 个字符", trigger: "blur"}
  ],
  password: [
    {required: true, message: "请输入密码", trigger: "blur"},
    {min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur"}
  ],
});
const signUpLoading = ref(false);
const signUpFormRef = ref<InstanceType<typeof ElForm> | null>(null);
const signUpClick = async () => {
  if (!signUpFormRef.value) {
    throw new Error("signUpFormRef is null");
  }
  signUpLoading.value = true;
  try {
    const valid = signUpFormRef.value.validate();
    if (!valid) {
      signUpLoading.value = false;
      return;
    }
    await doSignUp();
  } catch (error) {
    console.error(error);
  } finally {
    signUpLoading.value = false;
  }
};
const axios: AxiosInstance = inject("axios");
const doSignUp = async () => {
  await axios.post("/user/signup", signUpForm.value);
  window.location.href = "/";
};
</script>

<template>
  <el-form
      ref="loginFormRef"
      class="px-6 pb-2"
      :model="signUpForm"
      :rules="signUpFormRules"
      label-width="100px"
      label-suffix=":"
      label-position="left"
      @keydown.enter.stop.prevent="signUpClick"
  >
    <el-form-item label="Username" prop="username">
      <el-input v-model="signUpForm.username" placeholder="Please input username"></el-input>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="signUpForm.email" placeholder="Please input email"></el-input>
    </el-form-item>
    <el-form-item label="Verify code" prop="verifyCode">
      <el-input type="number" v-model="signUpForm.verifyCode" placeholder="Please input verify code"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="signUpForm.password" placeholder="Please input password"></el-input>
    </el-form-item>
    <el-form-item label-width="0px">
      <el-button class="w-full mt-2" type="primary" :loading="signUpLoading" @click.stop="signUpClick">
        Sign Up
      </el-button>
    </el-form-item>
  </el-form>
  <div class="text-center text-xs">
    Have an account?
    <a class="underline text-blue-600 cursor-pointer" @click.stop="$emit('switchLogin')">Login now</a>
  </div>
</template>
