import Vue from "vue";
import loadingComponent from "@c/Loading";

const LoadingConstructor = Vue.extend(loadingComponent);

const instance = new LoadingConstructor({ el: document.createElement("div") });

instance.show = false;

const loading = {
  show() {
    instance.show = true;
    document.body.appendChild(instance.$el);
  },
  hide() {
    instance.show = false;
  }
};

export default {
  install() {
    if (!Vue.$loading) {
      Vue.$loading = loading;
    }
    Vue.mixin({
      created() {
        this.$loading = Vue.$loading;
      }
    });
  }
};
