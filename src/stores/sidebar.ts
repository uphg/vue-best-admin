import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  const inverted = ref(false)
  const collapsed = ref(false)

  // Example menu options, replace with your actual menu data
  const menuOptions = ref([
    { label: 'Home', key: '/home', icon: 'home' },
    { label: 'About', key: '/about', icon: 'info' },
    { label: 'Contact', key: '/contact', icon: 'phone' },
  ])

  function toggleSidebar() {
    collapsed.value = !collapsed.value
  }

  return {
    inverted,
    collapsed,
    menuOptions,
    toggleSidebar,
  }
})
