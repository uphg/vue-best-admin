import type { ExtractPublicPropTypes } from 'vue'
import { NDynamicInput } from 'naive-ui'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common'
import { xFormItemProps } from './form-props'
import { nDynamicInputDefaultProps, nDynamicInputPropNames, nDynamicInputProps, nFormItemProps } from './n-form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useFormSlots } from './use-form-slots'
import { useMergeDefaultProps } from './use-merge-default-props'

const xDynamicInputProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nDynamicInputProps,
}

const fieldType = 'dynamic-input'

const XFormDynamicInput = defineComponent({
  ...xFormItemOptions,
  name: 'XFormDynamicInput',
  props: xDynamicInputProps,
  emits: ['update:value'],
  setup(rawProps: XDynamicInputProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nDynamicInputPropNames, defaultProps: nDynamicInputDefaultProps, provideProps: formContext.defaultProps.value.dynamicInput })
    const [FormDynamicInput, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const dynamicInputSlots = useFormSlots(context.slots, fieldType)

    function handleUpdateValue(...args: any[]) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NDynamicInput
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          onUpdate:value={handleUpdateValue}
        >
          {dynamicInputSlots.value}
        </NDynamicInput>
      )
    }
    return FormDynamicInput
  },
})

type XDynamicInputProps = ExtractPublicPropTypes<typeof xDynamicInputProps>

export default XFormDynamicInput
