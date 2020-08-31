import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/style/style.scss'
import 'nprogress/nprogress.css'

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$log = window.console.log

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
