import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, Router, RouteRecordRaw } from 'vue-router'
import type { SidebarStore } from '@/stores/sidebar'
import type { UserStore } from '@/stores/user'
import { apiGetRouteData, apiGetUserInfo } from '@/api/user'
import { useSidebarStore } from '@/stores/sidebar'
import { useUserStore } from '@/stores/user'
import { getToken, removeToken } from '@/utils/token'
import { constantRoutes } from '../routes'
import { createAsyncRoutes, createSidebarMenus } from './async-route'

const commonRoutes: (string | symbol)[] = ['Login', '404']

export function loadRouterGuard(router: Router) {
  const userStore = useUserStore()
  const sidebarStore = useSidebarStore()
  let hasPermission = false
  let loadingPromise: Promise<void> | null = null

  router.beforeEach(async (to, from) => {
    try {
      // 如果用户已登录且权限已加载
      if (userStore.id && hasPermission) {
        return toPermissionRoute(to, from)
      }

      const token = getToken()
      if (!token) {
        return toCommonRoute(to, from)
      }

      // 如果正在加载权限信息，等待加载完成
      if (loadingPromise) {
        await loadingPromise
        return { ...to, replace: true }
      }

      // 如果有 token 但权限未加载
      if (!hasPermission) {
        loadingPromise = loadPermissionInfo(router, { userStore, sidebarStore })

        try {
          await loadingPromise
          hasPermission = true
          // 权限信息加载完成后，重新导航到目标路由
          return { ...to, replace: true }
        } catch (error) {
          // 加载失败时清除状态
          hasPermission = false
          throw error
        } finally {
          loadingPromise = null
        }
      }

      return true
    } catch (error) {
      console.error('Router guard error:', error)
      // 发生错误时清除用户状态并跳转到登录页
      userStore.clear()
      hasPermission = false
      loadingPromise = null

      if (to.name !== 'Login') {
        return '/login'
      }
      return true
    }
  })

  // 监听用户登出，重置权限加载状态
  watch(() => userStore.id, (newId, oldId) => {
    if (oldId && !newId) {
      // 用户登出时重置状态
      hasPermission = false
      loadingPromise = null
    }
  })
}

async function loadPermissionInfo(
  router: Router,
  { userStore, sidebarStore }: { userStore: UserStore, sidebarStore: SidebarStore },
): Promise<void> {
  try {
    const { userInfo, routes, menus, menusMap } = await fetchUserAuthAndRoutes()

    // 更新 store 状态
    sidebarStore.setMenuMap(menusMap)
    sidebarStore.setMenus(menus)
    userStore.set(userInfo)

    // 添加动态路由
    routes.forEach((route) => {
      if (!isLinkRoute(route)) {
        router.addRoute(route)
      }
    })
  } catch (error) {
    console.error('Failed to load permission info:', error)
    // 清除无效的 token
    removeToken()
    throw new Error('权限信息加载失败，请重新登录')
  }
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

function isLinkRoute(route: RouteRecordRaw): boolean {
  return Boolean(route?.meta?.link)
}

async function fetchUserAuthAndRoutes() {
  const userInfoRes = await apiGetUserInfo()
  const routeDataRes = await apiGetRouteData()

  const routes = createAsyncRoutes(routeDataRes.data)
  const menuData = [...constantRoutes, ...routes] // 使用展开运算符替代 concat

  const { menus, menusMap } = createSidebarMenus(menuData)

  return { userInfo: userInfoRes.data, routes, menus, menusMap }
}
