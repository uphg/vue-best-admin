import type { SelectProps } from 'naive-ui'
import { NFormItem, NSelect } from 'naive-ui'
import { defineComponent, ref, type ExtractPublicPropTypes } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nSelectDefaultProps, nSelectPropNames, nSelectProps } from './common'
import { genPlaceholder } from './helpers'
import { useFormProps } from './use-form-props'
import { useFormContext } from './use-form-context'

const xSelectProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nSelectProps,
}

type XSelectProps = ExtractPublicPropTypes<typeof xSelectProps>

const XFormSelect = defineComponent({
  name: 'XFormSelect',
  props: xSelectProps,
  emits: ['update:value'],
  setup(rawProps: XSelectProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<SelectProps>(rawProps, { defaultProps, rules, autoRules, formItemContentClass }, {
      fieldType: 'select',
      formItemPropNames: nFormItemPropNames,
      fieldPropNames: nSelectPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
      fieldDefaultProps: nSelectDefaultProps,
    })
    const placeholder = ref(genPlaceholder('select', { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder as string }))
    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value as any}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NSelect
            class="w-full"
            {...fieldProps.value as any}
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
