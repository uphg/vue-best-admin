import type { ExtractPublicPropTypes } from 'vue'
import { NDatePicker } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { nDatePickerDefaultProps, nDatePickerPropNames, nDatePickerProps, nFormItemProps } from './n-form-props'
import { genPlaceholder } from './helpers'
import { xFormItemProps } from './form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useMergeDefaultProps } from './use-merge-default-props'

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
  setup(rawProps: XDatePickerProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nDatePickerPropNames, defaultProps: nDatePickerDefaultProps, provideProps: formContext.defaultProps.value.datePicker })
    const [FormDatePicker, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args: any[]) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NDatePicker
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          placeholder={placeholder.value}
          onUpdate:value={handleUpdateValue}
        >
          {context.slots}
        </NDatePicker>
      )
    }
    return FormDatePicker
  },
})

export default XFormDatePicker
