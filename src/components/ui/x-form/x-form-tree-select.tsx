import { pick } from 'lodash-es'
import { NFormItem, NTreeSelect } from 'naive-ui'
import { computed, defineComponent, inject, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nTreeSelectDefaultProps, nTreeSelectPropNames, nTreeSelectProps } from './common'
import { genFormItemRule, genPlaceholder, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xTreeSelectProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nTreeSelectProps,
}

const XFormTreeSelect = defineComponent({
  name: 'XFormTreeSelect',
  props: xTreeSelectProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const treeSelectProps = computed(() => mergeProps(pick(rawProps, nTreeSelectPropNames), nTreeSelectDefaultProps, defaultProps.value?.treeSelect ?? {}))
    const placeholder = computed(() => genPlaceholder('tree-select', { label: formItemProps.value.label, placeholder: treeSelectProps.value.placeholder }))

    genFormItemRule({ ...formItemProps.value, type: 'tree-select' }, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NTreeSelect
            class="w-full"
            {...treeSelectProps.value}
            value={rawProps.value}
            placeholder={placeholder.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NTreeSelect>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormTreeSelect