import type { ExtractPublicPropTypes } from 'vue'
import { NRate } from 'naive-ui'
import { defineComponent } from 'vue'
import { nFormItemProps, nRateDefaultProps, nRatePropNames, nRateProps } from './common'
import { xFormItemProps } from './props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useMergeDefaultProps } from './use-merge-default-props'

const xRateProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nRateProps,
}

const fieldType = 'rate'

const XFormRate = defineComponent({
  name: 'XFormRate',
  props: xRateProps,
  emits: ['update:value'],
  setup(rawProps: XRateProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nRatePropNames, defaultProps: nRateDefaultProps, provideProps: formContext.defaultProps.value.rate })
    const [FormRate, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })

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
          {context.slots}
        </NRate>
      )
    }
    return FormRate
  },
})

type XRateProps = ExtractPublicPropTypes<typeof xRateProps>

export default XFormRate
