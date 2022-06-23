import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HomeViewDetail.vue"),
  },
  {
    path: "/homeDetail",
    name: "homeDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/aboutDetail",
    name: "aboutDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutViewDetail.vue"),
  },
  {
    path: "/bmaplk",
    name: "bmaplk",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/bmap-lk.vue"),
  },
  {
    path: "/line",
    name: "line",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Test-line.vue"),
  },
  {
    path: "/line3d",
    name: "line3d",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/line-3d.vue"),
  },
  {
    path: "/line3d-area",
    name: "line3d-area",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/line-area.vue"),
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
