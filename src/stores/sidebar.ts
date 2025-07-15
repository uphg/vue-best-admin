import { defineStore } from 'pinia'

interface MenuItem {
  label: string
  key: string
  icon?: string
  path?: string
  type?: 'item' | 'group' | 'divider'
  children?: MenuItem[]
}

export type SidebarStore = ReturnType<typeof useSidebarStore>

export const useSidebarStore = defineStore('sidebar', () => {
  const inverted = ref(false)
  const collapsed = ref(false)
  const menusMap = ref(new Map<string, MenuItem>())

  // Example menu options, replace with your actual menu data
  const menus = ref<MenuItem[]>([])

  function toggleSidebar() {
    collapsed.value = !collapsed.value
  }

  function setInverted(value: boolean) {
    inverted.value = value
  }

  function setCollapsed(value: boolean) {
    collapsed.value = value
  }

  function setMenus(value: MenuItem[]) {
    menus.value = value
  }

  function setMenuMap(map: Map<string, MenuItem>) {
    menusMap.value = map
  }

  return {
    inverted,
    collapsed,
    menus,
    menusMap,
    toggleSidebar,
    setInverted,
    setCollapsed,
    setMenus,
    setMenuMap,
  }
})
