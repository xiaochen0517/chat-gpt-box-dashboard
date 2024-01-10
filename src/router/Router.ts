import {createRouter, createWebHashHistory} from "vue-router";

export type RouteRecordRaw = {
  path: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: () => Promise<any>;
};

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/AboutPage.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
