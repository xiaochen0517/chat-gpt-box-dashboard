<script setup lang="ts">
import {ElForm, ElMessage} from "element-plus";
import axios from "@/axios/Axios.ts";
import {ref} from "vue";
import router from "@/router/Router.ts";


const loginForm = ref({
  username: "",
  password: "",
});
const loginFormRules = ref({
  username: [
    {required: true, message: "请输入用户名", trigger: "blur"},
    {min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur"}
  ],
  password: [
    {required: true, message: "请输入密码", trigger: "blur"},
    {min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur"}
  ],
});
const loginLoading = ref(false);
const loginFormRef = ref<InstanceType<typeof ElForm> | null>(null);
const loginClick = () => {
  if (!loginFormRef.value) {
    throw new Error("loginFormRef is null");
  }
  loginLoading.value = true;
  loginFormRef.value.validate()
      .then(async (valid) => {
        if (!valid) {
          ElMessage.warning("form validate failed, please check the form");
          loginLoading.value = false;
          return;
        }
        await doLogin();
        loginLoading.value = false;
      })
      .catch((error) => {
        console.error(error);
        loginLoading.value = false;
      });
};
const doLogin = async () => {
  if (!axios) {
    throw new Error("axios is null");
  }
  await axios.post("/user/login", loginForm.value);
  router.push({path: "/main"});
};
</script>

<template>
  <el-form
      ref="loginFormRef"
      class="px-6 pb-2"
      :model="loginForm"
      :rules="loginFormRules"
      label-width="100px"
      label-suffix=":"
      label-position="left"
      @keydown.enter.stop.prevent="loginClick"
  >
    <el-form-item label="Username" prop="username">
      <el-input v-model="loginForm.username" placeholder="Please input username"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model="loginForm.password" placeholder="Please input password" show-password/>
    </el-form-item>
    <el-form-item label-width="0px">
      <el-button class="w-full mt-2" type="primary" :loading="loginLoading" @click.stop="loginClick">
        Login
      </el-button>
    </el-form-item>
  </el-form>
  <div class="text-center text-xs">
    Don't have an account?
    <a class="underline text-blue-600 cursor-pointer" @click.stop="$emit('switchSignUp')">Sign Up now</a>
  </div>
</template>
