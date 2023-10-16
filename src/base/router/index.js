// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { AuthRoutes } from '@/auth/routes'

const routes = [
  {
    path: '/',
    component: () => import('@/base/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/base/views/Home.vue'),
      },
      ...AuthRoutes
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
