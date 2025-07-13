import { defineStore } from 'pinia'

export type SidebarStore = ReturnType<typeof useSidebarStore>

export const useSidebarStore = defineStore('sidebar', () => {
  const inverted = ref(false)
  const collapsed = ref(false)
  const menuMap = ref(new Map<string, any>())

  // Example menu options, replace with your actual menu data
  const menus = ref([
    { label: 'Home', key: '/home', icon: 'home' },
    { label: 'About', key: '/about', icon: 'info' },
    { label: 'Contact', key: '/contact', icon: 'phone' },
  ])

  function toggleSidebar() {
    collapsed.value = !collapsed.value
  }

  function setInverted(value: boolean) {
    inverted.value = value
  }

  function setCollapsed(value: boolean) {
    collapsed.value = value
  }

  function setMenus(value: Array<any>) {
    menus.value = value
  }

  function setMenuMap(map: Map<string, any>) {
    menuMap.value = map
  }

  return {
    inverted,
    collapsed,
    menus,
    menuMap,
    toggleSidebar,
    setInverted,
    setCollapsed,
    setMenus,
    setMenuMap,
  }
})
