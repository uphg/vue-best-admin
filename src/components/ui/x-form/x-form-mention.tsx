import type { MentionProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NMention } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nMentionDefaultProps, nMentionPropNames, nMentionProps } from './common'
import { genPlaceholder } from './helpers'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import { xFormItemProps } from './props'
import XFormItemWrap from './x-form-item-wrap'

const xMentionProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nMentionProps,
}

const fieldType = 'mention'

const XFormMention = defineComponent({
  name: 'XFormMention',
  props: xMentionProps,
  emits: ['update:value'],
  setup(rawProps: XMentionProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<MentionProps>(rawProps, context, {
      fieldType,
      fieldPropNames: nMentionPropNames,
      fieldDefaultProps: nMentionDefaultProps,
      formItemPropNames: nFormItemPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
    })

    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

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
              <NMention
                class="w-full"
                {...fieldProps.value as any}
                value={rawProps.value}
                placeholder={placeholder.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NMention>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

type XMentionProps = ExtractPublicPropTypes<typeof xMentionProps>

export default XFormMention
