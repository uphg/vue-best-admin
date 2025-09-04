import { pick } from 'lodash-es'
import { NDynamicTags, NFormItem } from 'naive-ui'
import { computed, defineComponent, inject, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nDynamicTagsDefaultProps, nDynamicTagsPropNames, nDynamicTagsProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { genFormItemRule, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xDynamicTagsProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nDynamicTagsProps,
}

const XFormDynamicTags = defineComponent({
  name: 'XFormDynamicTags',
  props: xDynamicTagsProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const dynamicTagsProps = computed(() => mergeProps(pick(rawProps, nDynamicTagsPropNames), nDynamicTagsDefaultProps, defaultProps.value?.dynamicTags ?? {}))

    genFormItemRule({ ...formItemProps.value, type: 'dynamic-tags' }, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NDynamicTags
            class="w-full"
            {...dynamicTagsProps.value}
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

export default XFormDynamicTags