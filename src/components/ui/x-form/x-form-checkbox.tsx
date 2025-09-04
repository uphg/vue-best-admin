import { pick } from 'lodash-es'
import { NCheckbox, NCheckboxGroup, NFormItem } from 'naive-ui'
import { computed, defineComponent, inject, type PropType, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nCheckboxGroupDefaultProps, nCheckboxGroupPropNames, nCheckboxGroupProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { genFormItemRule, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xCheckboxProps = {
  contentClass: [String, Object, Array],
  options: Array as PropType<Array<{ label: string, value: any, disabled?: boolean }>>,
  ...nFormItemProps,
  ...nCheckboxGroupProps,
}

const XFormCheckbox = defineComponent({
  name: 'XFormCheckbox',
  props: xCheckboxProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const checkboxGroupProps = computed(() => mergeProps(pick(rawProps, nCheckboxGroupPropNames), nCheckboxGroupDefaultProps, defaultProps.value?.checkboxGroup ?? {}))

    genFormItemRule({ ...formItemProps.value, type: 'checkbox' }, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NCheckboxGroup
            class="w-full"
            {...checkboxGroupProps.value}
            value={rawProps.value}
            onUpdate:value={handleUpdateValue}
          >
            {rawProps.options?.map(option => (
              <NCheckbox key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </NCheckbox>
            ))}
            {slots.default?.()}
          </NCheckboxGroup>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormCheckbox