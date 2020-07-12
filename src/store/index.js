import Vue from "vue";
import Vuex from "vuex";
import * as types from "./type";
import axios from "@/axios/MyAxios";
import { updateRoutes } from "@/router/index";
Vue.use(Vuex);
const myState = {
  exception: { message: null },
  isLogin: false,
  user: {}
};
const myMutations = {
  [types.UPDATEUSER](state, data) {
    state.user = data;
  },
  [types.GET_EXCEPTION](state, data) {
    state.exception = data;
  },
  [types.LOGIN](state, data) {
    state.isLogin = data;
  }
};
const myActions = {
  [types.UPDATEUSER]({ commit }, data) {
    setTimeout(() => {
      commit(types.UPDATEUSER, data);
    }, 2000);
  },
  async [types.LOGIN]({ commit }, data) {
    let resp = await axios.post("login", data);
    if (resp != null) {
      sessionStorage.setItem("authorization", resp.headers["authorization"]);
      sessionStorage.setItem("role", resp.data.role);
      updateRoutes();
      commit(types.LOGIN, true);
    }
  }
};
export default new Vuex.Store({
  //单一数据源数据，也是响应式的数据
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {}
});

if (sessionStorage.getItem("Authorization") != null) {
  myState.isLogin = true;
}
