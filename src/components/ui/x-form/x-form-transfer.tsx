import { NFormItem, NTransfer } from 'naive-ui'
import type { XFormTransferBaseProps } from './types'
import { extractFormItemProps, mergeDefaultProps } from './utils'

const XFormTransfer = defineComponent<XFormTransferBaseProps>({
  name: 'XFormTransfer',
  props: {
    label: String,
    path: String,
    value: { type: Array, default: () => [] },
    options: { type: Array, default: () => [] },
    disabled: Boolean,
    size: String,
    filterable: Boolean,
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
  emits: ['update:value'],
  setup(props, { emit }) {
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
        'transfer',
        otherProps
      )
    })

    // 穿梭框属性（排除 value、options 和事件处理）
    const transferProps = computed(() => {
      const { value, options, ...rest } = mergedProps.value
      return rest
    })

    // 处理值更新
    const handleUpdateValue = (value: any[]) => {
      emit('update:value', value)
    }

    return () => (
      <NFormItem {...formItemProps}>
        <NTransfer
          {...transferProps.value}
          value={props.value}
          options={props.options}
          onUpdate:value={handleUpdateValue}
        />
      </NFormItem>
    )
  }
})

export default XFormTransfer