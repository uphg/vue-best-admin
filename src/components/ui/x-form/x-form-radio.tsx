import { NFormItem, NRadioGroup, NRadio } from 'naive-ui'
import type { XFormRadioBaseProps } from './types'
import { extractFormItemProps, mergeDefaultProps } from './utils'

const XFormRadio = defineComponent<XFormRadioBaseProps>({
  name: 'XFormRadio',
  props: {
    label: String,
    path: String,
    value: null,
    options: { type: Array, default: () => [] },
    disabled: Boolean,
    size: String,
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
        'radio',
        otherProps
      )
    })

    // 单选框组属性（排除 value、options 和事件处理）
    const radioProps = computed(() => {
      const { value, options, ...rest } = mergedProps.value
      return rest
    })

    // 处理值更新
    const handleUpdateValue = (value: any) => {
      emit('update:value', value)
    }

    return () => (
      <NFormItem {...formItemProps}>
        <NRadioGroup
          {...radioProps.value}
          value={props.value}
          onUpdate:value={handleUpdateValue}
        >
          {props.options?.map((option: any) => (
            <NRadio key={option.value} value={option.value} {...option}>
              {option.label}
            </NRadio>
          ))}
        </NRadioGroup>
      </NFormItem>
    )
  }
})

export default XFormRadio