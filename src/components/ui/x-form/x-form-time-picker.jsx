import { NTimePicker } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { xFormItemOptions } from './common.js'
import { xFormItemProps } from './form-props.js'
import { genPlaceholder } from './helpers.jsx'
import { nFormItemProps, nTimePickerDefaultProps, nTimePickerPropNames, nTimePickerProps } from './n-form-props.js'
import { useFormContext } from './use-form-context.jsx'
import { useFormItemWrap } from './use-form-item-wrap.jsx'
import { useFormSlots } from './use-form-slots.jsx'
import { useMergeDefaultProps } from './use-merge-default-props.jsx'

const xTimePickerProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nTimePickerProps,
}

const fieldType = 'time-picker'

const XFormTimePicker = defineComponent({
  ...xFormItemOptions,
  name: 'XFormTimePicker',
  props: xTimePickerProps,
  emits: ['update:value'],
  setup(rawProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nTimePickerPropNames, defaultProps: nTimePickerDefaultProps, provideProps: formContext.defaultProps.value.timePicker })
    const [FormTimePicker, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const timePickerSlots = useFormSlots(context.slots, fieldType)
    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NTimePicker
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          placeholder={placeholder.value}
          onUpdate:value={handleUpdateValue}
        >
          {timePickerSlots.value}
        </NTimePicker>
      )
    }
    return FormTimePicker
  },
})

export default XFormTimePicker