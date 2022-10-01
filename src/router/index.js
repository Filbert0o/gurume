import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { notLoggedInView: true },
      component: () => import(/* webpackChunkName: "home-view" */ '../views/HomeView.vue'),
    },
  ],
});

export default router;
