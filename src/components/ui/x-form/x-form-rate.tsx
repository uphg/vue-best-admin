import type { RateProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NRate } from 'naive-ui'
import { defineComponent } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nRateDefaultProps, nRatePropNames, nRateProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xRateProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nRateProps,
}

const XFormRate = defineComponent({
  name: 'XFormRate',
  props: xRateProps,
  emits: ['update:value'],
  setup(rawProps: XRateProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<RateProps>(rawProps, context, {
      fieldType: 'rate',
      fieldPropNames: nRatePropNames,
      fieldDefaultProps: nRateDefaultProps,
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
          <NRate
            class="w-full"
            {...fieldProps.value as any}
            value={rawProps.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NRate>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

type XRateProps = ExtractPublicPropTypes<typeof xRateProps>

export default XFormRate
