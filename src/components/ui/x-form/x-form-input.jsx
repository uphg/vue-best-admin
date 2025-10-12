import { NInput } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { xFormItemOptions } from './common.js'
import { xFormItemProps } from './form-props.js'
import { genPlaceholder } from './helpers.js'
import { nFormItemProps, nInputDefaultProps, nInputPropNames, nInputProps } from './n-form-props.js'
import { useFormContext } from './use-form-context.js'
import { useFormItemWrap } from './use-form-item-wrap.js'
import { useFormSlots } from './use-form-slots.js'
import { useMergeDefaultProps } from './use-merge-default-props.js'

const xInputProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nInputProps,
}

const fieldType = 'input'

const XFormInput = defineComponent({
  ...xFormItemOptions,
  name: 'XFormInput',
  props: xInputProps,
  emits: ['update:value'],
  setup(rawProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nInputPropNames, defaultProps: nInputDefaultProps, provideProps: formContext.defaultProps.value.input })
    const [FormInput, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const inputSlots = useFormSlots(context.slots, fieldType)
    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))
    function handleUpdateValue(...args) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NInput
          {...fieldProps.value}
          value={rawProps.value}
          placeholder={placeholder.value}
          onUpdate:value={handleUpdateValue}
        >
          {{ ...inputSlots.value }}
        </NInput>
      )
    }
    return FormInput
  },
})

export default XFormInput