import type { ExtractPublicPropTypes, PropType } from 'vue'
import { NRadio, NRadioGroup } from 'naive-ui'
import { defineComponent } from 'vue'
import { nFormItemProps, nRadioGroupDefaultProps, nRadioGroupPropNames, nRadioGroupProps } from './n-form-props'
import { xFormItemProps } from './form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useMergeDefaultProps } from './use-merge-default-props'

const xRadioProps = {
  ...xFormItemProps,
  options: Array as PropType<Array<{ label: string, value: any, disabled?: boolean }>>,
  ...nFormItemProps,
  ...nRadioGroupProps,
}

type XRadioProps = ExtractPublicPropTypes<typeof xRadioProps>

const fieldType = 'radio'

const XFormRadio = defineComponent({
  name: 'XFormRadio',
  props: xRadioProps,
  emits: ['update:value'],
  setup(rawProps: XRadioProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nRadioGroupPropNames, defaultProps: nRadioGroupDefaultProps, provideProps: formContext.defaultProps.value.radio })
    const [FormRadio, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })

    function handleUpdateValue(...args: any[]) {
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
          {context.slots.default?.()}
        </NRadioGroup>
      )
    }
    return FormRadio
  },
})

export default XFormRadio
