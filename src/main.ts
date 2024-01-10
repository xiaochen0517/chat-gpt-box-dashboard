import {createApp} from "vue";
import "@/assets/styles/tailwind.css";
import "@/assets/styles/style.less";
import App from "./App.vue";

// Router
import router from "@/router/Router";
import {createPinia} from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(router);
app.use(pinia);

app.mount("#app");
