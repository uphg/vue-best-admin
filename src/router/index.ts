import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'
import LayoutDefault from '@/layouts/Default.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LayoutDefault,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: Home,
          name: 'home',
          meta: {
            title: '首页'
          }
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    }
  ]
})

export default router
