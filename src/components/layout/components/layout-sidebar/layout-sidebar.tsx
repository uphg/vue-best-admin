import type { MenuOption } from 'naive-ui'
import type { RouteLocationNormalized, RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import { isNil } from 'lodash-es'
import { NIcon, NLayoutContent, NLayoutHeader, NLayoutSider, NMenu } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebar'

const LayoutSidebar = defineComponent(() => {
  const sidebar = useSidebarStore()
  const expandedKeys = ref<string[]>([])
  const selectedKey = ref<string | undefined>()
  const route = useRoute()
  watch(route, handleMenuExpand)

  handleMenuExpand(route)

  function handleMenuExpand(route: RouteLocationNormalized) {
    const { matched, name } = route ?? {}
    expandedKeys.value = getExpandedKeys(matched)
    if (isNil(name)) return
    selectedKey.value = name as string
  }

  function getExpandedKeys(matched: RouteRecordRaw[]) {
    return matched.map(item => item.name as string)
  }

  return () => (
    <NLayoutSider
      v-model:value={selectedKey.value}
      v-model:expanded-keys={expandedKeys.value}
      collapsed={sidebar.collapsed}
      bordered
      showTrigger
      collapseMode="width"
      collapsedWidth={64}
      width={240}
      nativeScrollbar={false}
      contentClass="flex flex-col h-full"
    >
      <NLayoutHeader class="h-15" bordered>Logo</NLayoutHeader>
      <NLayoutContent nativeScrollbar={false}>
        <NMenu
          class="flex-1"
          collapsedWidth={64}
          collapsedIconSize={22}
          options={sidebar.menus}
          render-label={renderMenuLabel}
          render-icon={renderMenuIcon}
        />
      </NLayoutContent>
      {/* <NLayoutFooter class="h-15">
            底部
          </NLayoutFooter> */}
    </NLayoutSider>
  )
})

function renderMenuLabel(option: MenuOption) {
  if ('href' in option) {
    return h('a', { href: option.href, target: '_blank' }, option.label as string)
  }
  return option.type === 'item'
    ? (
        <RouterLink to={option.path as RouteLocationRaw}>
          {option.label}
        </RouterLink>
      )
    : (
        <div>{option.label}</div>
      )
}

function renderMenuIcon(option: MenuOption) {
  // 渲染图标占位符以保持缩进
  if (option.key === 'sheep-man') return true
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === 'food') return null
  if (!option.icon) return
  return (
    <NIcon>
      {h(option.icon)}
    </NIcon>
  )
}

export default LayoutSidebar
