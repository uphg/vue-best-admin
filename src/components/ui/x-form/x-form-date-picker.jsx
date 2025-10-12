import { NDatePicker } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { xFormItemOptions } from './common.js'
import { xFormItemProps } from './form-props.js'
import { genPlaceholder } from './helpers.jsx'
import { nDatePickerDefaultProps, nDatePickerPropNames, nDatePickerProps, nFormItemProps } from './n-form-props.js'
import { useFormContext } from './use-form-context.jsx'
import { useFormItemWrap } from './use-form-item-wrap.jsx'
import { useFormSlots } from './use-form-slots.jsx'
import { useMergeDefaultProps } from './use-merge-default-props.jsx'

const xDatePickerProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nDatePickerProps,
}

const fieldType = 'date-picker'

const XFormDatePicker = defineComponent({
  ...xFormItemOptions,
  name: 'XFormDatePicker',
  props: xDatePickerProps,
  emits: ['update:value'],
  setup(rawProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nDatePickerPropNames, defaultProps: nDatePickerDefaultProps, provideProps: formContext.defaultProps.value.datePicker })
    const [FormDatePicker, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const datePickerSlots = useFormSlots(context.slots, fieldType)
    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args) {
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
          {datePickerSlots.value}
        </NDatePicker>
      )
    }
    return FormDatePicker
  },
})

export default XFormDatePicker