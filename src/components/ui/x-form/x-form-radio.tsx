import { pick } from 'lodash-es'
import { NFormItem, NRadio, NRadioGroup } from 'naive-ui'
import { computed, defineComponent, inject, type PropType, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nRadioGroupDefaultProps, nRadioGroupPropNames, nRadioGroupProps } from './common'
import { genFormItemRule, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xRadioProps = {
  contentClass: [String, Object, Array],
  options: Array as PropType<Array<{ label: string, value: any, disabled?: boolean }>>,
  ...nFormItemProps,
  ...nRadioGroupProps,
}

const XFormRadio = defineComponent({
  name: 'XFormRadio',
  props: xRadioProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const radioGroupProps = computed(() => mergeProps(pick(rawProps, nRadioGroupPropNames), nRadioGroupDefaultProps, defaultProps.value?.radioGroup ?? {}))

    genFormItemRule({ ...formItemProps.value, type: 'radio' }, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NRadioGroup
            class="w-full"
            {...radioGroupProps.value}
            value={rawProps.value}
            onUpdate:value={handleUpdateValue}
          >
            {rawProps.options?.map(option => (
              <NRadio key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </NRadio>
            ))}
            {slots.default?.()}
          </NRadioGroup>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormRadio