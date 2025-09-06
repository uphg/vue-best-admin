import type { FormInst, FormItemProps, InputProps } from 'naive-ui'
import type { PropType } from 'vue'
import { assign, pick } from 'lodash-es'
import { NForm, formProps as nFormProps } from 'naive-ui'
import { computed, defineComponent, provide, ref, toRef } from 'vue'
import { nFormPropNames } from './common'
import { xFormContextProviderKey } from './provider'

const formProps = {
  autoRules: {
    type: [Boolean, Array] as PropType<boolean | string[]>,
    default: false,
  },
  defaultProps: { type: Object, default: () => ({}) },
  formItemContentClass: { type: [String, Object, Array], default: '' },

  ...nFormProps,
}

const XForm = defineComponent({
  name: 'XForm',
  props: formProps,
  emits: [],
  setup(props, { slots, expose }) {
    // 表单实例引用
    const formRef = ref<FormInst>()
    const _rules = ref(props.rules || {})

    const rules = computed(() => assign({}, props.rules, _rules.value))

    // 提供给子组件的上下文
    const formContext = {
      rules: _rules,
      formItemContentClass: toRef(props, 'formItemContentClass'),
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

    function reset() {
      // 重置表单验证状态
      formRef.value?.restoreValidation()
    }

    expose({
      validate,
      restoreValidation,
      reset,
      formRef,
    })

    return () => (
      <NForm
        ref={formRef}
        rules={rules.value}
        {...formProps.value}
      >
        {slots.default?.()}
      </NForm>
    )
  },
})

export default XForm
