import type { XFormInputBaseProps } from './types'
import { NFormItem, NInput } from 'naive-ui'
import { extractFormItemProps, generatePlaceholder, mergeDefaultProps } from './utils'

const XFormInput = defineComponent<XFormInputBaseProps>({
  name: 'XFormInput',
  props: {
    label: String,
    path: String,
    value: [String, Number, Array],
    autoPlaceholder: { type: Boolean, default: true },
    placeholderPrefix: String,
    placeholder: String,
    type: String,
    clearable: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    size: String,
    maxlength: Number,
    minlength: Number,
    showPasswordOn: String,
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
      defaultProps: ref({}),
    })

    // 提取 FormItem 属性和其他属性
    const { formItemProps, otherProps } = extractFormItemProps(props)

    // 合并默认属性
    const mergedProps = computed(() => {
      return mergeDefaultProps(
        formContext.defaultProps.value,
        'input',
        otherProps,
      )
    })

    // 输入框属性（排除 value 和事件处理）
    const inputProps = computed(() => {
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
        'input',
        props.placeholder,
        props.placeholderPrefix ? { input: props.placeholderPrefix, select: props.placeholderPrefix } : undefined,
      )
    })

    // 处理值更新
    const handleUpdateValue = (value: string | number | null) => {
      emit('update:value', value)
    }

    return () => (
      <NFormItem {...formItemProps}>
        <NInput
          {...inputProps.value}
          value={props.value}
          placeholder={computedPlaceholder.value}
          onUpdate:value={handleUpdateValue}
        />
      </NFormItem>
    )
  },
})

export default XFormInput
