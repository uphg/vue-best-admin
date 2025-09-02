import { NFormItem, NUpload } from 'naive-ui'
import type { XFormUploadBaseProps } from './types'
import { extractFormItemProps, mergeDefaultProps } from './utils'

const XFormUpload = defineComponent<XFormUploadBaseProps>({
  name: 'XFormUpload',
  props: {
    label: String,
    path: String,
    fileList: { type: Array, default: () => [] },
    action: String,
    multiple: Boolean,
    accept: String,
    disabled: Boolean,
    max: Number,
    // FormItem props
    rule: [Object, Array],
    first: Boolean,
    ignorePathChange: Boolean,
    showFeedback: Boolean,
    showLabel: Boolean,
    showRequireMark: Boolean,
    requireMarkPlacement: String,
    labelWidth: [String, Number],
    labelAlign: String,
    labelPlacement: String,
    labelStyle: [String, Object],
    feedback: String,
    feedbackClass: String,
    feedbackStyle: [String, Object],
    validationStatus: String,
  },
  emits: ['update:fileList'],
  setup(props, { emit, slots }) {
    // 获取表单上下文
    const formContext = inject('xFormContext', {
      model: ref({}),
      defaultProps: ref({})
    })

    // 提取 FormItem 属性和其他属性
    const { formItemProps, otherProps } = extractFormItemProps(props)

    // 合并默认属性
    const mergedProps = computed(() => {
      return mergeDefaultProps(
        formContext.defaultProps.value,
        'upload',
        otherProps
      )
    })

    // 上传组件属性（排除 fileList 和事件处理）
    const uploadProps = computed(() => {
      const { fileList, ...rest } = mergedProps.value
      return rest
    })

    // 处理文件列表更新
    const handleUpdateFileList = (fileList: any[]) => {
      emit('update:fileList', fileList)
    }

    return () => (
      <NFormItem {...formItemProps}>
        <NUpload
          {...uploadProps.value}
          fileList={props.fileList}
          onUpdate:fileList={handleUpdateFileList}
        >
          {slots.default?.()}
        </NUpload>
      </NFormItem>
    )
  }
})

export default XFormUpload