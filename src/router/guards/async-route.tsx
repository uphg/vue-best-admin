import type { Component } from 'vue'
import type { JSX } from 'vue/jsx-runtime'
import { NIcon } from 'naive-ui'
import { h } from 'vue'
import IconArrowUpRight from '~icons/lucide/arrow-up-right'
import IconAudioWaveform from '~icons/lucide/audio-waveform'
import IconGlobe from '~icons/lucide/globe'
import IconLayoutList from '~icons/lucide/layout-list'
import IconLink from '~icons/lucide/link'
import IconSettings from '~icons/lucide/settings'
import IconShell from '~icons/lucide/shell'
import IconUser from '~icons/lucide/user'
import IconUserCog from '~icons/lucide/user-cog'
import IconUserSearch from '~icons/lucide/user-search'
import LayoutDefault from '@/components/layout/layout-default'
import LayoutInnerLink from '@/components/layout/layout-inner-link'
import LayoutParentView from '@/components/layout/layout-parent-view'

const pagesModule = import.meta.glob('@/pages/**/*-page.tsx')

const layoutsMap: { [key: string]: any } = {
  Default: LayoutDefault,
  ParentView: LayoutParentView,
  InnerLink: LayoutInnerLink,
}

const iconsMap = createIconsMap({
  'user-search': IconUserSearch,
  'audio-waveform': IconAudioWaveform,
  'arrow-up-right': IconArrowUpRight,
  'settings': IconSettings,
  'user': IconUser,
  'user-cog': IconUserCog,
  'layout-list': IconLayoutList,
  'globe': IconGlobe,
  'link': IconLink,
  'shell': IconShell,
})

/**
 * 创建异步路由
 * @param data 路由数据
 * @returns 异步路由数据
 */
export function createAsyncRoutes(data: any[]) {
  const routes = cloneJSON(data)
  return baseCreateRoutes(routes)
}

function baseCreateRoutes(routes: any[], paths: any[] = []) {
  const result: any[] = []
  for (const route of routes) {
    const { component, children, path, name, ...rest } = route
    const newComponent = getComponent(component)
    const newPaths = [...paths, path]
    const item: any = {
      component: newComponent,
      path,
      name: name ?? convertToPascalCase(newPaths),
      ...rest,
    }
    if (children) {
      item.children = baseCreateRoutes(children, newPaths)
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
  const menusMap = new Map()
  const menus = baseCreateMenus(routes, menusMap)
  return { menus, menusMap }
}

function baseCreateMenus(routes: any[], menusMap: Map<string, any>, options?: { paths: string[], matchs: any[] }) {
  const { paths = [], matchs = [] } = options ?? {}
  const menus: any[] = []
  for (const route of routes) {
    const { path, name, meta, children, hidden, ...rest } = (route?.mergeSingleChild ? getOnlyChildMenu(route) : route) ?? {}
    if (hidden === true) continue
    const newPaths = [...paths, path]
    const newPath = pathJoin(newPaths)
    const item: any = {
      label: meta?.title,
      key: name,
      path: newPath,
      type: 'item',
      icon: meta?.icon && iconsMap?.[meta.icon],
      show: hidden !== true,
      matchs: [...matchs, { meta, path, name }],
      ...rest,
    }
    menusMap.set(item.key, item)
    if (children) {
      item.type = 'submenu'
      item.children = baseCreateMenus(children, menusMap, { paths: newPaths, matchs: item.matchs })
    }
    menus.push(item)
  }
  return menus
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
    const firstVisibleChild = visibleChildren[0]
    const path = pathJoin([route.path, firstVisibleChild.path])
    child = { ...firstVisibleChild, path }
  }
  return child
}

function pathJoin(paths: string[]) {
  const validPaths = paths.filter(isUnnil)
  return validPaths.length > 0 ? `/${validPaths.join('/').replace(/^\//, '')}` : '/'
}

function isUnnil(value: any): value is string {
  return value !== undefined && value !== null && value !== ''
}

function cloneJSON<T extends object>(json: T): T {
  return JSON.parse(JSON.stringify(json))
}

/**
 * 将字符串数组转换为 PascalCase 格式的字符串（首字母大写，无分隔符）
 * @param arr 输入字符串数组，可能包含路径（/）、连字符（-）或空格
 * @returns 转换后的 PascalCase 字符串，自动忽略空项
 */
function convertToPascalCase(arr: string[]): string {
  return arr
    .filter(item => item?.trim().length > 0)
    .flatMap((item) => {
      return item.split(/[/\- ]+/)
        .filter(part => part.trim().length > 0)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    })
    .join('')
}

function createIconsMap(iconsMap: Record<string, Component>) {
  const icons = Object.entries(iconsMap)
  const result: Record<string, () => JSX.Element> = {}
  for (const [key, value] of icons) {
    result[key] = createRenderIcon(value)
  }

  return result
}

function createRenderIcon(icon: Component) {
  return () => (
    <NIcon>
      {h(icon)}
    </NIcon>
  )
}
