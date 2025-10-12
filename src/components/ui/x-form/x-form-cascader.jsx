import { NCascader } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { xFormItemOptions } from './common.js'
import { xFormItemProps } from './form-props.js'
import { genPlaceholder } from './helpers.jsx'
import { nCascaderDefaultProps, nCascaderPropNames, nCascaderProps, nFormItemProps } from './n-form-props.js'
import { useFormContext } from './use-form-context.jsx'
import { useFormItemWrap } from './use-form-item-wrap.jsx'
import { useFormSlots } from './use-form-slots.jsx'
import { useMergeDefaultProps } from './use-merge-default-props.jsx'

const xCascaderProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nCascaderProps,
}

const fieldType = 'cascader'

const XFormCascader = defineComponent({
  ...xFormItemOptions,
  name: 'XFormCascader',
  props: xCascaderProps,
  emits: ['update:value'],
  setup(rawProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nCascaderPropNames, defaultProps: nCascaderDefaultProps, provideProps: formContext.defaultProps.value.cascader })
    const [FormCascader, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const cascaderSlots = useFormSlots(context.slots, fieldType)
    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NCascader
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          placeholder={placeholder.value}
          onUpdate:value={handleUpdateValue}
        >
          {cascaderSlots.value}
        </NCascader>
      )
    }
    return FormCascader
  },
})

export default XFormCascader