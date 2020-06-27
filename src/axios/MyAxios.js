import axios from "axios";
import { GET_EXCEPTION } from "@/store/type";
import store from "@/store/index";
axios.defaults.baseURL = "/api/";
//请求拦截器
axios.interceptors.request.use(
  req => {
    let auth = sessionStorage.getItem("authorization");
    if (auth != null) {
      req.headers["authorization"] = auth;
    }
    return req;
  },
  error => {
    return Promise.reject(error);
  }
);
//响应拦截器
axios.interceptors.response.use(
  resp => {
    return resp;
  },
  error => {
    let resp = error.response;
    if (resp) {
      switch (resp.status) {
        case 401:
          break;
      }
      //此时为同步事件
      store.commit(GET_EXCEPTION, { message: resp.data.message });
    }
    return Promise.reject();
  }
);
export default axios;
