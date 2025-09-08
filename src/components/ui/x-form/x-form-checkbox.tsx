import type { ExtractPublicPropTypes, PropType } from 'vue'
import { NCheckbox, NCheckboxGroup } from 'naive-ui'
import { defineComponent } from 'vue'
import { nCheckboxGroupDefaultProps, nCheckboxGroupPropNames, nCheckboxGroupProps, nFormItemProps } from './common'
import { xFormItemProps } from './props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useMergeDefaultProps } from './use-merge-default-props'

const xCheckboxProps = {
  ...xFormItemProps,
  options: Array as PropType<Array<{ label: string, value: any, disabled?: boolean }>>,
  ...nFormItemProps,
  ...nCheckboxGroupProps,
}

type XCheckboxProps = ExtractPublicPropTypes<typeof xCheckboxProps>

const fieldType = 'checkbox'

const XFormCheckbox = defineComponent({
  name: 'XFormCheckbox',
  props: xCheckboxProps,
  emits: ['update:value'],
  setup(rawProps: XCheckboxProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nCheckboxGroupPropNames, defaultProps: nCheckboxGroupDefaultProps, provideProps: formContext.defaultProps.value.checkbox })
    const [FormCheckbox, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })

    function handleUpdateValue(...args: any[]) {
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
          {context.slots.default?.()}
        </NCheckboxGroup>
      )
    }
    return FormCheckbox
  },
})

export default XFormCheckbox
