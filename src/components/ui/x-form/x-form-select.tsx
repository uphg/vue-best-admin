import { pick } from 'lodash-es'
import { NFormItem, NSelect } from 'naive-ui'
import { computed, defineComponent, inject, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nSelectDefaultProps, nSelectPropNames, nSelectProps } from './common'
import { genFormItemRule, genPlaceholder, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xSelectProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nSelectProps,
}

const XFormSelect = defineComponent({
  name: 'XFormSelect',
  props: xSelectProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const selectProps = computed(() => mergeProps(pick(rawProps, nSelectPropNames), nSelectDefaultProps, defaultProps.value?.select ?? {}))
    const placeholder = computed(() => genPlaceholder('select', { label: formItemProps.value.label, placeholder: selectProps.value.placeholder }))

    genFormItemRule(formItemProps.value, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NSelect
            class="w-full"
            {...selectProps.value}
            value={rawProps.value}
            placeholder={placeholder.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NSelect>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormSelect