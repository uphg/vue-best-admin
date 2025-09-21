import type { ExtractPublicPropTypes } from 'vue'
import { NRate } from 'naive-ui'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common'
import { xFormItemProps } from './form-props'
import { nFormItemProps, nRateDefaultProps, nRatePropNames, nRateProps } from './n-form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useFormSlots } from './use-form-slots'
import { useMergeDefaultProps } from './use-merge-default-props'

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
  setup(rawProps: XRateProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nRatePropNames, defaultProps: nRateDefaultProps, provideProps: formContext.defaultProps.value.rate })
    const [FormRate, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const rateSlots = useFormSlots(context.slots, fieldType)

    function handleUpdateValue(...args: any[]) {
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

type XRateProps = ExtractPublicPropTypes<typeof xRateProps>

export default XFormRate
