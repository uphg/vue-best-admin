import type { InputProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NInput } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nInputDefaultProps, nInputPropNames, nInputProps } from './common'
import { genPlaceholder } from './helpers'
import { xFormItemProps } from './props'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import XFormItemWrap from './x-form-item-wrap'

const xInputProps = {
  ...xFormItemProps,
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
    const { defaultProps, rules, autoRules, formItemWrapClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<InputProps>(rawProps, { defaultProps, rules, autoRules, formItemWrapClass }, {
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
      <NFormItem {...formItemProps.value}>
        <XFormItemWrap
          wrap={rawProps.wrap}
          wrapClass={rawProps.wrapClass}
          provideWrapClass={formItemWrapClass.value}
          v-slots={{
            itemPrefix: slots.itemPrefix,
            default: () => (
              <NInput
                {...fieldProps.value as any}
                value={rawProps.value}
                placeholder={placeholder.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NInput>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

export default XFormInput
