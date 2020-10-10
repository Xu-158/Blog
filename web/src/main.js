import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import Loading from '@/utils/loading'
Vue.use(Loading)

// import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload,{
//   preLoad: 1.3, //提前加载高度（数字 1 表示 1 屏的高度）
//   // error: 'dist/error.png', //图片加载失败时显示的图片
//   // loading: 'dist/loading.gif', //图片加载状态下显示的图片
//   attempt: 1 //加载错误后最大尝试次数
// })

import "@/assets/style/base.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
