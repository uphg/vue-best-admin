import type { XFormSelectBaseProps } from './types'
import { NFormItem, NSelect } from 'naive-ui'
import { extractFormItemProps, generatePlaceholder, mergeDefaultProps } from './utils'

const XFormSelect = defineComponent<XFormSelectBaseProps>({
  name: 'XFormSelect',
  props: {
    label: String,
    path: String,
    value: null,
    autoPlaceholder: { type: Boolean, default: true },
    placeholderPrefix: String,
    placeholder: String,
    options: { type: Array, default: () => [] },
    multiple: Boolean,
    filterable: Boolean,
    clearable: Boolean,
    disabled: Boolean,
    size: String,
    loading: Boolean,
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
        'select',
        otherProps,
      )
    })

    // 选择器属性（排除 value、options 和事件处理）
    const selectProps = computed(() => {
      const { value, placeholder, options, autoPlaceholder, placeholderPrefix, ...rest } = mergedProps.value
      return rest
    })

    // 计算 placeholder
    const computedPlaceholder = computed(() => {
      if (!props.autoPlaceholder) {
        return props.placeholder
      }

      return generatePlaceholder(
        props.label,
        'select',
        props.placeholder,
        props.placeholderPrefix ? { input: props.placeholderPrefix, select: props.placeholderPrefix } : undefined,
      )
    })

    // 处理值更新
    const handleUpdateValue = (value: any) => {
      emit('update:value', value)
    }

    return () => (
      <NFormItem {...formItemProps}>
        <NSelect
          {...selectProps.value}
          value={props.value}
          placeholder={computedPlaceholder.value}
          options={props.options}
          onUpdate:value={handleUpdateValue}
        />
      </NFormItem>
    )
  },
})

export default XFormSelect
