import type { FormInst } from 'naive-ui'
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
  formItemWrapClass: { type: [String, Object, Array], default: '' },
  ...nFormProps,
}

export type XFormProps = ExtractPublicPropTypes<typeof formProps>

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
      formItemWrapClass: toRef(props, 'formItemWrapClass'),
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
