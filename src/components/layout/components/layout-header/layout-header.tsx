import { NLayoutHeader } from 'naive-ui'
import LayoutNavTags from '../layout-nav-tags/layout-nav-tags'
import SidebarToggle from '../layout-sidebar/sidebar-toggle'
import HeaderBreadcrumb from './header-breadcrumb'

const LayoutHeader = defineComponent(() => {
  return () => (
    <NLayoutHeader
      class="h-15"
      bordered
    >
      <div>
        <SidebarToggle />
        <HeaderBreadcrumb />
      </div>
      <LayoutNavTags />
    </NLayoutHeader>
  )
})

export default LayoutHeader
