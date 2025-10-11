import type { PropType } from 'vue'
import { NButton, NDropdown, NIcon, NSpace } from 'naive-ui'
import IconDownload from '~icons/lucide/download'
import IconEdit from '~icons/lucide/edit'
import IconEye from '~icons/lucide/eye'
import IconMoreHorizontal from '~icons/lucide/more-horizontal'
import IconPlus from '~icons/lucide/plus'
import IconTrash2 from '~icons/lucide/trash-2'
import IconUpload from '~icons/lucide/upload'
import XAction from '../x-action/action'

type ButtonType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'

const actionMap: Record<string, { type: ButtonType, text: string, icon: any }> = {
  create: { type: 'primary', text: '新增', icon: IconPlus },
  update: { type: 'primary', text: '修改', icon: IconEdit },
  delete: { type: 'error', text: '删除', icon: IconTrash2 },
  import: { type: 'default', text: '导入', icon: IconUpload },
  export: { type: 'default', text: '导出', icon: IconDownload },
  preview: { type: 'info', text: '预览', icon: IconEye },
}

interface Action {
  type: 'create' | 'update' | 'delete' | 'import' | 'export' | 'preview'
  text?: string
  onClick?: () => void
}

const XActionGroup = defineComponent({
  props: {
    actions: {
      type: Array as PropType<Action[]>,
      required: true,
    },
  },
  setup(props) {
    const visibleActions = computed(() => props.actions.slice(0, 3))
    const dropdownActions = computed(() => props.actions.slice(3))

    const getIcon = (type: string) => {
      const IconComponent = actionMap[type].icon
      return () => <NIcon><IconComponent /></NIcon>
    }

    const options = computed(() =>
      dropdownActions.value.map((action, index) => ({
        label: action.text || actionMap[action.type].text,
        key: index.toString(),
        icon: getIcon(action.type),
      })),
    )

    const handleSelect = (key: string) => {
      const index = Number.parseInt(key, 10)
      dropdownActions.value[index]?.onClick?.()
    }

    return () => {
      if (props.actions.length <= 3) {
        return (
          <NSpace>
            {props.actions.map((action, index) => (
              <XAction key={index} {...action} />
            ))}
          </NSpace>
        )
      } else {
        return (
          <NSpace>
            {visibleActions.value.map((action, index) => (
              <XAction key={index} {...action} />
            ))}
            <NDropdown
              options={options.value}
              onSelect={handleSelect}
              trigger="click"
              placement="bottom-end"
            >
              <NButton>
                <NIcon class="mr-1">
                  <IconMoreHorizontal />
                </NIcon>
                更多
              </NButton>
            </NDropdown>
          </NSpace>
        )
      }
    }
  },
})

export default XActionGroup
