import { NRate } from 'naive-ui'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common.js'
import { xFormItemProps } from './form-props.js'
import { nFormItemProps, nRateDefaultProps, nRatePropNames, nRateProps } from './n-form-props.js'
import { useFormContext } from './use-form-context.jsx'
import { useFormItemWrap } from './use-form-item-wrap.jsx'
import { useFormSlots } from './use-form-slots.jsx'
import { useMergeDefaultProps } from './use-merge-default-props.jsx'

const xRateProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nRateProps,
}

const fieldType = 'rate'

const XFormRate = defineComponent({
  ...xFormItemOptions,
  name: 'XFormRate',
  props: xRateProps,
  emits: ['update:value'],
  setup(rawProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nRatePropNames, defaultProps: nRateDefaultProps, provideProps: formContext.defaultProps.value.rate })
    const [FormRate, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const rateSlots = useFormSlots(context.slots, fieldType)

    function handleUpdateValue(...args) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NRate
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          onUpdate:value={handleUpdateValue}
        >
          {rateSlots.value}
        </NRate>
      )
    }
    return FormRate
  },
})

export default XFormRate