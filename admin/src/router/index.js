import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout"
import NProgress from 'nprogress'

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/404'),
    meta: { title: '登陆' }
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404'),
    meta: { title: '404' }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import('@/views/Home'),
        meta: { title: '首页' },
      },
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect:'/',
    children:[
      {
        path:'articleTag',
        component:()=>import('@/views/article/ArticleTag'),
        meta: { title: '创建标签' },
      },
      {
        path:'ArticleAdd',
        props: true,
        component:()=>import('@/views/article/ArticleEdit'),
        meta: { title: '新建文章' },
      },
      {
        path:'ArticleUpdate/:id',
        props: true,
        component:()=>import('@/views/article/ArticleEdit'),
        meta: { title: '修改文章' },
      },
      {
        path:'ArticleList',
        component:()=>import('@/views/article/ArticleList'),
        meta: { title: '文章列表' },
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = to.meta.title ? to.meta.title : 'admin'

  NProgress.done()
  next()
})

router.afterEach(() => {
  NProgress.done()
})


// 禁止相同路由跳转（会导致错误警告）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;
