import type { ExtractPublicPropTypes } from 'vue'
import { NSlider } from 'naive-ui'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common'
import { xFormItemProps } from './form-props'
import { nFormItemProps, nSliderDefaultProps, nSliderPropNames, nSliderProps } from './n-form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useFormSlots } from './use-form-slots'
import { useMergeDefaultProps } from './use-merge-default-props'

const xSliderProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nSliderProps,
}

const fieldType = 'slider'

const XFormSlider = defineComponent({
  ...xFormItemOptions,
  name: 'XFormSlider',
  props: xSliderProps,
  emits: ['update:value'],
  setup(rawProps: XSliderProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nSliderPropNames, defaultProps: nSliderDefaultProps, provideProps: formContext.defaultProps.value.slider })
    const [FormSlider, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const sliderSlots = useFormSlots(context.slots, fieldType)

    function handleUpdateValue(...args: any[]) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NSlider
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          onUpdate:value={handleUpdateValue}
        >
          {sliderSlots.value}
        </NSlider>
      )
    }
    return FormSlider
  },
})

type XSliderProps = ExtractPublicPropTypes<typeof xSliderProps>

export default XFormSlider
