import { assign, isObject, pick } from 'lodash-es'
import { NForm, formProps as nFormProps, NGrid } from 'naive-ui'
import { computed, defineComponent, provide, ref, toRef } from 'vue'
import { nFormPropNames } from './n-form-props.js'
import { xFormContextProviderKey } from './provider.js'

const formProps = {
  autoRules: {
    type: [Boolean, Array],
    default: false,
  },
  defaultProps: { type: Object, default: () => ({}) },
  formItemWrapClass: { type: [String, Object, Array], default: '' },
  grid: {
    type: [Boolean, Object],
    default: false,
  },
  ...nFormProps,
}

const XForm = defineComponent({
  name: 'XForm',
  props: formProps,
  emits: [],
  setup(props, { slots, expose }) {
    // 表单实例引用
    const formRef = ref()
    const _rules = ref(props.rules || {})

    const rules = computed(() => assign({}, props.rules, _rules.value))

    const formProps = computed(() => pick(props, nFormPropNames))
    const gridProps = computed(() => isObject(props.grid) ? props.grid : {})

    // 提供给子组件的上下文
    const formContext = {
      rules: _rules,
      formItemWrapClass: toRef(props, 'formItemWrapClass'),
      autoRules: toRef(props, 'autoRules'),
      defaultProps: toRef(props, 'defaultProps'),
      grid: toRef(props, 'grid'),
    }

    provide(xFormContextProviderKey, formContext)

    function validate(callback, shouldRuleBeApplied) {
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
        {props.grid ? <NGrid {...gridProps.value}>{{ ...slots }}</NGrid> : slots.default?.()}
      </NForm>
    )
  },
})

export default XForm