import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, Router } from 'vue-router'
import type { SidebarStore } from '@/stores/sidebar'
import type { UserStore } from '@/stores/user'
import { apiGetRouteData, apiGetUserInfo } from '@/api/user'
import { useSidebarStore } from '@/stores/sidebar'
import { useUserStore } from '@/stores/user'
import { getToken } from '@/utils/token'
import { constantRoutes } from '../router'
import { createAsyncRoutes, createSidebarMenuMap, createSidebarMenus } from './async-route'

const commonRoutes: (string | symbol)[] = ['Login', '404']

export function loadRouterGuard(router: Router) {
  const userStore = useUserStore()
  const sidebarStore = useSidebarStore()
  router.beforeEach(async (to, from) => {
    if (userStore.id) {
      return toPermissionRoute(to, from)
    }
    const token = getToken()
    if (!token) {
      return toCommonRoute(to, from)
    }
    await loadPermissionInfo(router, { userStore, sidebarStore })
    return { ...to, replace: true }
  })
}

async function loadPermissionInfo(router: Router, { userStore, sidebarStore }: { userStore: UserStore, sidebarStore: SidebarStore }) {
  const routeDataRes = await apiGetRouteData()
  const userInfoRes = await apiGetUserInfo()
  const routes = createAsyncRoutes(routeDataRes.data)
  const menuData = (constantRoutes as any[]).concat(routes)

  const menus = createSidebarMenus(menuData)
  const menuMap = createSidebarMenuMap(menuData)

  sidebarStore.setMenuMap(menuMap)
  sidebarStore.setMenus(menus)
  userStore.set(userInfoRes.data)

  routes.forEach((route) => {
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

function toPermissionRoute(to: RouteLocationNormalizedLoaded, _from: RouteLocationNormalized) {
  if (to?.name && commonRoutes.includes(to.name)) {
    return '/home'
  } else {
    return true
  }
}
