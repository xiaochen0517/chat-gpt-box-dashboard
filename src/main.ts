import {createApp} from "vue";
import "@/assets/styles/tailwind.css";
import "element-plus/theme-chalk/index.css";
import "@/assets/styles/style.less";
import App from "./App.vue";
import axios from "@/axios/Axios";
import VueAxios from "vue-axios";

// Router
import router from "@/router/Router";
import {createPinia} from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(VueAxios, axios);
app.provide("axios", app.config.globalProperties.axios);

app.mount("#app");
