import type { TransferProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NTransfer } from 'naive-ui'
import { defineComponent } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nTransferDefaultProps, nTransferPropNames, nTransferProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xTransferProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nTransferProps,
}

const XFormTransfer = defineComponent({
  name: 'XFormTransfer',
  props: xTransferProps,
  emits: ['update:value'],
  setup(rawProps: XTransferProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<TransferProps>(rawProps, context, {
      fieldType: 'transfer',
      fieldPropNames: nTransferPropNames,
      fieldDefaultProps: nTransferDefaultProps,
      formItemPropNames: nFormItemPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
    })

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value as any}>
        <div class={mergeClass('w-full', context.formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NTransfer
            class="w-full"
            {...fieldProps.value as any}
            value={rawProps.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NTransfer>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

type XTransferProps = ExtractPublicPropTypes<typeof xTransferProps>

export default XFormTransfer
