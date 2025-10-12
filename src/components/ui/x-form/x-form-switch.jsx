import { NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common.js'
import { xFormItemProps } from './form-props.js'
import { nFormItemProps, nSwitchDefaultProps, nSwitchPropNames, nSwitchProps } from './n-form-props.js'
import { useFormContext } from './use-form-context.js'
import { useFormItemWrap } from './use-form-item-wrap.js'
import { useFormSlots } from './use-form-slots.js'
import { useMergeDefaultProps } from './use-merge-default-props.js'

const xSwitchProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nSwitchProps,
}

const fieldType = 'switch'

const XFormSwitch = defineComponent({
  ...xFormItemOptions,
  name: 'XFormSwitch',
  props: xSwitchProps,
  emits: ['update:value'],
  setup(rawProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nSwitchPropNames, defaultProps: nSwitchDefaultProps, provideProps: formContext.defaultProps.value.switch })
    const [FormSwitch, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const switchSlots = useFormSlots(context.slots, fieldType)

    function handleUpdateValue(...args) {
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