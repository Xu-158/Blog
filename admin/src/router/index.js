// import Vue from "vue";
// import VueRouter from "vue-router";
Vue.use(VueRouter);

import Layout from "@/views/Layout";
import NProgress from "nprogress";
import { existToken } from "@/utils/existToken";


const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/Home"),
        meta: { title: "首页" }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login"),
    meta: { title: "登录" }
  },
  {
    path: "*",
    name: "404",
    component: Layout,
    redirect: "/404",
    children: [
      {
        path: "404",
        component: () => import("@/views/404"),
        meta: { title: "失踪了啊！" }
      }
    ]
  },
  {
    path: "/article",
    component: Layout,
    redirect: "/article/articleTag",
    name: "article",
    meta: { title: "标签管理" },
    children: [
      {
        path: "articleTag",
        component: () => import("@/views/article/ArticleTag"),
        name: "articleTag",
        meta: { title: "查看标签" }
      },
      {
        path: "ArticleAdd",
        props: true,
        component: () => import("@/views/article/ArticleEdit"),
        name: "articleAdd",
        meta: { title: "新建文章" }
      },
      {
        path: "ArticleUpdate/:id",
        props: true,
        component: () => import("@/views/article/ArticleEdit"),
        name: "articleUpdate",
        meta: { title: "编辑文章" }
      },
      {
        path: "ArticleList",
        component: () => import("@/views/article/ArticleList"),
        name: "articleList",
        meta: { title: "文章列表" }
      }
    ]
  },
  {
    path: "/link",
    component: Layout,
    redirect: "/link/friendLink",
    name: "link",
    meta: { title: "链接管理" },
    children: [
      {
        path: "friendLink",
        component: () => import("@/views/link/FriendLink"),
        name: "friendLink",
        meta: { title: "查看友情链接" }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/adminList",
    name: "system",
    meta: { title: "系统管理" },
    children: [
      {
        path: "adminList",
        component: () => import("../views/system/AdminList.vue"),
        name: "adminList",
        meta: { title: "管理员列表" }
      },
      {
        path: "aboutMe",
        component: () => import("../views/system/AboutMe.vue"),
        name: "aboutMe",
        meta: { title: "关于我" }
      },
      {
        path: "sourceList",
        component: () => import("../views/system/SourceList.vue"),
        name: "sourceList",
        meta: { title: "系统资源" }
      }
    ]
  },
  {
    path: "/timeLine",
    component: Layout,
    redirect: "/home",
    name: "timeLine",
    meta: { title: "时间线" },
    children: [
      {
        path: "/timeLine/timeLineList",
        component: () => import("../views/timeLine/TimeLineList.vue"),
        name: "timeLineList",
        meta: { title: "时间线列表" },
        children: [
          {
            path: "/timeLine/timeLineList/timeLineEdit",
            component: () => import("../views/timeLine/TimeLineEdit.vue"),
            name: "timeLineEdit",
            props: true,
            meta: { title: "编辑时间线" }
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  document.title = to.meta.title ? to.meta.title : "admin";

  const token = await existToken();
  if (token) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
    }
  } else {
    if ("/login".indexOf(to.path) != -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

// 禁止相同路由跳转（会导致错误警告）
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };

export default router;
