import type { ExtractPublicPropTypes } from 'vue'
import { NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common'
import { xFormItemProps } from './form-props'
import { nFormItemProps, nSwitchDefaultProps, nSwitchPropNames, nSwitchProps } from './n-form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useFormSlots } from './use-form-slots'
import { useMergeDefaultProps } from './use-merge-default-props'

const xSwitchProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nSwitchProps,
}

type XSwitchProps = ExtractPublicPropTypes<typeof xSwitchProps>

const fieldType = 'switch'

const XFormSwitch = defineComponent({
  ...xFormItemOptions,
  name: 'XFormSwitch',
  props: xSwitchProps,
  emits: ['update:value'],
  setup(rawProps: XSwitchProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nSwitchPropNames, defaultProps: nSwitchDefaultProps, provideProps: formContext.defaultProps.value.switch })
    const [FormSwitch, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const switchSlots = useFormSlots(context.slots, fieldType)

    function handleUpdateValue(...args: any[]) {
      console.log('XFormSwitch handleUpdateValue', ...args)
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NSwitch
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          onUpdate:value={handleUpdateValue}
        >
          {switchSlots.value}
        </NSwitch>
      )
    }
    return FormSwitch
  },
})

export default XFormSwitch
