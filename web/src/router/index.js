import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/home",
    meta: { level: 1 },
    component: () => import("@/Layout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: { title: "首页" ,level: 2},
        component: () => import("@/views/HomePage.vue")
      },
      {
        path: "/article/:id",
        name: "articlePage",
        meta: { title: "文章" ,level: 3},
        props: true,
        component: () => import("@/views/ArticlePage.vue")
      },
      {
        path: "/category",
        name: "category",
        meta: { title: "分类" ,level: 2},
        component: () => import("@/views/CategoryPage.vue")
      },
      {
        path: "/timeLine",
        name: "timeLine",
        meta: { title: "时光机" ,level: 2},
        component: () => import("@/views/TimeLinePage.vue")
      },
      {
        path: "/music",
        name: "music",
        meta: { title: "音乐盒" ,level: 2},
        component: () => import("@/views/MusicPage.vue")
      },
      {
        path: "/about",
        name: "about",
        meta: { title: "关于" ,level: 2},
        component: () => import("@/views/AboutPage")
      },
    ]
  },
  {
    path: "*",
    name: "404",
    meta:{level: 1},
    component: () => import("@/Layout"),
    children: [
      {
        path: "*",
        name: "404 NotFound!",
        meta: { title: "失踪了哦！" ,level: 2},
        component: () => import("@/views/404")
      }
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta ? to.meta.title : "...";
  next();
});

// vue报错：Avoided redundant navigation to current location: "/"的解决方法
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;
