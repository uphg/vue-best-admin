import type { ExtractPublicPropTypes } from 'vue'
import { NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { nFormItemProps, nSwitchDefaultProps, nSwitchPropNames, nSwitchProps } from './common'
import { xFormItemProps } from './props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useMergeDefaultProps } from './use-merge-default-props'

const xSwitchProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nSwitchProps,
}

type XSwitchProps = ExtractPublicPropTypes<typeof xSwitchProps>

const fieldType = 'switch'

const XFormSwitch = defineComponent({
  name: 'XFormSwitch',
  props: xSwitchProps,
  emits: ['update:value'],
  setup(rawProps: XSwitchProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nSwitchPropNames, defaultProps: nSwitchDefaultProps, provideProps: formContext.defaultProps.value.switch })
    const [FormSwitch, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })

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
          {context.slots}
        </NSwitch>
      )
    }
    return FormSwitch
  },
})

export default XFormSwitch
