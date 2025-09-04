import { pick } from 'lodash-es'
import { NDynamicInput, NFormItem } from 'naive-ui'
import { computed, defineComponent, inject, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nDynamicInputDefaultProps, nDynamicInputPropNames, nDynamicInputProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { genFormItemRule, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xDynamicInputProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nDynamicInputProps,
}

const XFormDynamicInput = defineComponent({
  name: 'XFormDynamicInput',
  props: xDynamicInputProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const dynamicInputProps = computed(() => mergeProps(pick(rawProps, nDynamicInputPropNames), nDynamicInputDefaultProps, defaultProps.value?.dynamicInput ?? {}))

    genFormItemRule({ ...formItemProps.value, type: 'dynamic-input' }, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NDynamicInput
            class="w-full"
            {...dynamicInputProps.value}
            value={rawProps.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NDynamicInput>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormDynamicInput