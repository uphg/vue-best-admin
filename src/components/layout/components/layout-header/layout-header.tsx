import { NLayoutHeader } from 'naive-ui'
import GlobalSearch from '../global-search/global-search'
import LayoutNavTags from '../layout-nav-tags/layout-nav-tags'
import SidebarToggle from '../layout-sidebar/sidebar-toggle'
import HeaderBreadcrumb from './header-breadcrumb'
import NotificationButton from './notification-button'
import UserDropdown from './user-dropdown'

const LayoutHeader = defineComponent(() => {
  return () => (
    <NLayoutHeader class="flex flex-col h-[calc(var(--header-height)+var(--nav-tag-height))]">
      <NLayoutHeader class="px-4 flex gap-2 h-[var(--header-height)] items-center" bordered>
        <SidebarToggle />
        <HeaderBreadcrumb />
        <div class="ml-auto flex gap-4 items-center">
          <GlobalSearch class="w-50" />
          <NotificationButton />
          <UserDropdown />
        </div>
      </NLayoutHeader>
      <LayoutNavTags />
    </NLayoutHeader>
  )
})

export default LayoutHeader
