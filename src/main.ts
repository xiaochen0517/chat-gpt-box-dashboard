import {createApp} from "vue";
import "@/assets/styles/tailwind.css";
import "@/assets/styles/style.less";
import App from "./App.vue";

// Router
import router from "@/router/Router";

const app = createApp(App);
app.use(router);

app.mount("#app");
