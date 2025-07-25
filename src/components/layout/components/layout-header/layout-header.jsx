import { NLayoutHeader } from 'naive-ui'
import GlobalSearch from '../global-search/global-search.jsx'
import LayoutNavTags from '../layout-nav-tags/layout-nav-tags.jsx'
import SidebarToggle from '../layout-sidebar/sidebar-toggle.jsx'
import HeaderBreadcrumb from './header-breadcrumb.jsx'
import NotificationButton from './notification-button.jsx'

/**
 * 页面头部布局组件
 * @returns {import('vue').VNode} 组件渲染结果
 */

const LayoutHeader = defineComponent(() => {
  return () => (
    <NLayoutHeader class="flex flex-col h-[calc(var(--header-height)+var(--nav-tag-height))]">
      <NLayoutHeader class="px-4 flex gap-2 h-[var(--header-height)] items-center" bordered>
        <SidebarToggle />
        <HeaderBreadcrumb />
        <div class="ml-auto flex items-center">
          <GlobalSearch class="w-50" />
          <NotificationButton />
        </div>
      </NLayoutHeader>
      <LayoutNavTags />
    </NLayoutHeader>
  )
})

export default LayoutHeader
