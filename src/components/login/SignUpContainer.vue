<script setup lang="ts">
import {ElForm, ElMessage, FormRules} from "element-plus";
import axios from "@/axios/Axios.ts";
import {ref} from "vue";
import {useChallengeV3} from "vue-recaptcha";

const {execute} = useChallengeV3("submit");
const recaptchaCheck = async () => {
  try {
    // just use front-end recaptcha check, no need to check the response
    await execute();
  } catch (error) {
    ElMessage.error("recaptcha check error");
    console.error("recaptcha check error: ", error);
    throw error;
  }
};
type SignUpFormType = {
  username: string;
  email: string;
  verifyCode: string;
  password: string;
  repeat: string;
};
const signUpForm = ref<SignUpFormType>({
  username: "testusername",
  email: "xxx@xxx.com",
  verifyCode: "123456",
  password: "123456",
  repeat: "123456",
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkPasswordRepeat = (_rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== signUpForm.value.password) {
    callback(new Error("Repeat password not equal to password"));
  } else {
    callback();
  }
};
const signUpFormRules = ref<FormRules<SignUpFormType>>({
  username: [
    {required: true, message: "Please input username", trigger: "blur"},
    {min: 3, max: 20, message: "Username must be between 3 and 20", trigger: "blur"}
  ],
  email: [
    {required: true, message: "Please input email", trigger: "blur"},
    {type: "email", message: "Please input correct email", trigger: ["blur", "change"]}
  ],
  verifyCode: [
    {required: true, message: "Please input email verification code", trigger: "blur"},
    {min: 6, max: 6, message: "The verification code must be 6", trigger: "blur"}
  ],
  password: [
    {required: true, message: "Please input password", trigger: "blur"},
    {min: 6, max: 20, message: "Password must be between 6 and 20", trigger: "blur"}
  ],
  repeat: [
    {required: true, message: "Please repeat password", trigger: "blur"},
    {validator: checkPasswordRepeat, trigger: "blur"}
  ],
});
const signUpLoading = ref(false);
const signUpFormRef = ref<InstanceType<typeof ElForm> | null>(null);
const signUpClick = () => {
  if (!signUpFormRef.value) {
    throw new Error("signUpFormRef is null");
  }
  signUpLoading.value = true;
  signUpFormRef.value.validate()
      .then(async (valid) => {
        if (!valid) {
          ElMessage.warning("form validate failed, please check the form");
          signUpLoading.value = false;
          return;
        }
        await doSignUp();
      })
      .catch((error) => {
        console.error(error);
        signUpLoading.value = false;
      });
};
const doSignUp = async () => {
  if (!axios) {
    throw new Error("axios is null");
  }
  await recaptchaCheck();
  await axios.post("/user/signup", signUpForm.value);
  window.location.href = "/";
};
const sendEmailCodeClick = () => {
  if (!signUpFormRef.value) {
    throw new Error("signUpFormRef is null");
  }
  signUpFormRef.value.validateField("email")
      .then(async (valid) => {
        if (!valid) {
          ElMessage.warning("email validate failed, please check the email");
          return;
        }
        await axios.post("/user/sendEmailCode", {email: signUpForm.value.email});
      })
      .catch((error) => {
        console.error(error);
      });
};
</script>

<template>
  <el-form
      ref="signUpFormRef"
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
      <el-input v-model="signUpForm.email" placeholder="Please input email">
        <template #append>
          <div class=" hover:text-neutral-800">
            <el-button @click.stop="sendEmailCodeClick">
              <i class="iconfont icon-mail"/>
            </el-button>
          </div>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="Verify code" prop="verifyCode">
      <el-input type="number" v-model="signUpForm.verifyCode" placeholder="Please input verify code"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model="signUpForm.password" placeholder="Please input password" show-password/>
    </el-form-item>
    <el-form-item label="Repeat" prop="repeat">
      <el-input type="password" v-model="signUpForm.repeat" placeholder="Please repeat password" show-password/>
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
