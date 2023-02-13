import { createRouter, createWebHashHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/frontLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("../views/indexView.vue"),
        },
        {
          path: "login",
          component: () => import("../views/loginView.vue"),
        },
        {
          path: "user",
          children: [
            {
              path: "",
              name: "會員首頁",
              component: () => import("../views/userView.vue"),
            },
            {
              path: "orders",
              name: "會員訂單",
              component: () => import("../views/ordersView.vue"),
            },
            {
              path: "collects",
              name: "會員收藏",
              component: () => import("../views/collectsView.vue"),
            },
            {
              path: "reserve",
              name: "會員預約",
              component: () => import("../views/reserveView.vue"),
            },
          ],
        },
        {
          path: "courses",
          component: () => import("../views/coursesView.vue"),
        },
        {
          path: "course/:id",
          component: () => import("../views/courseView.vue"),
        },
        {
          path: "shoppingMall",
          name: "shoppingMall",
          component: () => import("../views/shoppingMallView.vue"),
        },
        {
          path: "product/:id",
          component: () => import("../views/productView.vue"),
        },
        {
          path: "shopCart",
          children: [
            {
              path: "",
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
          path: "knowledge",
          component: () => import("../views/knowledgeView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("../views/admin/backstageLayout.vue"),
      children: [
        {
          path: "",
          name: "課程列表",
          component: () => import("../views/admin/admin-coursesView.vue"),
        },
        {
          path: "discount",
          name: "折扣碼",
          component: () => import("../views/admin/admin-discountsView.vue"),
        },
        {
          path: "manage",
          name: "管理項目",
          component: () => import("../views/admin/admin-manageView.vue"),
        },
      ],
    },
  ],
});
router.afterEach(() => {
  window.scrollTo(0, 0);
});
export default router;
