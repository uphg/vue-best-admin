import type { RateProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NRate } from 'naive-ui'
import { defineComponent } from 'vue'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nRateDefaultProps, nRatePropNames, nRateProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import { xFormItemProps } from './props'
import XFormItemWrap from './x-form-item-wrap'

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
  setup(rawProps: XRateProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<RateProps>(rawProps, context, {
      fieldType,
      fieldPropNames: nRatePropNames,
      fieldDefaultProps: nRateDefaultProps,
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
              <NRate
                class="w-full"
                {...fieldProps.value as any}
                value={rawProps.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NRate>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

type XRateProps = ExtractPublicPropTypes<typeof xRateProps>

export default XFormRate
