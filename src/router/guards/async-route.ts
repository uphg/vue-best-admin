import LayoutDefault from '@/components/layout/layout-default'
import LayoutInnerLink from '@/components/layout/layout-inner-link'
import LayoutParentView from '@/components/layout/layout-parent-view'

const pagesModule = import.meta.glob('@/pages/**/*-page.tsx')

const layoutsMap: { [key: string]: any } = {
  Layout: LayoutDefault,
  ParentView: LayoutParentView,
  InnerLink: LayoutInnerLink,
}

/**
 * iconsMap 是根据 @/mocks/common 中的 routeDate 中 meta.icon 生成的图标映射
 */
const iconsMap: { [key: string]: any } = {
  'user-search': () => import('~icons/lucide/user-search'),
  'audio-waveform': () => import('~icons/lucide/audio-waveform'),
  'arrow-up-right': () => import('~icons/lucide/arrow-up-right'),
  'settings': () => import('~icons/lucide/settings'),
  'user': () => import('~icons/lucide/user'),
  'user-cog': () => import('~icons/lucide/user-cog'),
  'layout-list': () => import('~icons/lucide/layout-list'),
  'globe': () => import('~icons/lucide/globe'),
  'link': () => import('~icons/lucide/link'),
}

/**
 * 创建异步路由
 * @param data 路由数据
 * @returns 异步路由数据
 */
export function createAsyncRoutes(data: any[]) {
  const routes = cloneJSON(data)
  return baseCreateRoutes(routes)
}

function baseCreateRoutes(routes: any[]) {
  const result: any[] = []
  for (const route of routes) {
    const { component, children, ...rest } = route
    const newComponent = getComponent(component)
    const item: any = {
      component: newComponent,
      ...rest,
    }

    if (children) {
      item.children = baseCreateRoutes(children)
    }
    result.push(item)
  }
  return result
}

/**
 * 创建侧边栏菜单
 * @param data 路由数据
 * @returns 侧边栏菜单数据
 */
export function createSidebarMenus(data: any[]) {
  const routes = cloneJSON(data)
  return baseCreateMenus(routes)
}

function baseCreateMenus(routes: any[], parentPaths: string[] = [], matchs: any[] = []) {
  const menus: any[] = []
  for (const route of routes) {
    const { path, name, meta, children, hidden, ...rest } = (route?.mergeSingleChild ? getOnlyChildMenu(route) : route) ?? {}
    if (hidden === true) continue
    const pathList = [...parentPaths, path]

    const newPath = pathJoin(pathList)
    const item: any = {
      label: meta?.title,
      key: name,
      path: newPath,
      type: 'item',
      show: hidden !== true,
      matchs: [...matchs, { meta, path, name }],
      ...rest,
    }
    if (children) {
      item.type = 'submenu'
      item.children = baseCreateMenus(children, pathList, item.matchs)
    }
    menus.push(item)
  }
  return menus
}

export function createSidebarMenuMap(data: any[], map: Map<string, any> = new Map()) {
  // menus to map
  const menus = createSidebarMenus(data)
  for (const menu of menus) {
    map.set(menu.key, menu)
    if (menu.children) {
      createSidebarMenuMap(menu.children, map)
    }
  }
  return map
}

function getComponent(componentPath: string) {
  const layout = layoutsMap?.[componentPath]
  if (layout) return layout
  const path = componentPath.replace(/^views\/|\.vue$/g, '')
  return pagesModule[`/src/pages/${path}.tsx`]
}

function getOnlyChildMenu(route: any) {
  if (!route.children?.length) return route
  let child = route
  while (child?.children?.length) {
    const visibleChildren = child.children.filter((item: any) => item.hidden !== true)
    if (visibleChildren.length === 0) break
    child = visibleChildren[0]
  }
  return child
}

function pathJoin(paths: string[]) {
  return `/${paths.filter(isUnnil).join('/').replace(/^\//, '')}`
}

function isUnnil(value: any) {
  return value !== undefined && value !== null
}

function cloneJSON<T extends object>(json: T): T {
  return JSON.parse(JSON.stringify(json))
}
