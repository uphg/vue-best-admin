import { pick } from 'lodash-es'
import { NFormItem, NMention } from 'naive-ui'
import { computed, defineComponent, inject, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nMentionDefaultProps, nMentionPropNames, nMentionProps } from './common'
import { genFormItemRule, genPlaceholder, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xMentionProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nMentionProps,
}

const XFormMention = defineComponent({
  name: 'XFormMention',
  props: xMentionProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const mentionProps = computed(() => mergeProps(pick(rawProps, nMentionPropNames), nMentionDefaultProps, defaultProps.value?.mention ?? {}))
    const placeholder = computed(() => genPlaceholder('mention', { label: formItemProps.value.label, placeholder: mentionProps.value.placeholder }))

    genFormItemRule({ ...formItemProps.value, type: 'mention' }, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NMention
            class="w-full"
            {...mentionProps.value}
            value={rawProps.value}
            placeholder={placeholder.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NMention>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormMention