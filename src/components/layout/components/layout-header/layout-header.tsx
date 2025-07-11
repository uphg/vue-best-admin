import { NLayoutHeader } from 'naive-ui'
import SidebarToggle from '../layout-sidebar/sidebar-toggle'

const LayoutHeader = defineComponent(() => {
  return () => (
    <NLayoutHeader
      class="h-15"
      bordered
    >
      <SidebarToggle />
    </NLayoutHeader>
  )
})

export default LayoutHeader
