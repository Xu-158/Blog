import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/style/style.scss";
import "nprogress/nprogress.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import loading from "@/utils/loading";
Vue.use(loading);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
