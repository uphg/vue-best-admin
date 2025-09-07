import type { InputNumberProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NInputNumber } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nInputNumberDefaultProps, nInputNumberPropNames, nInputNumberProps } from './common'
import { genPlaceholder } from './helpers'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import { xFormItemProps } from './props'
import XFormItemWrap from './x-form-item-wrap'

const xInputNumberProps = {
  ...xFormItemProps,
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
    const { defaultProps, rules, autoRules, formItemWrapClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<InputNumberProps>(rawProps, { defaultProps, rules, autoRules, formItemWrapClass }, {
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
      <NFormItem {...formItemProps.value}>
        <XFormItemWrap
          wrap={rawProps.wrap}
          wrapClass={rawProps.wrapClass}
          provideWrapClass={formItemWrapClass.value}
          v-slots={{
            itemPrefix: slots.itemPrefix,
            default: () => (
              <NInputNumber
                class="w-full"
                {...fieldProps.value as any}
                value={rawProps.value}
                placeholder={placeholder.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NInputNumber>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

export default XFormInputNumber
