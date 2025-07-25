import { NEmpty, NIcon, NList, NModal } from 'naive-ui'
import IconFileText from '~icons/lucide/file-text'
import IconSearch from '~icons/lucide/search'
import PureInput from '@/components/ui/pure-input/pure-input.jsx'
import { useSidebarStore } from '@/stores/sidebar'

/**
 * @typedef {object} SearchResult
 * @property {string} label 菜单标签
 * @property {string} path 路径
 * @property {string} key 唯一标识
 * @property {string} [icon] 图标
 * @property {string} [parent] 父级菜单
 */

export default defineComponent({
  name: 'GlobalSearch',
  inheritAttrs: false,
  setup(props, { attrs }) {
    const router = useRouter()
    const sidebarStore = useSidebarStore()
    const showModal = ref(false)
    const searchQuery = ref('')
    const selectedIndex = ref(0)
    /** @type {import('vue').Ref<any>} */
    const inputRef = ref()

    // Get all searchable menu items
    const searchableItems = computed(() => {
      /** @type {SearchResult[]} */
      const items = []

      /**
       * 递归提取菜单项
       * @param {any[]} menus 菜单数组
       * @param {string} [parent] 父级标题
       */
      const extractItems = (menus, parent) => {
        menus.forEach((menu) => {
          if (menu.matchs && menu.matchs.length > 0) {
            menu.matchs.forEach((match) => {
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

    /**
     * 导航到选中的菜单项
     * @param {SearchResult} item 菜单项
     */
    const navigateToItem = (item) => {
      router.push(item.path)
      closeModal()
    }

    /**
     * 处理键盘导航
     * @param {KeyboardEvent} e 键盘事件
     */
    const handleKeyDown = (e) => {
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

    /**
     * 处理全局键盘快捷键
     * @param {KeyboardEvent} e 键盘事件
     */
    const handleGlobalKeyDown = (e) => {
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

    return () => (
      <>
        <div
          class="px-3 py-2 rounded-lg flex gap-2 cursor-pointer transition-colors items-center hover:bg-gray-100"
          onClick={openModal}
          {...attrs}
        >
          <NIcon size={16}>
            <IconSearch />
          </NIcon>
          <span class="text-sm text-gray-600">搜索菜单...</span>
          <kbd class="text-xs px-2 py-1 border border-gray-200 rounded bg-gray-100">
            {navigator.userAgent.includes('Mac') ? '⌘' : 'Ctrl'} K
          </kbd>
        </div>

        <NModal
          v-model:show={showModal}
          class="max-h-[500px] w-[600px]"
        >
          <div class="bg-white space-y-4" onKeydown={handleKeyDown}>
            <div class="px-3 pt-3">
              <PureInput
                class="font-size-5 h-14 w-full"
                ref={inputRef}
                v-model:value={searchQuery.value}
                placeholder="输入菜单名称或路径搜索..."
                v-slots={{
                  prefix: () => (
                    <NIcon size={16}>
                      <IconSearch />
                    </NIcon>
                  ),
                }}
              />
            </div>

            <div class="max-h-[350px] overflow-y-auto">
              {searchResults.value.length > 0
                ? (
                    <NList hoverable clickable>
                      {searchResults.value.map((item, index) => (
                        <div
                          key={item.key}
                          class={[
                            'cursor-pointer transition-colors p-3',
                            index === selectedIndex.value ? 'bg-blue-50' : 'hover:bg-gray-50',
                          ]}
                          onClick={() => navigateToItem(item)}
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
                      description={searchQuery.value ? '没有找到匹配的菜单' : '开始输入搜索菜单'}
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
