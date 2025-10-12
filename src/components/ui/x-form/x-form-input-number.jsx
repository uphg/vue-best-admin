import { NInputNumber } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { xFormItemOptions } from './common.js'
import { xFormItemProps } from './form-props.js'
import { genPlaceholder } from './helpers.jsx'
import { nFormItemProps, nInputNumberDefaultProps, nInputNumberPropNames, nInputNumberProps } from './n-form-props.js'
import { useFormContext } from './use-form-context.jsx'
import { useFormItemWrap } from './use-form-item-wrap.jsx'
import { useFormSlots } from './use-form-slots.jsx'
import { useMergeDefaultProps } from './use-merge-default-props.jsx'

const xInputNumberProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nInputNumberProps,
}

const fieldType = 'input-number'

const XFormInputNumber = defineComponent({
  ...xFormItemOptions,
  name: 'XFormInputNumber',
  props: xInputNumberProps,
  emits: ['update:value'],
  setup(rawProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nInputNumberPropNames, defaultProps: nInputNumberDefaultProps, provideProps: formContext.defaultProps.value.inputNumber })
    const [FormInputNumber, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const inputNumberSlots = useFormSlots(context.slots, fieldType)
    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args) {
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