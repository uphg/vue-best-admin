import { NBreadcrumb, NBreadcrumbItem, NDropdown } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebar'

export default defineComponent({
  name: 'BreadcrumbComponent',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const sidebar = useSidebarStore()

    const breadItems = computed(
      () => {
        const current = sidebar.menuMap?.get(route?.name as string)
        console.log('current')
        console.log(current)
        const matchs = current?.matchs.filter(item => !!item?.name)
        const result = matchs.map(({ meta, path, name, children }: any) => ({
          label: meta?.title,
          key: path,
          name,
          children,
        }))
        return result
      },
    )

    function getDropOptions(item: any) {
      return sidebar.menuMap?.get(item.name)?.children || []
    }

    function handleDropSelect(name: string) {
      router.push({ name })
    }

    return () => (
      <NBreadcrumb>
        {breadItems.value.map((item, index) => (
          <NBreadcrumbItem key={item.key}>
            <NDropdown
              options={index < breadItems.value.length - 1 ? getDropOptions(item) : []}
              onSelect={handleDropSelect}
            >
              <div class="m--1 p-1 border-inherit flex items-center">
                {item.label}
              </div>
            </NDropdown>
          </NBreadcrumbItem>
        ))}
      </NBreadcrumb>
    )
  },
})
