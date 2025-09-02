import { NFormItem, NTimePicker } from 'naive-ui'
import type { XFormTimePickerBaseProps } from './types'
import { extractFormItemProps, generatePlaceholder, mergeDefaultProps } from './utils'

const XFormTimePicker = defineComponent<XFormTimePickerBaseProps>({
  name: 'XFormTimePicker',
  props: {
    label: String,
    path: String,
    value: [String, Number],
    autoPlaceholder: { type: Boolean, default: true },
    placeholderPrefix: String,
    placeholder: String,
    clearable: Boolean,
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
        'time-picker',
        otherProps
      )
    })

    // 时间选择器属性（排除 value、placeholder 和事件处理）
    const timePickerProps = computed(() => {
      const { value, placeholder, autoPlaceholder, placeholderPrefix, ...rest } = mergedProps.value
      return rest
    })

    // 计算 placeholder
    const computedPlaceholder = computed(() => {
      if (!props.autoPlaceholder) {
        return props.placeholder
      }
      
      return generatePlaceholder(
        props.label,
        'time-picker',
        props.placeholder,
        props.placeholderPrefix ? { input: props.placeholderPrefix, select: props.placeholderPrefix } : undefined
      )
    })

    // 处理值更新
    const handleUpdateValue = (value: number, formattedValue: string) => {
      emit('update:value', formattedValue)
    }

    return () => (
      <NFormItem {...formItemProps}>
        <NTimePicker
          {...timePickerProps.value}
          value={props.value}
          placeholder={computedPlaceholder.value}
          onUpdate:value={handleUpdateValue}
        />
      </NFormItem>
    )
  }
})

export default XFormTimePicker