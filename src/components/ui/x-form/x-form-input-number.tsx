import { pick } from 'lodash-es'
import { NFormItem, NInputNumber } from 'naive-ui'
import { computed, defineComponent, inject, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nInputNumberDefaultProps, nInputNumberPropNames, nInputNumberProps } from './common'
import { genFormItemRule, genPlaceholder, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xInputNumberProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nInputNumberProps,
}

const XFormInputNumber = defineComponent({
  name: 'XFormInputNumber',
  props: xInputNumberProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const inputNumberProps = computed(() => mergeProps(pick(rawProps, nInputNumberPropNames), nInputNumberDefaultProps, defaultProps.value?.inputNumber ?? {}))
    const placeholder = computed(() => genPlaceholder('input-number', { label: formItemProps.value.label, placeholder: inputNumberProps.value.placeholder }))

    genFormItemRule({ ...formItemProps.value, type: 'input-number' }, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NInputNumber
            class="w-full"
            {...inputNumberProps.value}
            value={rawProps.value}
            placeholder={placeholder.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NInputNumber>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormInputNumber