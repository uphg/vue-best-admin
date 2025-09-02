import { NFormItem, NDynamicInput } from 'naive-ui'
import type { XFormDynamicInputBaseProps } from './types'
import { extractFormItemProps, generatePlaceholder, mergeDefaultProps } from './utils'

const XFormDynamicInput = defineComponent<XFormDynamicInputBaseProps>({
  name: 'XFormDynamicInput',
  props: {
    label: String,
    path: String,
    value: { type: Array, default: () => [] },
    autoPlaceholder: { type: Boolean, default: true },
    placeholderPrefix: String,
    placeholder: String,
    min: Number,
    max: Number,
    disabled: Boolean,
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
        'dynamic-input',
        otherProps
      )
    })

    // 动态输入框属性（排除 value、placeholder 和事件处理）
    const dynamicInputProps = computed(() => {
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
        'dynamic-input',
        props.placeholder,
        props.placeholderPrefix ? { input: props.placeholderPrefix, select: props.placeholderPrefix } : undefined
      )
    })

    // 处理值更新
    const handleUpdateValue = (value: string[]) => {
      emit('update:value', value)
    }

    return () => (
      <NFormItem {...formItemProps}>
        <NDynamicInput
          {...dynamicInputProps.value}
          value={props.value}
          placeholder={computedPlaceholder.value}
          onUpdate:value={handleUpdateValue}
        />
      </NFormItem>
    )
  }
})

export default XFormDynamicInput