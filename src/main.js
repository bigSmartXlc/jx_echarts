import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "animate.css";
import "@/assets/css/main.scss";
import "video.js/dist/video-js.css";

// axios
import axios from "axios";
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
