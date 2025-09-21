import type { ExtractPublicPropTypes } from 'vue'
import { NDynamicTags } from 'naive-ui'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common'
import { xFormItemProps } from './form-props'
import { nDynamicTagsDefaultProps, nDynamicTagsPropNames, nDynamicTagsProps, nFormItemProps } from './n-form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useFormSlots } from './use-form-slots'
import { useMergeDefaultProps } from './use-merge-default-props'

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
  setup(rawProps: XDynamicTagsProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nDynamicTagsPropNames, defaultProps: nDynamicTagsDefaultProps, provideProps: formContext.defaultProps.value.dynamicTags })
    const [FormDynamicTags, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const dynamicTagsSlots = useFormSlots(context.slots, fieldType)

    function handleUpdateValue(...args: any[]) {
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

type XDynamicTagsProps = ExtractPublicPropTypes<typeof xDynamicTagsProps>

export default XFormDynamicTags
