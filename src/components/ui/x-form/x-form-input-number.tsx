import type { ExtractPublicPropTypes } from 'vue'
import { NInputNumber } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { xFormItemOptions } from './common'
import { xFormItemProps } from './form-props'
import { genPlaceholder } from './helpers'
import { nFormItemProps, nInputNumberDefaultProps, nInputNumberPropNames, nInputNumberProps } from './n-form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useFormSlots } from './use-form-slots'
import { useMergeDefaultProps } from './use-merge-default-props'

const xInputNumberProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nInputNumberProps,
}

type XInputNumberProps = ExtractPublicPropTypes<typeof xInputNumberProps>

const fieldType = 'input-number'

const XFormInputNumber = defineComponent({
  ...xFormItemOptions,
  name: 'XFormInputNumber',
  props: xInputNumberProps,
  emits: ['update:value'],
  setup(rawProps: XInputNumberProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nInputNumberPropNames, defaultProps: nInputNumberDefaultProps, provideProps: formContext.defaultProps.value.inputNumber })
    const [FormInputNumber, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const inputNumberSlots = useFormSlots(context.slots, fieldType)
    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args: any[]) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NInputNumber
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          placeholder={placeholder.value}
          onUpdate:value={handleUpdateValue}
        >
          {inputNumberSlots.value}
        </NInputNumber>
      )
    }
    return FormInputNumber
  },
})

export default XFormInputNumber
