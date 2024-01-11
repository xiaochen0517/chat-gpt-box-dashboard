<script setup lang="ts">
import {ElForm} from "element-plus";
import {ref} from "vue";
import axios from "axios";


const loginForm = ref({
  username: "",
  password: "",
});
const loginFormRules = ref({
  username: [
    {required: true, message: "请输入用户名", trigger: "blur"},
  ],
  password: [
    {required: true, message: "请输入密码", trigger: "blur"},
  ],
});
const loginLoading = ref(false);
const loginFormRef = ref<InstanceType<typeof ElForm> | null>(null);
const loginClick = async () => {
  if (!loginFormRef.value) {
    throw new Error("loginFormRef is null");
  }
  loginLoading.value = true;
  try {
    const valid = loginFormRef.value.validate();
    if (!valid) {
      loginLoading.value = false;
      return;
    }
    await doLogin();
  } catch (error) {
    console.error(error);
  } finally {
    loginLoading.value = false;
  }
};
const doLogin = async () => {
  await axios.post("/api/login", loginForm.value);
  window.location.href = "/";
};
</script>

<template>
  <el-form
      ref="loginFormRef"
      class="px-6 pb-2"
      :model="loginForm"
      :rules="loginFormRules"
      label-width="100px"
      label-suffix=" : "
      @keydown.enter.stop.prevent="loginClick"
  >
    <el-form-item label="Username" prop="username">
      <el-input v-model="loginForm.username" placeholder="Please input username"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="loginForm.password" placeholder="Please input password"></el-input>
    </el-form-item>
    <el-form-item label-width="0px">
      <el-button class="w-full mt-2" type="primary" :loading="loginLoading" @click.stop="loginClick">
        Login
      </el-button>
    </el-form-item>
  </el-form>
</template>
