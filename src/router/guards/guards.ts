import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, Router, RouteRecordRaw } from 'vue-router'
import type { SidebarStore } from '@/stores/sidebar'
import type { UserStore } from '@/stores/user'
import { apiGetRouteData, apiGetUserInfo } from '@/api/user'
import { useSidebarStore } from '@/stores/sidebar'
import { useUserStore } from '@/stores/user'
import { getToken } from '@/utils/token'
import { constantRoutes } from '../routes'
import { createAsyncRoutes, createSidebarMenus } from './async-route'

const commonRoutes: (string | symbol)[] = ['Login', '404']

export function loadRouterGuard(router: Router) {
  const userStore = useUserStore()
  const sidebarStore = useSidebarStore()
  let hasLoadedPermission = false

  router.beforeEach(async (to, from) => {
    if (userStore.id) {
      return toPermissionRoute(to, from)
    }
    const token = getToken()
    if (!token) {
      return toCommonRoute(to, from)
    }

    if (!hasLoadedPermission) {
      hasLoadedPermission = true
      await loadPermissionInfo(router, { userStore, sidebarStore })
      // 权限信息加载完成后，重新导航到目标路由
      return { ...to, replace: true }
    }

    return true
  })
}

async function loadPermissionInfo(router: Router, { userStore, sidebarStore }: { userStore: UserStore, sidebarStore: SidebarStore }) {
  const routeDataRes = await apiGetRouteData()
  const userInfoRes = await apiGetUserInfo()
  const routes = createAsyncRoutes(routeDataRes.data)
  const menuData = (constantRoutes as any[]).concat(routes)

  const { menus, menusMap } = createSidebarMenus(menuData)

  sidebarStore.setMenuMap(menusMap)
  sidebarStore.setMenus(menus)
  userStore.set(userInfoRes.data)

  routes.forEach((route) => {
    if (isLinkRoute(route)) return
    router.addRoute(route)
  })
}

function toCommonRoute(to: RouteLocationNormalizedLoaded, _from: RouteLocationNormalized) {
  if (to?.name && commonRoutes.includes(to.name)) {
    return true
  } else {
    return '/login'
  }
}

function toPermissionRoute(to: RouteLocationNormalizedLoaded, from: RouteLocationNormalized) {
  if (to?.name && commonRoutes.includes(to.name)) {
    return '/home'
  }
  return true
}

function isLinkRoute(route: RouteRecordRaw) {
  return route?.meta?.link
}
