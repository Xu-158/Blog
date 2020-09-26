import axios from "axios";

const httpUtil = axios.create({
  baseURL: "http://127.0.0.1:3000/web",
  timeout: 50000
});

httpUtil.interceptors.response.use(
  response=>{
    const res = response.data
    return res
  }
)

export default httpUtil;
