import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/style/base.scss";
import Loading from '@/utils/loading'

Vue.use(Loading)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
