import { NCheckbox, NCheckboxGroup } from 'naive-ui'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common.js'
import { xFormItemProps } from './form-props.js'
import { nCheckboxGroupDefaultProps, nCheckboxGroupPropNames, nCheckboxGroupProps, nFormItemProps } from './n-form-props.js'
import { useFormContext } from './use-form-context.js'
import { useFormItemWrap } from './use-form-item-wrap.js'
import { useFormSlots } from './use-form-slots.js'
import { useMergeDefaultProps } from './use-merge-default-props.js'

const xCheckboxProps = {
  options: Array,
  ...xFormItemProps,
  ...nFormItemProps,
  ...nCheckboxGroupProps,
}

const fieldType = 'checkbox'

const XFormCheckbox = defineComponent({
  ...xFormItemOptions,
  name: 'XFormCheckbox',
  props: xCheckboxProps,
  emits: ['update:value'],
  setup(rawProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nCheckboxGroupPropNames, defaultProps: nCheckboxGroupDefaultProps, provideProps: formContext.defaultProps.value.checkbox })
    const [FormCheckbox] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const checkboxSlots = useFormSlots(context.slots, fieldType)

    function handleUpdateValue(...args) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NCheckboxGroup
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          onUpdate:value={handleUpdateValue}
        >
          {rawProps.options?.map(option => (
            <NCheckbox key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </NCheckbox>
          ))}
          {checkboxSlots.value}
        </NCheckboxGroup>
      )
    }
    return FormCheckbox
  },
})

export default XFormCheckbox