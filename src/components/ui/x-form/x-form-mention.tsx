import { NFormItem, NMention } from 'naive-ui'
import type { XFormMentionBaseProps } from './types'
import { extractFormItemProps, generatePlaceholder, mergeDefaultProps } from './utils'

const XFormMention = defineComponent<XFormMentionBaseProps>({
  name: 'XFormMention',
  props: {
    label: String,
    path: String,
    value: String,
    autoPlaceholder: { type: Boolean, default: true },
    placeholderPrefix: String,
    placeholder: String,
    options: { type: Array, default: () => [] },
    prefix: { type: [String, Array], default: '@' },
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
        'mention',
        otherProps
      )
    })

    // 提及组件属性（排除 value、placeholder、options 和事件处理）
    const mentionProps = computed(() => {
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
        'mention',
        props.placeholder,
        props.placeholderPrefix ? { input: props.placeholderPrefix, select: props.placeholderPrefix } : undefined
      )
    })

    // 处理值更新
    const handleUpdateValue = (value: string) => {
      emit('update:value', value)
    }

    return () => (
      <NFormItem {...formItemProps}>
        <NMention
          {...mentionProps.value}
          value={props.value}
          placeholder={computedPlaceholder.value}
          options={props.options}
          onUpdate:value={handleUpdateValue}
        />
      </NFormItem>
    )
  }
})

export default XFormMention