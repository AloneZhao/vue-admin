import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// 引入布局文件
import Layout from "@/views/Layout";

const routes = [
  // 主页
  {
    path: "/",
    redirect: "login",
    meta: {
      name: "主页"
    },
    hidden: true
  },
  // 登陆
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登陆"
    },
    component: () => import("../views/Login/login.vue")
  },
  // 控制台
  {
    path: "/console",
    name: "Console",
    meta: {
      name: "控制台"
    },
    redirect: "index",
    component: Layout,
    children: [
      {
        path: "/index", //绝对地址
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/Console/index.vue")
      }
    ]
  },
  // 信息管理
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理"
    },
    component: Layout,
    children: [
      {
        path: "/infoIndex", //绝对地址
        name: "InfoIndex",
        meta: {
          name: "信息列表"
        },
        component: () => import("../views/Info/index.vue")
      },
      {
        path: "/infoCategory", //绝对地址
        name: "InfoCategory",
        meta: {
          name: "信息分类"
        },
        component: () => import("../views/Info/category.vue")
      }
    ]
  },
  // 用户管理
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理"
    },
    component: Layout,
    children: [
      {
        path: "/userIndex", //绝对地址
        name: "UserIndex",
        meta: {
          name: "用户列表"
        },
        component: () => import("../views/User/index.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
