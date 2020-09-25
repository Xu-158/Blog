import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage")
  },
  {
    path: "*",
    name: "404 NotFound!",
    component: () => import("@/views/404")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/AboutPage")
  }
];

const router = new VueRouter({
  routes
});

export default router;
