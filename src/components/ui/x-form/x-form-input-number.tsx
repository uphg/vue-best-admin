import type { ExtractPublicPropTypes } from 'vue'
import { NInputNumber } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { nFormItemProps, nInputNumberDefaultProps, nInputNumberPropNames, nInputNumberProps } from './common'
import { genPlaceholder } from './helpers'
import { xFormItemProps } from './props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useMergeDefaultProps } from './use-merge-default-props'

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
  setup(rawProps: XInputNumberProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nInputNumberPropNames, defaultProps: nInputNumberDefaultProps, provideProps: formContext.defaultProps.value.inputNumber })
    const [FormInputNumber, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
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
          {context.slots}
        </NInputNumber>
      )
    }
    return FormInputNumber
  },
})

export default XFormInputNumber
