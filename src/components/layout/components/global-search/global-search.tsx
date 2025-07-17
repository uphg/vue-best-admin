import { NEmpty, NIcon, NInput, NList, NModal } from 'naive-ui'
import { computed, defineComponent, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import IconFileText from '~icons/lucide/file-text'
import IconSearch from '~icons/lucide/search'
import { useSidebarStore } from '@/stores/sidebar'

interface SearchResult {
  label: string
  path: string
  key: string
  icon?: string
  parent?: string
}

export default defineComponent({
  name: 'GlobalSearch',
  setup() {
    const router = useRouter()
    const sidebarStore = useSidebarStore()
    const showModal = ref(false)
    const searchQuery = ref('')
    const selectedIndex = ref(0)
    const inputRef = ref<InstanceType<typeof NInput>>()

    // Get all searchable menu items
    const searchableItems = computed(() => {
      const items: SearchResult[] = []

      const extractItems = (menus: any[], parent?: string) => {
        menus.forEach((menu) => {
          if (menu.matchs && menu.matchs.length > 0) {
            menu.matchs.forEach((match: any) => {
              items.push({
                label: match.meta?.title || match.label || menu.label,
                path: match.path,
                key: match.name || match.key,
                icon: menu.icon,
                parent,
              })
            })
          }

          if (menu.children && menu.children.length > 0) {
            extractItems(menu.children, menu.label)
          }
        })
      }

      if (sidebarStore.menus) {
        extractItems(sidebarStore.menus)
      }

      return items
    })

    // Filter search results
    const searchResults = computed(() => {
      if (!searchQuery.value.trim()) {
        return searchableItems.value.slice(0, 10)
      }

      const query = searchQuery.value.toLowerCase()
      return searchableItems.value.filter(item =>
        item.label.toLowerCase().includes(query)
        || item.path.toLowerCase().includes(query),
      ).slice(0, 10)
    })

    // Watch search results to reset selection
    watch(searchResults, () => {
      selectedIndex.value = 0
    })

    // Open modal
    const openModal = () => {
      showModal.value = true
      nextTick(() => {
        inputRef.value?.focus()
      })
    }

    // Close modal
    const closeModal = () => {
      showModal.value = false
      searchQuery.value = ''
      selectedIndex.value = 0
    }

    // Navigate to selected item
    const navigateToItem = (item: SearchResult) => {
      router.push(item.path)
      closeModal()
    }

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showModal.value) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          selectedIndex.value = Math.min(
            selectedIndex.value + 1,
            searchResults.value.length - 1,
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
          break
        case 'Enter':
          e.preventDefault()
          if (searchResults.value[selectedIndex.value]) {
            navigateToItem(searchResults.value[selectedIndex.value])
          }
          break
        case 'Escape':
          e.preventDefault()
          closeModal()
          break
      }
    }

    // Handle global keyboard shortcut
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        openModal()
      }
    }

    // Setup global keyboard listener
    onMounted(() => {
      window.addEventListener('keydown', handleGlobalKeyDown)
    })

    onUnmounted(() => {
      window.removeEventListener('keydown', handleGlobalKeyDown)
    })

    return {
      showModal,
      searchQuery,
      selectedIndex,
      searchResults,
      inputRef,
      openModal,
      closeModal,
      navigateToItem,
      handleKeyDown,
    }
  },
  render() {
    return (
      <>
        {/* Search trigger */}
        <div
          class="px-3 py-2 rounded-lg flex gap-2 cursor-pointer transition-colors items-center hover:bg-gray-100"
          onClick={this.openModal}
        >
          <NIcon size={16}>
            <IconSearch />
          </NIcon>
          <span class="text-sm text-gray-600">搜索菜单...</span>
          <kbd class="text-xs px-2 py-1 border border-gray-200 rounded bg-gray-100">
            {navigator.userAgent.includes('Mac') ? '⌘' : 'Ctrl'} K
          </kbd>
        </div>

        {/* Search modal */}
        <NModal
          v-model:show={this.showModal}
          preset="card"
          class="max-h-[500px] w-[600px]"
          title="全局搜索"
          onClose={this.closeModal}
          maskClosable={true}
        >
          <div class="space-y-4" onKeydown={this.handleKeyDown}>
            <NInput
              ref="inputRef"
              v-model:value={this.searchQuery}
              placeholder="输入菜单名称或路径搜索..."
              v-slots={{
                prefix: () => (
                  <NIcon size={16}>
                    <IconSearch />
                  </NIcon>
                ),
              }}
            />

            <div class="max-h-[350px] overflow-y-auto">
              {this.searchResults.length > 0
                ? (
                    <NList hoverable clickable>
                      {this.searchResults.map((item, index) => (
                        <div
                          key={item.key}
                          class={[
                            'cursor-pointer transition-colors p-3',
                            index === this.selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50',
                          ]}
                          onClick={() => this.navigateToItem(item)}
                        >
                          <div class="flex gap-3 items-center">
                            <NIcon size={20}>
                              <IconFileText />
                            </NIcon>
                            <div class="flex-1">
                              <div class="font-medium">{item.label}</div>
                              <div class="text-sm text-gray-500">
                                {item.parent && <span>{item.parent} / </span>}
                                <span>{item.path}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </NList>
                  )
                : (
                    <NEmpty
                      description={this.searchQuery ? '没有找到匹配的菜单' : '开始输入搜索菜单'}
                      class="py-8"
                    />
                  )}
            </div>
          </div>
        </NModal>
      </>
    )
  },
})
