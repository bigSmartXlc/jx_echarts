import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/line",
    name: "line",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Test-line.vue"),
  },
  {
    path: "/scatter3D",
    name: "scatter3D",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/scatter3D.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
