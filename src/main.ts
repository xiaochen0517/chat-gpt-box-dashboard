import {createApp} from "vue";
import "@/assets/styles/tailwind.css";
import "element-plus/theme-chalk/index.css";
import "@/assets/styles/style.less";
import "@/assets/icons/iconfont/iconfont.css";
import App from "./App.vue";

import { VueRecaptchaPlugin } from "vue-recaptcha/head";

// Router
import router from "@/router/Router";
import {createPinia} from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(VueRecaptchaPlugin, {
  v3SiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY as string,
});

app.mount("#app");
