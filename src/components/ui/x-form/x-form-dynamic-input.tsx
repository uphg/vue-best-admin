import type { DynamicInputProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NDynamicInput, NFormItem } from 'naive-ui'
import { defineComponent } from 'vue'
import { nDynamicInputDefaultProps, nDynamicInputPropNames, nDynamicInputProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import { xFormItemProps } from './props'
import XFormItemWrap from './x-form-item-wrap'

const xDynamicInputProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nDynamicInputProps,
}

const fieldType = 'dynamic-input'

const XFormDynamicInput = defineComponent({
  name: 'XFormDynamicInput',
  props: xDynamicInputProps,
  emits: ['update:value'],
  setup(rawProps: XDynamicInputProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<DynamicInputProps>(rawProps, context, {
      fieldType,
      fieldPropNames: nDynamicInputPropNames,
      fieldDefaultProps: nDynamicInputDefaultProps,
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
              <NDynamicInput
                class="w-full"
                {...fieldProps.value as any}
                value={rawProps.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NDynamicInput>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

type XDynamicInputProps = ExtractPublicPropTypes<typeof xDynamicInputProps>

export default XFormDynamicInput
