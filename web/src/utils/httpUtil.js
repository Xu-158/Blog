import axios from "axios";
// import Vue from "vue";

const httpUtil = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000
});

httpUtil.interceptors.request.use(
  config => {
    // Vue.$loading.show();
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

httpUtil.interceptors.response.use(response => {
  // Vue.$loading.hide();
  const res = response.data;
  return res;
});

const request = ({ methods, url, params }) => {
  let newParams = methods == 'get' ? { params } : parmas
  return httpUtil[methods](url, newParams)
    .then(res => {
      return res
    }).catch(error => {
      console.log('error: ', error, 'url: ', url, 'params: ', params);
    })
}

export default httpUtil;
