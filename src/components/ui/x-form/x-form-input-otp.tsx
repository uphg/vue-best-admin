import { NFormItem, NInputOTP } from 'naive-ui'
import type { XFormInputOTPBaseProps } from './types'
import { extractFormItemProps, mergeDefaultProps } from './utils'

const XFormInputOTP = defineComponent<XFormInputOTPBaseProps>({
  name: 'XFormInputOTP',
  props: {
    label: String,
    path: String,
    value: String,
    length: { type: Number, default: 6 },
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
        'input-otp',
        otherProps
      )
    })

    // OTP输入框属性（排除 value 和事件处理）
    const inputOTPProps = computed(() => {
      const { value, ...rest } = mergedProps.value
      return rest
    })

    // 处理值更新
    const handleUpdateValue = (value: string) => {
      emit('update:value', value)
    }

    return () => (
      <NFormItem {...formItemProps}>
        <NInputOTP
          {...inputOTPProps.value}
          value={props.value}
          onUpdate:value={handleUpdateValue}
        />
      </NFormItem>
    )
  }
})

export default XFormInputOTP