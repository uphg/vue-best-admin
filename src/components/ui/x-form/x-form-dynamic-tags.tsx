import type { DynamicTagsProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NDynamicTags, NFormItem } from 'naive-ui'
import { defineComponent } from 'vue'
import { nDynamicTagsDefaultProps, nDynamicTagsPropNames, nDynamicTagsProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import { xFormItemProps } from './props'
import XFormItemWrap from './x-form-item-wrap'

const xDynamicTagsProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nDynamicTagsProps,
}

const fieldType = 'dynamic-tags'

const XFormDynamicTags = defineComponent({
  name: 'XFormDynamicTags',
  props: xDynamicTagsProps,
  emits: ['update:value'],
  setup(rawProps: XDynamicTagsProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<DynamicTagsProps>(rawProps, context, {
      fieldType,
      fieldPropNames: nDynamicTagsPropNames,
      fieldDefaultProps: nDynamicTagsDefaultProps,
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
              <NDynamicTags
                class="w-full"
                {...fieldProps.value as any}
                value={rawProps.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NDynamicTags>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

type XDynamicTagsProps = ExtractPublicPropTypes<typeof xDynamicTagsProps>

export default XFormDynamicTags
