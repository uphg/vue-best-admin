import type { FormInst } from 'naive-ui'
import type { XFormProps } from './types'
import { NForm } from 'naive-ui'

const XForm = defineComponent<XFormProps>({
  name: 'XForm',
  props: {
    model: { type: Object, default: () => ({}) },
    defaultProps: { type: Object, default: () => ({}) },
    rules: Object,
    labelPlacement: String,
    labelWidth: [String, Number],
    labelAlign: String,
    showFeedback: { type: Boolean, default: true },
    showLabel: { type: Boolean, default: true },
    showRequireMark: Boolean,
    requireMarkPlacement: String,
    size: String,
    disabled: Boolean,
    inline: Boolean,
  },
  emits: [],
  setup(props, { slots, expose }) {
    // 表单实例引用
    const formRef = ref<FormInst>()

    // 提供给子组件的上下文
    const formContext = {
      model: toRef(props, 'model'),
      defaultProps: toRef(props, 'defaultProps'),
    }

    provide('xFormContext', formContext)

    // 过滤掉自定义属性，只传递 NForm 支持的属性
    const formProps = computed(() => {
      const { model, defaultProps, ...restProps } = props
      return restProps
    })

    // 暴露表单方法
    const validate = (callback?: any, shouldRuleBeApplied?: any) => {
      return formRef.value?.validate(callback, shouldRuleBeApplied)
    }

    const restoreValidation = () => {
      formRef.value?.restoreValidation()
    }

    expose({
      validate,
      restoreValidation,
      formRef,
    })

    return () => (
      <NForm
        ref={formRef}
        model={props.model}
        {...formProps.value}
      >
        {slots.default?.()}
      </NForm>
    )
  },
})

export default XForm
