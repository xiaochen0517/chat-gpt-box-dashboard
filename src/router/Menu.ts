import {RouteRecordRaw} from "vue-router";

export const menus: RouteRecordRaw[] = [
  {
    name: "Main",
    path: "main",
    meta: {
      icon: "icon-home",
      title: "Main",
      permissions: ["user"],
    },
    component: () => import("@/views/home/MainView.vue"),
  },
  {
    name: "Usage",
    path: "usage",
    meta: {
      icon: "icon-barchart",
      title: "Usage",
      permissions: ["user"],
    },
    component: () => import("@/views/home/UsageView.vue"),
  },
  {
    name: "Settings",
    path: "settings",
    meta: {
      icon: "icon-setting",
      title: "Settings",
      permissions: ["admin"],
    },
    component: () => import("@/views/home/SettingsView.vue"),
  },
];
