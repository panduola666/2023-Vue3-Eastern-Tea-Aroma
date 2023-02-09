import { createRouter, createWebHashHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/indexView.vue"),
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/loginView.vue"),
    },
    {
      path: "/user/:id",
      children: [
        {
          path: "home",
          name: "userHome",
          component: () => import("../views/userView.vue"),
        },
        {
          path: "orders",
          name: "orders",
          component: () => import("../views/ordersView.vue"),
        },
        {
          path: "collects",
          name: "collects",
          component: () => import("../views/collectsView.vue"),
        },
        {
          path: "reserve",
          name: "reserve",
          component: () => import("../views/reserveView.vue"),
        },
      ],
    },
    {
      path: "/admin/:id",
      children: [
        {
          path: "home",
          name: "adminHome",
          component: () => import("../views/admin-coursesView.vue"),
        },
        {
          path: "manage",
          name: "adminManage",
          component: () => import("../views/admin-manageView.vue"),
        }
      ],
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import("../views/coursesView.vue"),
    },
    {
      path: "/course/:id",
      component: () => import("../views/courseView.vue"),
    },
    {
      path: "/shoppingMall",
      name: "shoppingMall",
      component: () => import("../views/shoppingMallView.vue"),
    },
    {
      path: "/product/:id",
      component: () => import("../views/productView.vue"),
    },
    {
      path: "/shopCart/:id",
      children: [
        {
          path: "list",
          component: () => import("../views/shopCartView.vue"),
        },
        {
          path: "info",
          name: "buyerInfo",
          component: () => import("../views/buyerInfoView.vue"),
        },
      ],
    },
    {
      path: "/knowledge",
      name: "knowledge",
      component: () => import("../views/knowledgeView.vue"),
    },
  ],
});
router.afterEach(() => {
  window.scrollTo(0, 0);
});
export default router;
