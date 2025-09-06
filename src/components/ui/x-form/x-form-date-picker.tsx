import type { DatePickerProps } from 'naive-ui'
import { NDatePicker, NFormItem } from 'naive-ui'
import { defineComponent, ref, type ExtractPublicPropTypes } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nDatePickerDefaultProps, nDatePickerPropNames, nDatePickerProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { genPlaceholder } from './helpers'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xDatePickerProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nDatePickerProps,
}

type XDatePickerProps = ExtractPublicPropTypes<typeof xDatePickerProps>

const fieldType = 'date-picker'

const XFormDatePicker = defineComponent({
  name: 'XFormDatePicker',
  props: xDatePickerProps,
  emits: ['update:value'],
  setup(rawProps: XDatePickerProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<DatePickerProps>(rawProps, { defaultProps, rules, autoRules, formItemContentClass }, {
      fieldType: fieldType,
      formItemPropNames: nFormItemPropNames,
      fieldPropNames: nDatePickerPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
      fieldDefaultProps: nDatePickerDefaultProps,
    })
    const placeholder = ref(genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder as string }))
    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value as any}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NDatePicker
            class="w-full"
            {...fieldProps.value as any}
            value={rawProps.value}
            placeholder={placeholder.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NDatePicker>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormDatePicker
