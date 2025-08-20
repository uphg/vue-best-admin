import { createRouter, createWebHistory } from 'vue-router'
import LayoutDefault from '@/components/layout/layout-default'
import { constantRoutes as baseConstantRoutes } from './routes'

// 处理常量路由，将字符串组件标识转换为实际组件
function processRoutes(routes: any[]): any[] {
  return routes.map((route) => {
    const processedRoute = { ...route }

    // 处理组件
    if (typeof route.component === 'string') {
      if (route.component === 'Default') {
        processedRoute.component = LayoutDefault
      }
      // 可以在这里添加其他布局组件的处理
    }

    // 递归处理子路由
    if (route.children) {
      processedRoute.children = processRoutes(route.children)
    }

    return processedRoute
  })
}

export const constantRoutes = processRoutes(baseConstantRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

export default router
