import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('counter', () => {
  const collapsed = ref(false)
  function setCollapsed(value: boolean) {
    collapsed.value = value
  }

  return { collapsed, setCollapsed }
})
