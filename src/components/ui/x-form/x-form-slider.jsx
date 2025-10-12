import { NSlider } from 'naive-ui'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common.js'
import { xFormItemProps } from './form-props.js'
import { nFormItemProps, nSliderDefaultProps, nSliderPropNames, nSliderProps } from './n-form-props.js'
import { useFormContext } from './use-form-context.jsx'
import { useFormItemWrap } from './use-form-item-wrap.jsx'
import { useFormSlots } from './use-form-slots.jsx'
import { useMergeDefaultProps } from './use-merge-default-props.jsx'

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
  setup(rawProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nSliderPropNames, defaultProps: nSliderDefaultProps, provideProps: formContext.defaultProps.value.slider })
    const [FormSlider, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const sliderSlots = useFormSlots(context.slots, fieldType)

    function handleUpdateValue(...args) {
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

export default XFormSlider