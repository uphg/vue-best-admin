import { pick } from 'lodash-es'
import { NAutoComplete, NFormItem } from 'naive-ui'
import { computed, defineComponent, inject, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nAutoCompleteDefaultProps, nAutoCompletePropNames, nAutoCompleteProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { genFormItemRule, genPlaceholder, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xAutoCompleteProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nAutoCompleteProps,
}

const XFormAutoComplete = defineComponent({
  name: 'XFormAutoComplete',
  props: xAutoCompleteProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const autoCompleteProps = computed(() => mergeProps(pick(rawProps, nAutoCompletePropNames), nAutoCompleteDefaultProps, defaultProps.value?.autoComplete ?? {}))
    const placeholder = computed(() => genPlaceholder('auto-complete', { label: formItemProps.value.label, placeholder: autoCompleteProps.value.placeholder }))

    genFormItemRule({ ...formItemProps.value, type: 'auto-complete' }, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NAutoComplete
            class="w-full"
            {...autoCompleteProps.value}
            value={rawProps.value}
            placeholder={placeholder.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NAutoComplete>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormAutoComplete