import { NRadio, NRadioGroup } from 'naive-ui'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common.js'
import { xFormItemProps } from './form-props.js'
import { nFormItemProps, nRadioGroupDefaultProps, nRadioGroupPropNames, nRadioGroupProps } from './n-form-props.js'
import { useFormContext } from './use-form-context.js'
import { useFormItemWrap } from './use-form-item-wrap.js'
import { useFormSlots } from './use-form-slots.js'
import { useMergeDefaultProps } from './use-merge-default-props.js'

const xRadioProps = {
  ...xFormItemProps,
  options: Array,
  ...nFormItemProps,
  ...nRadioGroupProps,
}

const fieldType = 'radio'

const XFormRadio = defineComponent({
  ...xFormItemOptions,
  name: 'XFormRadio',
  props: xRadioProps,
  emits: ['update:value'],
  setup(rawProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nRadioGroupPropNames, defaultProps: nRadioGroupDefaultProps, provideProps: formContext.defaultProps.value.radio })
    const [FormRadio, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const radioSlots = useFormSlots(context.slots, fieldType)

    function handleUpdateValue(...args) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NRadioGroup
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          onUpdate:value={handleUpdateValue}
        >
          {rawProps.options?.map(option => (
            <NRadio key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </NRadio>
          ))}
          {radioSlots.value}
        </NRadioGroup>
      )
    }
    return FormRadio
  },
})

export default XFormRadio