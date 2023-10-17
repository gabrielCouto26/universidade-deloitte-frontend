// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { AuthRoutes } from '@/auth/routes'
import { HomeRoutes } from '@/home/routes'

const routes = [
  {
    path: '/',
    component: () => import('@/base/layouts/default/Default.vue'),
    children: [
      ...AuthRoutes,
      ...HomeRoutes
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
