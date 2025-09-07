import type { ColorPickerProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NColorPicker, NFormItem } from 'naive-ui'
import { defineComponent } from 'vue'
import { nColorPickerDefaultProps, nColorPickerPropNames, nColorPickerProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import { xFormItemProps } from './props'
import XFormItemWrap from './x-form-item-wrap'

const xColorPickerProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nColorPickerProps,
}

type XColorPickerProps = ExtractPublicPropTypes<typeof xColorPickerProps>

const fieldType = 'color-picker'

const XFormColorPicker = defineComponent({
  name: 'XFormColorPicker',
  props: xColorPickerProps,
  emits: ['update:value'],
  setup(rawProps: XColorPickerProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemWrapClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<ColorPickerProps>(rawProps, { defaultProps, rules, autoRules, formItemWrapClass }, {
      fieldType,
      formItemPropNames: nFormItemPropNames,
      fieldPropNames: nColorPickerPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
      fieldDefaultProps: nColorPickerDefaultProps,
    })

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
              <NColorPicker
                class="w-full"
                {...fieldProps.value as any}
                value={rawProps.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NColorPicker>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

export default XFormColorPicker
