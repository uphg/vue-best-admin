import { createRouter, createWebHistory } from 'vue-router'
import LayoutDefault from '@/components/layout/layout-default'
import Home from '@/pages/home/home-page'

export const constantRoutes = [
  {
    path: '',
    component: LayoutDefault,
    redirect: '/home',
    mergeSingleChild: true,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: { title: '首页', icon: 'shell', affix: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/pages/login/login-page'),
  },
  {
    path: '/register',
    name: 'Register',
    hidden: true,
    component: () => import('@/pages/register/register-page'),
  },
  {
    path: '/user',
    redirect: 'noredirect',
    hidden: true,
    component: LayoutDefault,
    children: [
      {
        path: 'profile',
        component: () => import('@/pages/user/user-page'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    hidden: true,
    component: () => import('@/pages/error/404'),
  },
  {
    path: '/401',
    name: '401',
    hidden: true,
    component: () => import('@/pages/error/401'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

export default router
