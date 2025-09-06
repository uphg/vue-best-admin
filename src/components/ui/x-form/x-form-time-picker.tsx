import type { TimePickerProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NTimePicker } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nTimePickerDefaultProps, nTimePickerPropNames, nTimePickerProps } from './common'
import { genPlaceholder } from './helpers'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xTimePickerProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nTimePickerProps,
}

const XFormTimePicker = defineComponent({
  name: 'XFormTimePicker',
  props: xTimePickerProps,
  emits: ['update:value'],
  setup(rawProps: XTimePickerProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<TimePickerProps>(rawProps, context, {
      fieldType: 'timePicker' as any,
      fieldPropNames: nTimePickerPropNames,
      fieldDefaultProps: nTimePickerDefaultProps,
      formItemPropNames: nFormItemPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
    })

    const placeholder = computed(() => genPlaceholder('time-picker' as any, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value as any}>
        <div class={mergeClass('w-full', context.formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NTimePicker
            class="w-full"
            {...fieldProps.value as any}
            value={rawProps.value}
            placeholder={placeholder.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NTimePicker>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

type XTimePickerProps = ExtractPublicPropTypes<typeof xTimePickerProps>

export default XFormTimePicker
