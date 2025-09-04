import type { FormInst, FormItemProps, InputProps } from 'naive-ui'
import type { PropType } from 'vue'
import { pick } from 'lodash-es'
import { NForm, formProps as nFormProps } from 'naive-ui'
import { nFormPropNames } from './common'

export const xFormContextProviderKey = Symbol('xFormContext')

interface formDefaultProps {
  formItem: Partial<FormItemProps>
  input: Partial<InputProps>
}

export interface XFormContext {
  defaultProps: formDefaultProps
}

const formProps = {
  autoRules: {
    type: [Boolean, Array] as PropType<boolean | string[]>,
    default: false,
  },
  defaultProps: { type: Object, default: () => ({}) },

  // NForm Props
  ...nFormProps,
}

const XForm = defineComponent({
  name: 'XForm',
  props: formProps,
  emits: [],
  setup(props, { slots, expose }) {
    // 表单实例引用
    const formRef = ref<FormInst>()
    const rules = ref(props.rules || {})

    // 提供给子组件的上下文
    const formContext = {
      rules,
      autoRules: toRef(props, 'autoRules'),
      defaultProps: toRef(props, 'defaultProps'),
    }

    provide(xFormContextProviderKey, formContext)

    const formProps = computed(() => pick(props, nFormPropNames))

    function validate(callback?: any, shouldRuleBeApplied?: any) {
      return formRef.value?.validate(callback, shouldRuleBeApplied)
    }

    function restoreValidation() {
      return formRef.value?.restoreValidation()
    }

    expose({
      validate,
      restoreValidation,
      formRef,
    })

    return () => (
      <NForm
        ref={formRef}
        {...formProps.value}
      >
        {slots.default?.()}
      </NForm>
    )
  },
})

export default XForm
