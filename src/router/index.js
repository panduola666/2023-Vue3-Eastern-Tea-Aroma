import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/FrontLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/IndexView.vue')
        },
        {
          path: 'login',
          component: () => import('../views/LoginView.vue')
        },
        {
          path: 'user',
          children: [
            {
              path: '',
              name: '會員首頁',
              component: () => import('../views/UserView.vue')
            },
            {
              path: 'orders',
              name: 'userOrders',
              component: () => import('../views/OrdersView.vue')
            },
            {
              path: 'collects',
              name: 'collects',
              component: () => import('../views/CollectsView.vue')
            },
            {
              path: 'reserve',
              name: 'reserve',
              component: () => import('../views/ReserveView.vue')
            }
          ]
        },
        {
          path: 'courses',
          component: () => import('../views/CoursesView.vue')
        },
        {
          path: 'course/:id',
          component: () => import('../views/CourseView.vue')
        },
        {
          path: 'shoppingMall',
          name: 'shoppingMall',
          component: () => import('../views/ShoppingMallView.vue')
        },
        {
          path: 'product/:id',
          component: () => import('../views/ProductView.vue')
        },
        {
          path: 'activity/:id',
          component: () => import('../views/ActivityView.vue')
        },
        {
          path: 'shopCart',
          children: [
            {
              path: '',
              name: 'shopCart',
              component: () => import('../views/ShopCartView.vue')
            },
            {
              path: 'info',
              name: 'buyerInfo',
              component: () => import('../views/BuyerInfoView.vue')
            }
          ]
        },
        {
          path: 'knowledge',
          component: () => import('../views/KnowledgeView.vue')
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('../views/admin/BackstageLayout.vue'),
      children: [
        {
          path: '',
          name: 'admin-courses',
          component: () => import('../views/admin/Admin-CoursesView.vue')
        },
        {
          path: 'user',
          component: () => import('../views/UserView.vue')
        },
        {
          path: 'discount',
          name: 'admin-discounts',
          component: () => import('../views/admin/Admin-DiscountsView.vue')
        },
        {
          path: 'manage',
          component: () => import('../views/admin/ManageLayout.vue'),
          children: [
            {
              path: 'products',
              name: 'products',
              component: () => import('../views/admin/Admin-Products.vue')
            },
            {
              path: 'orders',
              name: 'orders',
              component: () => import('../views/admin/Admin-Orders.vue')
            },
            {
              path: 'activities',
              name: 'activities',
              component: () => import('../views/admin/Admin-Activities.vue')
            }
          ]
        },
        {
          path: 'analyze',
          name: 'admin-analyze',
          component: () => import('../views/admin/Admin-AnalyzeView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/FrontLayout.vue'),
      children: [{ path: '', component: () => import('../views/NotFound.vue') }]
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})
export default router
