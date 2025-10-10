import type { PropType } from 'vue'
import { NButton, NIcon } from 'naive-ui'
import IconDownload from '~icons/lucide/download'
import IconEdit from '~icons/lucide/edit'
import IconEye from '~icons/lucide/eye'
import IconPlus from '~icons/lucide/plus'
import IconTrash2 from '~icons/lucide/trash-2'
import IconUpload from '~icons/lucide/upload'

type ButtonType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'

const actionMap: Record<string, { type: ButtonType, icon: any }> = {
  create: { type: 'primary', icon: IconPlus },
  update: { type: 'primary', icon: IconEdit },
  delete: { type: 'error', icon: IconTrash2 },
  import: { type: 'default', icon: IconUpload },
  export: { type: 'default', icon: IconDownload },
  preview: { type: 'info', icon: IconEye },
}

const IconAction = defineComponent({
  props: {
    type: {
      type: String as PropType<'create' | 'update' | 'delete' | 'import' | 'export' | 'preview'>,
      required: true,
    },
  },
  setup(props) {
    const action = actionMap[props.type]
    return () => (
      <NButton type={action.type} quaternary>
        <NIcon>
          <action.icon />
        </NIcon>
      </NButton>
    )
  },
})

export default IconAction
