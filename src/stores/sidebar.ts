import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('counter', () => {
  const collapsed = ref(false)
  function setCollapsed(value: boolean) {
    collapsed.value = value
  }

  function toggleCollapsed() {
    collapsed.value = !collapsed.value
  }

  return { collapsed, setCollapsed, toggleCollapsed }
})
