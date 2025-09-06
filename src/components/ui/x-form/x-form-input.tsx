import type { InputProps } from 'naive-ui'
import { NFormItem, NInput } from 'naive-ui'
import { defineComponent, ref, type ExtractPublicPropTypes } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nInputDefaultProps, nInputPropNames, nInputProps } from './common'
import { genPlaceholder } from './helpers'
import { useFormProps } from './use-form-props'
import { useFormContext } from './use-form-context'

const xInputProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nInputProps,
}

type XInputProps = ExtractPublicPropTypes<typeof xInputProps>

const fieldType = 'input'

const XFormInput = defineComponent({
  name: 'XFormInput',
  props: xInputProps,
  emits: ['update:value'],
  setup(rawProps: XInputProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<InputProps>(rawProps, { defaultProps, rules, autoRules, formItemContentClass }, {
      fieldType,
      formItemPropNames: nFormItemPropNames,
      fieldPropNames: nInputPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
      fieldDefaultProps: nInputDefaultProps,
    })
    const placeholder = ref(genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder as string }))
    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value as any}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NInput
            class="w-full"
            {...fieldProps.value as any}
            value={rawProps.value}
            placeholder={placeholder.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NInput>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormInput
