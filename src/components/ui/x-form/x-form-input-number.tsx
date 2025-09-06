import type { InputNumberProps } from 'naive-ui'
import { NFormItem, NInputNumber } from 'naive-ui'
import { defineComponent, ref, type ExtractPublicPropTypes } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nInputNumberDefaultProps, nInputNumberPropNames, nInputNumberProps } from './common'
import { genPlaceholder } from './helpers'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xInputNumberProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nInputNumberProps,
}

type XInputNumberProps = ExtractPublicPropTypes<typeof xInputNumberProps>

const fieldType = 'input-number'

const XFormInputNumber = defineComponent({
  name: 'XFormInputNumber',
  props: xInputNumberProps,
  emits: ['update:value'],
  setup(rawProps: XInputNumberProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<InputNumberProps>(rawProps, { defaultProps, rules, autoRules, formItemContentClass }, {
      fieldType,
      formItemPropNames: nFormItemPropNames,
      fieldPropNames: nInputNumberPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
      fieldDefaultProps: nInputNumberDefaultProps,
    })
    const placeholder = ref(genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder as string }))
    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value as any}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NInputNumber
            class="w-full"
            {...fieldProps.value as any}
            value={rawProps.value}
            placeholder={placeholder.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NInputNumber>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormInputNumber
