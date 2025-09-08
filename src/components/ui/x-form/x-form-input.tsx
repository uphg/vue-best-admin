import type { ExtractPublicPropTypes } from 'vue'
import { omit } from 'lodash-es'
import { NInput } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { nFormItemProps, nInputDefaultProps, nInputPropNames, nInputProps } from './common'
import { genPlaceholder } from './helpers'
import { xFormItemProps } from './props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useMergeDefaultProps } from './use-merge-default-props'

type XInputProps = ExtractPublicPropTypes<typeof xInputProps>

const xInputProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nInputProps,
}

const fieldType = 'input'

const XFormInput = defineComponent({
  name: 'XFormInput',
  props: xInputProps,
  emits: ['update:value'],
  setup(rawProps: XInputProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nInputPropNames, defaultProps: nInputDefaultProps, provideProps: formContext.defaultProps.value.input })
    const [FormInput, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const inputSlots = computed(() => omit(context.slots, 'itemPrefix', 'itemSuffix'))
    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args: any[]) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NInput
          {...fieldProps.value}
          value={rawProps.value}
          placeholder={placeholder.value}
          onUpdate:value={handleUpdateValue}
        >
          {inputSlots.value}
        </NInput>
      )
    }
    return FormInput
  },
})

export default XFormInput
