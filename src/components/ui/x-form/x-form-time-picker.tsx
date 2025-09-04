import { pick } from 'lodash-es'
import { NFormItem, NTimePicker } from 'naive-ui'
import { computed, defineComponent, inject, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nTimePickerDefaultProps, nTimePickerPropNames, nTimePickerProps } from './common'
import { genFormItemRule, genPlaceholder, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xTimePickerProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nTimePickerProps,
}

const XFormTimePicker = defineComponent({
  name: 'XFormTimePicker',
  props: xTimePickerProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const timePickerProps = computed(() => mergeProps(pick(rawProps, nTimePickerPropNames), nTimePickerDefaultProps, defaultProps.value?.timePicker ?? {}))
    const placeholder = computed(() => genPlaceholder('time-picker', { label: formItemProps.value.label, placeholder: timePickerProps.value.placeholder }))

    genFormItemRule({ ...formItemProps.value, type: 'time-picker' }, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NTimePicker
            class="w-full"
            {...timePickerProps.value}
            value={rawProps.value}
            placeholder={placeholder.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NTimePicker>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormTimePicker