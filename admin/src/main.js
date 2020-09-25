import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/style/style.scss";
import "nprogress/nprogress.css";
import loading from "@/utils/loading";

Vue.use(ElementUI);
Vue.use(loading);

Vue.config.productionTip = false;

Vue.prototype.$log = window.console.log;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
