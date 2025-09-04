import { pick } from 'lodash-es'
import { NColorPicker, NFormItem } from 'naive-ui'
import { computed, defineComponent, inject, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nColorPickerDefaultProps, nColorPickerPropNames, nColorPickerProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { genFormItemRule, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xColorPickerProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nColorPickerProps,
}

const XFormColorPicker = defineComponent({
  name: 'XFormColorPicker',
  props: xColorPickerProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const colorPickerProps = computed(() => mergeProps(pick(rawProps, nColorPickerPropNames), nColorPickerDefaultProps, defaultProps.value?.colorPicker ?? {}))

    genFormItemRule({ ...formItemProps.value, type: 'color-picker' }, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NColorPicker
            class="w-full"
            {...colorPickerProps.value}
            value={rawProps.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NColorPicker>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormColorPicker