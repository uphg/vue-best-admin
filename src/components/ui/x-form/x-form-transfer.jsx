import { NTransfer } from 'naive-ui'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common.js'
import { xFormItemProps } from './form-props.js'
import { nFormItemProps, nTransferDefaultProps, nTransferPropNames, nTransferProps } from './n-form-props.js'
import { useFormContext } from './use-form-context.jsx'
import { useFormItemWrap } from './use-form-item-wrap.jsx'
import { useFormSlots } from './use-form-slots.jsx'
import { useMergeDefaultProps } from './use-merge-default-props.jsx'

const xTransferProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nTransferProps,
}

const fieldType = 'transfer'

const XFormTransfer = defineComponent({
  ...xFormItemOptions,
  name: 'XFormTransfer',
  props: xTransferProps,
  emits: ['update:value'],
  setup(rawProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nTransferPropNames, defaultProps: nTransferDefaultProps, provideProps: formContext.defaultProps.value.transfer })
    const [FormTransfer, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const transferSlots = useFormSlots(context.slots, fieldType)

    function handleUpdateValue(...args) {
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
          {transferSlots.value}
        </NTransfer>
      )
    }
    return FormTransfer
  },
})

export default XFormTransfer