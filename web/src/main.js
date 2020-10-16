import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import Loading from '@/utils/loading'
Vue.use(Loading)

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress';
VMdPreview.use(vuepressTheme);
Vue.use(VMdPreview);

import "@/assets/style/base.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
