import { createRouter, createWebHistory } from 'vue-router';
import Edit from '@/views/Edit.vue';
import Achievements from '@/views/Achievements.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home-view" */ '../views/HomeView.vue'),
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit,
    },
    {
      path: '/achievements',
      name: 'Achievements',
      component: Achievements,
    },
  ],
});

export default router;
