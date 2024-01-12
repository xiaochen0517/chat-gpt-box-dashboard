import axios from "axios";
import router from "@/router/Router.ts";
import {ElMessage} from "element-plus";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.status < 200) {
      console.log("response", response);
      return Promise.reject(response.data);
    }
    if (response.status >= 300 && response.status < 400) {
      console.log("response", response);
      ElMessage.warning(response.data.message);
      return Promise.reject(response.data);
    }
    if (response.status >= 400 && response.status < 500) {
      console.log("response", response);
      ElMessage.error("server error, please try again later");
      return Promise.reject(response.data);
    }
    if (response.status === 1000) {
      // not login
      console.log("response", response);
      router.push("/login");
      return Promise.reject(response.data);
    }
    if (response.status >= 500) {
      console.log("response", response);
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    ElMessage.error("server error, please try again later");
    console.log("error", error);
    return Promise.reject(error);
  }
);

export default instance;
