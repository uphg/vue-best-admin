import type { CheckboxGroupProps } from 'naive-ui'
import { NCheckbox, NCheckboxGroup, NFormItem } from 'naive-ui'
import { defineComponent, type ExtractPublicPropTypes, type PropType } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nCheckboxGroupDefaultProps, nCheckboxGroupPropNames, nCheckboxGroupProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xCheckboxProps = {
  contentClass: [String, Object, Array],
  options: Array as PropType<Array<{ label: string, value: any, disabled?: boolean }>>,
  ...nFormItemProps,
  ...nCheckboxGroupProps,
}

type XCheckboxProps = ExtractPublicPropTypes<typeof xCheckboxProps>

const XFormCheckbox = defineComponent({
  name: 'XFormCheckbox',
  props: xCheckboxProps,
  emits: ['update:value'],
  setup(rawProps: XCheckboxProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<CheckboxGroupProps>(rawProps, { defaultProps, rules, autoRules, formItemContentClass }, {
      fieldType: 'checkbox',
      formItemPropNames: nFormItemPropNames,
      fieldPropNames: nCheckboxGroupPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
      fieldDefaultProps: nCheckboxGroupDefaultProps,
    })

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value as any}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NCheckboxGroup
            class="w-full"
            {...fieldProps.value as any}
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
