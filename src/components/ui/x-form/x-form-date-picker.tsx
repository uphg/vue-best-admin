import { pick } from 'lodash-es'
import { NDatePicker, NFormItem } from 'naive-ui'
import { computed, defineComponent, inject, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nDatePickerDefaultProps, nDatePickerPropNames, nDatePickerProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { genFormItemRule, genPlaceholder, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xDatePickerProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nDatePickerProps,
}

const XFormDatePicker = defineComponent({
  name: 'XFormDatePicker',
  props: xDatePickerProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const datePickerProps = computed(() => mergeProps(pick(rawProps, nDatePickerPropNames), nDatePickerDefaultProps, defaultProps.value?.datePicker ?? {}))
    const placeholder = computed(() => genPlaceholder('date-picker', { label: formItemProps.value.label, placeholder: datePickerProps.value.placeholder }))

    genFormItemRule({ ...formItemProps.value, type: 'date-picker' }, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NDatePicker
            class="w-full"
            {...datePickerProps.value}
            value={rawProps.value}
            placeholder={placeholder.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NDatePicker>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormDatePicker