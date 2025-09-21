import type { ExtractPublicPropTypes } from 'vue'
import { NTransfer } from 'naive-ui'
import { defineComponent } from 'vue'
import { nFormItemProps, nTransferDefaultProps, nTransferPropNames, nTransferProps } from './n-form-props'
import { xFormItemProps } from './form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useMergeDefaultProps } from './use-merge-default-props'

const xTransferProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nTransferProps,
}

const fieldType = 'transfer'

const XFormTransfer = defineComponent({
  name: 'XFormTransfer',
  props: xTransferProps,
  emits: ['update:value'],
  setup(rawProps: XTransferProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nTransferPropNames, defaultProps: nTransferDefaultProps, provideProps: formContext.defaultProps.value.transfer })
    const [FormTransfer, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })

    function handleUpdateValue(...args: any[]) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NTransfer
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          onUpdate:value={handleUpdateValue}
        >
          {context.slots}
        </NTransfer>
      )
    }
    return FormTransfer
  },
})

type XTransferProps = ExtractPublicPropTypes<typeof xTransferProps>

export default XFormTransfer
