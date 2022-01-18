import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/invoice/:invoiceId',
    name: 'Invoice',
    component: () => import('../views/Invoice.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;