import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/stock",
      name: "stock",
      component: () => import("../views/StockView.vue"),
    },
    {
      path: "/filterStock",
      name: "filterStock",
      component: () => import("../views/FilterStockView.vue"),
    },
    {
      path: "/igView",
      name: "igView",
      component: () => import("../views/IgView.vue"),
    },
    {
      path: "/news",
      name: "news",
      component: () => import("../views/FinanceNewsView.vue"),
      // children: [
      //   {
      //     path: 'yahooInternational',
      //     component: () => import('../components/Stock/StockNewsList.vue'),
      //   },
      //   {
      //     path: 'yahooTwStock',
      //     component: () => import('../components/Stock/StockNewsList.vue'),
      //   },
      //   {
      //     path: 'yahooHot',
      //     component: () => import('../components/Stock/StockNewsList.vue'),
      //   },
      //   {
      //     path: 'anueNews',
      //     component: () => import('../components/Stock/StockNewsList.vue'),
      //   },
      //   {
      //     path: 'pttStock',
      //     component: () => import('../components/Stock/StockNewsList.vue'),
      //   },
      // ],
    },
  ],
});

export default router;
