import type { DynamicInputProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NDynamicInput, NFormItem } from 'naive-ui'
import { defineComponent } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nDynamicInputDefaultProps, nDynamicInputPropNames, nDynamicInputProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xDynamicInputProps = {
  contentClass: [String, Object, Array],
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
      fieldType: fieldType,
      fieldPropNames: nDynamicInputPropNames,
      fieldDefaultProps: nDynamicInputDefaultProps,
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
          <NDynamicInput
            class="w-full"
            {...fieldProps.value as any}
            value={rawProps.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NDynamicInput>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

type XDynamicInputProps = ExtractPublicPropTypes<typeof xDynamicInputProps>

export default XFormDynamicInput
