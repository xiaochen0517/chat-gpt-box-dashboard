import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import {menus} from "@/router/Menu.ts";

const routes: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)*",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
    children: [
      ...menus,
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFoundPage.vue"),
      }
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/AboutPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
