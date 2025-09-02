import { NFormItem, NColorPicker } from 'naive-ui'
import type { XFormColorPickerBaseProps } from './types'
import { extractFormItemProps, mergeDefaultProps } from './utils'

const XFormColorPicker = defineComponent<XFormColorPickerBaseProps>({
  name: 'XFormColorPicker',
  props: {
    label: String,
    path: String,
    value: String,
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
        'color-picker',
        otherProps
      )
    })

    // 颜色选择器属性（排除 value 和事件处理）
    const colorPickerProps = computed(() => {
      const { value, ...rest } = mergedProps.value
      return rest
    })

    // 处理值更新
    const handleUpdateValue = (value: string | null) => {
      emit('update:value', value)
    }

    return () => (
      <NFormItem {...formItemProps}>
        <NColorPicker
          {...colorPickerProps.value}
          value={props.value}
          onUpdate:value={handleUpdateValue}
        />
      </NFormItem>
    )
  }
})

export default XFormColorPicker