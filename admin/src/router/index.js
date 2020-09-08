import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout";
import NProgress from "nprogress";
import { existToken } from "@/utils/existToken";

Vue.use(VueRouter);

const routes = [
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
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "首页",
        component: () => import("@/views/Home"),
        meta: { title: "首页" }
      }
    ]
  },
  {
    path: "/article",
    component: Layout,
    redirect: "/article/articleTag",
    name: "标签管理",
    meta: { title: "标签管理" },
    children: [
      {
        path: "articleTag",
        component: () => import("@/views/article/ArticleTag"),
        name: "查看标签",
        meta: { title: "查看标签" }
      },
      {
        path: "ArticleAdd",
        props: true,
        component: () => import("@/views/article/ArticleEdit"),
        name: "新建文章",
        meta: { title: "新建文章" }
      },
      {
        path: "ArticleUpdate/:id",
        props: true,
        component: () => import("@/views/article/ArticleEdit"),
        name: "编辑文章",
        meta: { title: "编辑文章" }
      },
      {
        path: "ArticleList",
        component: () => import("@/views/article/ArticleList"),
        name: "文章列表",
        meta: { title: "文章列表" }
      }
    ]
  },
  {
    path: "/link",
    component: Layout,
    redirect: "/link/friendLink",
    name: "链接管理",
    meta: { title: "链接管理" },
    children: [
      {
        path: "friendLink",
        component: () => import("@/views/link/FriendLink"),
        name: "查看友情链接",
        meta: { title: "查看友情链接" }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/adminList",
    name: "系统管理",
    meta: { title: "系统管理" },
    children: [
      {
        path: "adminList",
        component: () => import("../views/system/AdminList.vue"),
        name: "管理员列表",
        meta: { title: "管理员列表" }
      },
      {
        path: "aboutMe",
        component: () => import("../views/system/AboutMe.vue"),
        name: "关于我",
        meta: { title: "关于我" }
      }
    ]
  },
  {
    path: "/timeLine",
    component: Layout,
    redirect: "/home",
    name: "首页",
    meta: { title: "首页" },
    children: [
      {
        path: "/timeLine/timeLineList",
        component: () => import("../views/timeLine/TimeLineList.vue"),
        name: "时间线列表",
        meta: { title: "时间线列表" },
        children: [
          {
            path: "/timeLine/timeLineList/timeLineEdit",
            component: () => import("../views/timeLine/TimeLineEdit.vue"),
            name: "编辑时间线",
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
      console.log("aaa");
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

// 禁止相同路由跳转（会导致错误警告）
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;
