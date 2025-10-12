import { NDynamicTags } from 'naive-ui'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common.js'
import { xFormItemProps } from './form-props.js'
import { nDynamicTagsDefaultProps, nDynamicTagsPropNames, nDynamicTagsProps, nFormItemProps } from './n-form-props.js'
import { useFormContext } from './use-form-context.jsx'
import { useFormItemWrap } from './use-form-item-wrap.jsx'
import { useFormSlots } from './use-form-slots.jsx'
import { useMergeDefaultProps } from './use-merge-default-props.jsx'

const xDynamicTagsProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nDynamicTagsProps,
}

const fieldType = 'dynamic-tags'

const XFormDynamicTags = defineComponent({
  ...xFormItemOptions,
  name: 'XFormDynamicTags',
  props: xDynamicTagsProps,
  emits: ['update:value'],
  setup(rawProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nDynamicTagsPropNames, defaultProps: nDynamicTagsDefaultProps, provideProps: formContext.defaultProps.value.dynamicTags })
    const [FormDynamicTags, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const dynamicTagsSlots = useFormSlots(context.slots, fieldType)

    function handleUpdateValue(...args) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NDynamicTags
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          onUpdate:value={handleUpdateValue}
        >
          {dynamicTagsSlots.value}
        </NDynamicTags>
      )
    }
    return FormDynamicTags
  },
})

export default XFormDynamicTags