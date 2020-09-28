import axios from "axios";
import Vue from "vue";

const httpUtil = axios.create({
  baseURL: "http://127.0.0.1:3000/web",
  timeout: 50000
});

httpUtil.interceptors.request.use(
  config => {
    Vue.$loading.show();
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

httpUtil.interceptors.response.use(response => {
  Vue.$loading.hide();
  const res = response.data;
  return res;
});

export default httpUtil;
