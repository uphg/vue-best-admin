import type { RadioGroupProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import { NFormItem, NRadio, NRadioGroup } from 'naive-ui'
import { defineComponent } from 'vue'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nRadioGroupDefaultProps, nRadioGroupPropNames, nRadioGroupProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import { xFormItemProps } from './props'
import XFormItemWrap from './x-form-item-wrap'

const xRadioProps = {
  ...xFormItemProps,
  options: Array as PropType<Array<{ label: string, value: any, disabled?: boolean }>>,
  ...nFormItemProps,
  ...nRadioGroupProps,
}

type XRadioProps = ExtractPublicPropTypes<typeof xRadioProps>

const fieldType = 'radio'

const XFormRadio = defineComponent({
  name: 'XFormRadio',
  props: xRadioProps,
  emits: ['update:value'],
  setup(rawProps: XRadioProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemWrapClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<RadioGroupProps>(rawProps, { defaultProps, rules, autoRules, formItemWrapClass }, {
      fieldType,
      formItemPropNames: nFormItemPropNames,
      fieldPropNames: nRadioGroupPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
      fieldDefaultProps: nRadioGroupDefaultProps,
    })

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <XFormItemWrap
          wrap={rawProps.wrap}
          wrapClass={rawProps.wrapClass}
          provideWrapClass={formItemWrapClass.value}
          v-slots={{
            itemPrefix: slots.itemPrefix,
            default: () => (
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
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

export default XFormRadio
