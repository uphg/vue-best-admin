import type { SliderProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NSlider } from 'naive-ui'
import { defineComponent } from 'vue'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nSliderDefaultProps, nSliderPropNames, nSliderProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import { xFormItemProps } from './props'
import XFormItemWrap from './x-form-item-wrap'

const xSliderProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nSliderProps,
}

const fieldType = 'slider'

const XFormSlider = defineComponent({
  name: 'XFormSlider',
  props: xSliderProps,
  emits: ['update:value'],
  setup(rawProps: XSliderProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<SliderProps>(rawProps, context, {
      fieldType,
      fieldPropNames: nSliderPropNames,
      fieldDefaultProps: nSliderDefaultProps,
      formItemPropNames: nFormItemPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
    })

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <XFormItemWrap
          wrap={rawProps.wrap}
          wrapClass={rawProps.wrapClass}
          provideWrapClass={context.formItemWrapClass.value}
          v-slots={{
            itemPrefix: slots.itemPrefix,
            default: () => (
              <NSlider
                class="w-full"
                {...fieldProps.value as any}
                value={rawProps.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NSlider>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

type XSliderProps = ExtractPublicPropTypes<typeof xSliderProps>

export default XFormSlider
