import { NFormItem, NTreeSelect } from 'naive-ui'
import type { XFormTreeSelectBaseProps } from './types'
import { extractFormItemProps, generatePlaceholder, mergeDefaultProps } from './utils'

const XFormTreeSelect = defineComponent<XFormTreeSelectBaseProps>({
  name: 'XFormTreeSelect',
  props: {
    label: String,
    path: String,
    value: null,
    autoPlaceholder: { type: Boolean, default: true },
    placeholderPrefix: String,
    placeholder: String,
    options: { type: Array, default: () => [] },
    multiple: Boolean,
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
        'tree-select',
        otherProps
      )
    })

    // 树选择器属性（排除 value、placeholder、options 和事件处理）
    const treeSelectProps = computed(() => {
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
        'tree-select',
        props.placeholder,
        props.placeholderPrefix ? { input: props.placeholderPrefix, select: props.placeholderPrefix } : undefined
      )
    })

    // 处理值更新
    const handleUpdateValue = (value: any) => {
      emit('update:value', value)
    }

    return () => (
      <NFormItem {...formItemProps}>
        <NTreeSelect
          {...treeSelectProps.value}
          value={props.value}
          placeholder={computedPlaceholder.value}
          options={props.options}
          onUpdate:value={handleUpdateValue}
        />
      </NFormItem>
    )
  }
})

export default XFormTreeSelect