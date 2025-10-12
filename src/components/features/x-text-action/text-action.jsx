import { NButton, NIcon } from 'naive-ui'
import IconDownload from '~icons/lucide/download'
import IconEdit from '~icons/lucide/edit'
import IconEye from '~icons/lucide/eye'
import IconPlus from '~icons/lucide/plus'
import IconTrash2 from '~icons/lucide/trash-2'
import IconUpload from '~icons/lucide/upload'

const actionMap = {
  create: { type: 'primary', text: '新增', icon: IconPlus },
  update: { type: 'primary', text: '修改', icon: IconEdit },
  delete: { type: 'error', text: '删除', icon: IconTrash2 },
  import: { type: 'default', text: '导入', icon: IconUpload },
  export: { type: 'default', text: '导出', icon: IconDownload },
  preview: { type: 'info', text: '预览', icon: IconEye },
}

const XTextAction = defineComponent({
  props: {
    type: {
      type: String,
      required: true,
    },
    text: String,
    onClick: Function,
    disabled: Boolean,
    count: [String, Number],
  },
  setup(props, { slots }) {
    const action = actionMap[props.type]
    const text = props.text ?? action.text
    return () => (
      <NButton type={action.type} onClick={props.onClick} disabled={props.disabled} quaternary text>
        { slots.default
          ? slots.default()
          : (
              <>
                <NIcon class="mr-1">
                  <action.icon />
                </NIcon>
                {props.type === 'batchDelete' ? `${text}(${props.count})` : text}
              </>
            )}
      </NButton>
    )
  },
})

export default XTextAction