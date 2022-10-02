import { createRouter, createWebHistory } from 'vue-router';
import Edit from '@/views/Edit.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { notLoggedInView: true },
      component: () => import(/* webpackChunkName: "home-view" */ '../views/HomeView.vue'),
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit,
    },
  ],
});

export default router;
