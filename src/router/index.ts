import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/components/layout/default-layout'
import Home from '@/pages/home/home-page'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home,
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/pages/about/about-page'),
        },
        {
          path: '/icon',
          name: 'icon',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/pages/icon/icon-page'),
        },
        {
          path: '/request',
          name: 'request',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/pages/request/request-page'),
        },
      ],
    },
  ],
})

export default router
