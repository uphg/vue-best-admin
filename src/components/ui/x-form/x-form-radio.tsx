import type { RadioGroupProps } from 'naive-ui'
import { NFormItem, NRadio, NRadioGroup } from 'naive-ui'
import { defineComponent, type ExtractPublicPropTypes, type PropType } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nRadioGroupDefaultProps, nRadioGroupPropNames, nRadioGroupProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xRadioProps = {
  contentClass: [String, Object, Array],
  options: Array as PropType<Array<{ label: string, value: any, disabled?: boolean }>>,
  ...nFormItemProps,
  ...nRadioGroupProps,
}

type XRadioProps = ExtractPublicPropTypes<typeof xRadioProps>

const XFormRadio = defineComponent({
  name: 'XFormRadio',
  props: xRadioProps,
  emits: ['update:value'],
  setup(rawProps: XRadioProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<RadioGroupProps>(rawProps, { defaultProps, rules, autoRules, formItemContentClass }, {
      fieldType: 'radio',
      formItemPropNames: nFormItemPropNames,
      fieldPropNames: nRadioGroupPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
      fieldDefaultProps: nRadioGroupDefaultProps,
    })

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value as any}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NRadioGroup
            class="w-full"
            {...fieldProps.value as any}
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
