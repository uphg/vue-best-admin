import type { ExtractPublicPropTypes } from 'vue'
import { NMention } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { xFormItemOptions } from './common'
import { xFormItemProps } from './form-props'
import { genPlaceholder } from './helpers'
import { nFormItemProps, nMentionDefaultProps, nMentionPropNames, nMentionProps } from './n-form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useFormSlots } from './use-form-slots'
import { useMergeDefaultProps } from './use-merge-default-props'

const xMentionProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nMentionProps,
}

const fieldType = 'mention'

const XFormMention = defineComponent({
  ...xFormItemOptions,
  name: 'XFormMention',
  props: xMentionProps,
  emits: ['update:value'],
  setup(rawProps: XMentionProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nMentionPropNames, defaultProps: nMentionDefaultProps, provideProps: formContext.defaultProps.value.mention })
    const [FormMention, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const mentionSlots = useFormSlots(context.slots, fieldType)
    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args: any[]) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NMention
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          placeholder={placeholder.value}
          onUpdate:value={handleUpdateValue}
        >
          {mentionSlots.value}
        </NMention>
      )
    }
    return FormMention
  },
})

type XMentionProps = ExtractPublicPropTypes<typeof xMentionProps>

export default XFormMention
