import type { TransferProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NTransfer } from 'naive-ui'
import { defineComponent } from 'vue'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nTransferDefaultProps, nTransferPropNames, nTransferProps } from './common'
import { xFormItemProps } from './props'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import XFormItemWrap from './x-form-item-wrap'

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
  setup(rawProps: XTransferProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<TransferProps>(rawProps, context, {
      fieldType,
      fieldPropNames: nTransferPropNames,
      fieldDefaultProps: nTransferDefaultProps,
      formItemPropNames: nFormItemPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
    })

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <XFormItemWrap
          wrap={rawProps.wrap}
          wrapClass={rawProps.wrapClass}
          provideWrapClass={context.formItemWrapClass.value}
          v-slots={{
            itemPrefix: slots.itemPrefix,
            default: () => (
              <NTransfer
                class="w-full"
                {...fieldProps.value as any}
                value={rawProps.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NTransfer>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

type XTransferProps = ExtractPublicPropTypes<typeof xTransferProps>

export default XFormTransfer
