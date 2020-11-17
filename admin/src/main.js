// import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"
import loading from "@/utils/loading";
import VMdEditor from '@kangc/v-md-editor';

import "@/assets/style/style.scss";
import "nprogress/nprogress.css";

// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// Vue.use(ELEMENT);

Vue.use(loading);

import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
VMdEditor.use(vuepressTheme);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  store
}).$mount("#app");
