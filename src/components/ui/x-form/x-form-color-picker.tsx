import type { ColorPickerProps } from 'naive-ui'
import { NColorPicker, NFormItem } from 'naive-ui'
import { defineComponent, type ExtractPublicPropTypes } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nColorPickerDefaultProps, nColorPickerPropNames, nColorPickerProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xColorPickerProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nColorPickerProps,
}

type XColorPickerProps = ExtractPublicPropTypes<typeof xColorPickerProps>

const XFormColorPicker = defineComponent({
  name: 'XFormColorPicker',
  props: xColorPickerProps,
  emits: ['update:value'],
  setup(rawProps: XColorPickerProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<ColorPickerProps>(rawProps, { defaultProps, rules, autoRules, formItemContentClass }, {
      fieldType: 'colorPicker',
      formItemPropNames: nFormItemPropNames,
      fieldPropNames: nColorPickerPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
      fieldDefaultProps: nColorPickerDefaultProps,
    })

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value as any}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NColorPicker
            class="w-full"
            {...fieldProps.value as any}
            value={rawProps.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NColorPicker>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormColorPicker
