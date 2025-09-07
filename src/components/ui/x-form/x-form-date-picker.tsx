import type { DatePickerProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NDatePicker, NFormItem } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { nDatePickerDefaultProps, nDatePickerPropNames, nDatePickerProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { genPlaceholder } from './helpers'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import { xFormItemProps } from './props'
import XFormItemWrap from './x-form-item-wrap'

const xDatePickerProps = {
  ...xFormItemProps,
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
    const { defaultProps, rules, autoRules, formItemWrapClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<DatePickerProps>(rawProps, { defaultProps, rules, autoRules, formItemWrapClass }, {
      fieldType,
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
      <NFormItem {...formItemProps.value}>
        <XFormItemWrap
          wrap={rawProps.wrap}
          wrapClass={rawProps.wrapClass}
          provideWrapClass={formItemWrapClass.value}
          v-slots={{
            itemPrefix: slots.itemPrefix,
            default: () => (
              <NDatePicker
                class="w-full"
                {...fieldProps.value as any}
                value={rawProps.value}
                placeholder={placeholder.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NDatePicker>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

export default XFormDatePicker
