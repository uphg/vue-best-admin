import type { ExtractPublicPropTypes } from 'vue'
import { NColorPicker } from 'naive-ui'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common'
import { xFormItemProps } from './form-props'
import { nColorPickerDefaultProps, nColorPickerPropNames, nColorPickerProps, nFormItemProps } from './n-form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useFormSlots } from './use-form-slots'
import { useMergeDefaultProps } from './use-merge-default-props'

const xColorPickerProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nColorPickerProps,
}

type XColorPickerProps = ExtractPublicPropTypes<typeof xColorPickerProps>

const fieldType = 'color-picker'

const XFormColorPicker = defineComponent({
  ...xFormItemOptions,
  name: 'XFormColorPicker',
  props: xColorPickerProps,
  emits: ['update:value'],
  setup(rawProps: XColorPickerProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nColorPickerPropNames, defaultProps: nColorPickerDefaultProps, provideProps: formContext.defaultProps.value.colorPicker })
    const [FormColorPicker, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const colorPickerSlots = useFormSlots(context.slots, fieldType)

    function handleUpdateValue(...args: any[]) {
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
