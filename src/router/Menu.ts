import {RouteRecordRaw} from "vue-router";

export const menus: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "home",
    meta: {
      icon: "icon-home",
      title: "Home",
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
    name: "Billing",
    path: "billing",
    meta: {
      icon: "icon-creditcard",
      title: "Billing",
      permissions: ["user"],
    },
    component: () => import("@/views/home/BillingView.vue"),
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
