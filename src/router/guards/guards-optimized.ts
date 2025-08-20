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

// 权限加载状态管理 - 函数式版本
interface PermissionState {
  isLoading: boolean
  hasLoaded: boolean
  loadPromise: Promise<void> | null
}

// 创建权限状态
function createPermissionState(): PermissionState {
  return {
    isLoading: false,
    hasLoaded: false,
    loadPromise: null,
  }
}

// 全局权限状态
const permissionState = createPermissionState()

// 加载权限信息的核心逻辑
async function doLoadPermissionInfo(
  router: Router,
  { userStore, sidebarStore }: { userStore: UserStore, sidebarStore: SidebarStore },
): Promise<void> {
  try {
    // 并行请求用户信息和路由数据
    const [routeDataRes, userInfoRes] = await Promise.all([
      apiGetRouteData(),
      apiGetUserInfo(),
    ])

    // 创建异步路由
    const routes = createAsyncRoutes(routeDataRes.data)
    const menuData = [...constantRoutes, ...routes]

    // 创建侧边栏菜单
    const { menus, menusMap } = createSidebarMenus(menuData)

    // 更新 store 状态
    sidebarStore.setMenuMap(menusMap)
    sidebarStore.setMenus(menus)
    userStore.set(userInfoRes.data)

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

// 加载权限信息
async function loadPermissionInfo(
  router: Router,
  stores: { userStore: UserStore, sidebarStore: SidebarStore },
): Promise<void> {
  // 如果已经加载过，直接返回
  if (permissionState.hasLoaded) {
    return
  }

  // 如果正在加载，返回当前的加载 Promise
  if (permissionState.isLoading && permissionState.loadPromise) {
    return permissionState.loadPromise
  }

  // 开始新的加载过程
  permissionState.isLoading = true
  permissionState.loadPromise = doLoadPermissionInfo(router, stores)

  try {
    await permissionState.loadPromise
    permissionState.hasLoaded = true
  } catch (error) {
    // 加载失败时重置状态，允许重试
    resetPermissionState()
    throw error
  } finally {
    permissionState.isLoading = false
  }
}

// 重置权限状态
function resetPermissionState(): void {
  permissionState.isLoading = false
  permissionState.hasLoaded = false
  permissionState.loadPromise = null
}

// 获取权限加载状态
function getPermissionLoadingState(): boolean {
  return permissionState.isLoading
}

// 获取权限是否已加载
function getPermissionLoadedState(): boolean {
  return permissionState.hasLoaded
}

export function loadRouterGuard(router: Router) {
  const userStore = useUserStore()
  const sidebarStore = useSidebarStore()

  router.beforeEach(async (to, from) => {
    try {
      // 如果用户已登录且权限已加载
      if (userStore.id && getPermissionLoadedState()) {
        return handlePermissionRoute(to, from)
      }

      const token = getToken()
      if (!token) {
        return handleCommonRoute(to, from)
      }

      // 如果有 token 但权限未加载
      if (!getPermissionLoadedState()) {
        await loadPermissionInfo(router, { userStore, sidebarStore })
        // 权限信息加载完成后，重新导航到目标路由
        return { ...to, replace: true }
      }

      return true
    } catch (error) {
      console.error('Router guard error:', error)
      // 发生错误时清除用户状态并跳转到登录页
      userStore.clear()
      sidebarStore.clear?.()
      resetPermissionState()

      if (to.name !== 'Login') {
        return '/login'
      }
      return true
    }
  })

  // 监听用户登出，重置权限加载状态
  watch(() => userStore.id, (newId, oldId) => {
    if (oldId && !newId) {
      // 用户登出时重置权限加载器
      resetPermissionState()
    }
  })
}

function handleCommonRoute(to: RouteLocationNormalizedLoaded, _from: RouteLocationNormalized) {
  if (to?.name && commonRoutes.includes(to.name)) {
    return true
  } else {
    return '/login'
  }
}

function handlePermissionRoute(to: RouteLocationNormalizedLoaded, from: RouteLocationNormalized) {
  if (to?.name && commonRoutes.includes(to.name)) {
    return '/home'
  }
  return true
}

function isLinkRoute(route: RouteRecordRaw): boolean {
  return Boolean(route?.meta?.link)
}

// 导出权限相关的工具函数
export {
  getPermissionLoadedState,
  getPermissionLoadingState,
  loadPermissionInfo,
  resetPermissionState as resetPermission,
}
