import type { SliderProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NSlider } from 'naive-ui'
import { defineComponent } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nSliderDefaultProps, nSliderPropNames, nSliderProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xSliderProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nSliderProps,
}

const XFormSlider = defineComponent({
  name: 'XFormSlider',
  props: xSliderProps,
  emits: ['update:value'],
  setup(rawProps: XSliderProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<SliderProps>(rawProps, context, {
      fieldType: 'slider',
      fieldPropNames: nSliderPropNames,
      fieldDefaultProps: nSliderDefaultProps,
      formItemPropNames: nFormItemPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
    })

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value as any}>
        <div class={mergeClass('w-full', context.formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NSlider
            class="w-full"
            {...fieldProps.value as any}
            value={rawProps.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NSlider>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

type XSliderProps = ExtractPublicPropTypes<typeof xSliderProps>

export default XFormSlider
