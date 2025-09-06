import type { DynamicTagsProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NDynamicTags, NFormItem } from 'naive-ui'
import { defineComponent } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nDynamicTagsDefaultProps, nDynamicTagsPropNames, nDynamicTagsProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xDynamicTagsProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nDynamicTagsProps,
}

const XFormDynamicTags = defineComponent({
  name: 'XFormDynamicTags',
  props: xDynamicTagsProps,
  emits: ['update:value'],
  setup(rawProps: XDynamicTagsProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<DynamicTagsProps>(rawProps, context, {
      fieldType: 'dynamicTags',
      fieldPropNames: nDynamicTagsPropNames,
      fieldDefaultProps: nDynamicTagsDefaultProps,
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
          <NDynamicTags
            class="w-full"
            {...fieldProps.value as any}
            value={rawProps.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NDynamicTags>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

type XDynamicTagsProps = ExtractPublicPropTypes<typeof xDynamicTagsProps>

export default XFormDynamicTags
