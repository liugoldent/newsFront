import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // {
    //   path: '/trend',
    //   name: 'trend',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/TrendView.vue')
    // },
    {
      path: '/stock',
      name: 'stock',
      component: () => import('../views/StockView.vue'),
    },
    {
      path: '/filtetstock',
      name: 'filtetstock',
      component: () => import('../views/FilterStockView.vue'),
    },
    {
      path: '/financeNews',
      name: 'financeNews',
      component: () => import('../views/FinanceNewsView.vue'),
      children: [
        {
          path: 'yahooInternational',
          component: () => import('../components/Stock/StockNewsList.vue'),
        },
        {
          path: 'yahooTwStock',
          component: () => import('../components/Stock/StockNewsList.vue'),
        },
        {
          path: 'yahooHot',
          component: () => import('../components/Stock/StockNewsList.vue'),
        },
        {
          path: 'anueNews',
          component: () => import('../components/Stock/StockNewsList.vue'),
        },
        {
          path: 'pttStock',
          component: () => import('../components/Stock/StockNewsList.vue'),
        },
      ],
    },
  ],
})

export default router
