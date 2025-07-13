import { NIcon, NLayoutContent, NLayoutHeader, NLayoutSider, NMenu } from 'naive-ui'
import IconCommunity from '@/components/icons/IconCommunity.vue'
import IconDocumentation from '@/components/icons/IconDocumentation.vue'
import IconEcosystem from '@/components/icons/IconEcosystem.vue'
import { useSidebarStore } from '@/stores/sidebar'

const menuOptions = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    icon: renderIcon(IconCommunity),
  },
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing2',
    icon: renderIcon(IconCommunity),
  },
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing3',
    icon: renderIcon(IconCommunity),
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(IconCommunity),
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat',
      },
    ],
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    disabled: true,
    icon: renderIcon(IconCommunity),
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(IconCommunity),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(IconDocumentation),
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(IconDocumentation),
          },
        ],
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(IconEcosystem),
        children: [
          {
            label: '威士忌',
            key: 'whisky',
          },
        ],
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich',
          },
        ],
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes',
      },
    ],
  },
]

const LayoutSidebar = defineComponent(() => {
  const sidebar = useSidebarStore()
  const expandedKeys = ref<string[]>([])
  const selectedKey = ref<string | undefined>()

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
        />
      </NLayoutContent>
      {/* <NLayoutFooter class="h-15">
            底部
          </NLayoutFooter> */}
    </NLayoutSider>
  )
})

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

export default LayoutSidebar
