import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    yujingDialogShow: false,
    xitongDialogShow: false,
  },
  getters: {},
  mutations: {
    TOGGLE_YUJING(state, val) {
      state.yujingDialogShow = val;
    },
    TOGGLE_XITONG(state, val) {
      state.xitongDialogShow = val;
    },
  },
  actions: {},
  modules: {},
});
