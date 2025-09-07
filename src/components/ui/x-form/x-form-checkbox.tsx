import type { CheckboxGroupProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import { NCheckbox, NCheckboxGroup, NFormItem } from 'naive-ui'
import { defineComponent } from 'vue'

import { nCheckboxGroupDefaultProps, nCheckboxGroupPropNames, nCheckboxGroupProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { xFormItemProps } from './props'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import XFormItemWrap from './x-form-item-wrap'

const xCheckboxProps = {
  ...xFormItemProps,
  options: Array as PropType<Array<{ label: string, value: any, disabled?: boolean }>>,
  ...nFormItemProps,
  ...nCheckboxGroupProps,
}

type XCheckboxProps = ExtractPublicPropTypes<typeof xCheckboxProps>

const fieldType = 'checkbox'

const XFormCheckbox = defineComponent({
  name: 'XFormCheckbox',
  props: xCheckboxProps,
  emits: ['update:value'],
  setup(rawProps: XCheckboxProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemWrapClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<CheckboxGroupProps>(rawProps, { defaultProps, rules, autoRules, formItemWrapClass }, {
      fieldType,
      formItemPropNames: nFormItemPropNames,
      fieldPropNames: nCheckboxGroupPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
      fieldDefaultProps: nCheckboxGroupDefaultProps,
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
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

export default XFormCheckbox
