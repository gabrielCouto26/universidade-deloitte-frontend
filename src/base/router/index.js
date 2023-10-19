// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { AuthRoutes } from '@/auth/routes'
import { HomeRoutes } from '@/home/routes'
import { GradeRoutes } from '@/grades/routes'
import { DisciplineRoutes } from '@/disciplines/routes'

const routes = [
  {
    path: '/',
    component: () => import('@/base/layouts/default/Default.vue'),
    children: [
      ...AuthRoutes,
      ...HomeRoutes,
      ...GradeRoutes,
      ...DisciplineRoutes
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
