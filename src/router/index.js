import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/frontLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/indexView.vue')
        },
        {
          path: 'login',
          component: () => import('../views/loginView.vue')
        },
        {
          path: 'user',
          children: [
            {
              path: '',
              name: '會員首頁',
              component: () => import('../views/userView.vue')
            },
            {
              path: 'orders',
              name: '訂單詳情',
              component: () => import('../views/ordersView.vue')
            },
            {
              path: 'collects',
              name: '收藏項目',
              component: () => import('../views/collectsView.vue')
            },
            {
              path: 'reserve',
              name: '課程預約',
              component: () => import('../views/reserveView.vue')
            }
          ]
        },
        {
          path: 'courses',
          component: () => import('../views/coursesView.vue')
        },
        {
          path: 'course/:id',
          component: () => import('../views/courseView.vue')
        },
        {
          path: 'shoppingMall',
          name: 'shoppingMall',
          component: () => import('../views/shoppingMallView.vue')
        },
        {
          path: 'product/:id',
          component: () => import('../views/productView.vue')
        },
        {
          path: 'activity/:id',
          component: () => import('../views/activityView.vue')
        },
        {
          path: 'shopCart',
          children: [
            {
              path: '',
              name: 'shopCart',
              component: () => import('../views/shopCartView.vue')
            },
            {
              path: 'info',
              name: 'buyerInfo',
              component: () => import('../views/buyerInfoView.vue')
            }
          ]
        },
        {
          path: 'knowledge',
          component: () => import('../views/knowledgeView.vue')
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('../views/admin/backstageLayout.vue'),
      children: [
        {
          path: '',
          name: '課程列表',
          component: () => import('../views/admin/admin-coursesView.vue')
        },
        {
          path: 'user',
          component: () => import('../views/userView.vue')
        },
        {
          path: 'discount',
          name: '折扣碼',
          component: () => import('../views/admin/admin-discountsView.vue')
        },
        {
          path: 'manage',
          component: () => import('../views/admin/manageLayout.vue'),
          children: [
            {
              path: 'products',
              name: '商品',
              component: () => import('../views/admin/admin-products.vue')
            },
            {
              path: 'orders',
              name: '訂單',
              component: () => import('../views/admin/admin-orders.vue')
            },
            {
              path: 'activities',
              name: '活動',
              component: () => import('../views/admin/admin-activities.vue')
            }
          ]
        },
        {
          path: 'analyze',
          name: '數據分析',
          component: () => import('../views/admin/admin-analyzeView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/frontLayout.vue'),
      children: [{ path: '', component: () => import('../views/notFound.vue') }]
    }
  ]
})
router.afterEach(() => {
  window.scrollTo(0, 0)
})
export default router
