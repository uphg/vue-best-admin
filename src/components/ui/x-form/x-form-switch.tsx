import { NFormItem, NSwitch } from 'naive-ui'
import type { XFormSwitchBaseProps } from './types'
import { extractFormItemProps, mergeDefaultProps } from './utils'

const XFormSwitch = defineComponent<XFormSwitchBaseProps>({
  name: 'XFormSwitch',
  props: {
    label: String,
    path: String,
    value: Boolean,
    disabled: Boolean,
    size: String,
    checkedValue: { type: [String, Number, Boolean], default: true },
    uncheckedValue: { type: [String, Number, Boolean], default: false },
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
        'switch',
        otherProps
      )
    })

    // 开关属性（排除 value 和事件处理）
    const switchProps = computed(() => {
      const { value, ...rest } = mergedProps.value
      return rest
    })

    // 处理值更新
    const handleUpdateValue = (value: boolean) => {
      emit('update:value', value)
    }

    return () => (
      <NFormItem {...formItemProps}>
        <NSwitch
          {...switchProps.value}
          value={props.value}
          onUpdate:value={handleUpdateValue}
        />
      </NFormItem>
    )
  }
})

export default XFormSwitch