import { NColorPicker } from 'naive-ui'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common.js'
import { xFormItemProps } from './form-props.js'
import { nColorPickerDefaultProps, nColorPickerPropNames, nColorPickerProps, nFormItemProps } from './n-form-props.js'
import { useFormContext } from './use-form-context.jsx'
import { useFormItemWrap } from './use-form-item-wrap.jsx'
import { useFormSlots } from './use-form-slots.jsx'
import { useMergeDefaultProps } from './use-merge-default-props.jsx'

const xColorPickerProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nColorPickerProps,
}

const fieldType = 'color-picker'

const XFormColorPicker = defineComponent({
  ...xFormItemOptions,
  name: 'XFormColorPicker',
  props: xColorPickerProps,
  emits: ['update:value'],
  setup(rawProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nColorPickerPropNames, defaultProps: nColorPickerDefaultProps, provideProps: formContext.defaultProps.value.colorPicker })
    const [FormColorPicker, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const colorPickerSlots = useFormSlots(context.slots, fieldType)

    function handleUpdateValue(...args) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NColorPicker
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          onUpdate:value={handleUpdateValue}
        >
          {colorPickerSlots.value}
        </NColorPicker>
      )
    }
    return FormColorPicker
  },
})

export default XFormColorPicker