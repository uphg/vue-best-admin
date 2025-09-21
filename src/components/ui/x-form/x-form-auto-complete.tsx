import type { ExtractPublicPropTypes } from 'vue'
import { NAutoComplete } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { xFormItemOptions } from './common'
import { xFormItemProps } from './form-props'
import { genPlaceholder } from './helpers'
import { nAutoCompleteDefaultProps, nAutoCompletePropNames, nAutoCompleteProps, nFormItemProps } from './n-form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useFormSlots } from './use-form-slots'
import { useMergeDefaultProps } from './use-merge-default-props'

const xAutoCompleteProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nAutoCompleteProps,
}

type XAutoCompleteProps = ExtractPublicPropTypes<typeof xAutoCompleteProps>

const fieldType = 'auto-complete'

const XFormAutoComplete = defineComponent({
  ...xFormItemOptions,
  name: 'XFormAutoComplete',
  props: xAutoCompleteProps,
  emits: ['update:value'],
  setup(rawProps: XAutoCompleteProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nAutoCompletePropNames, defaultProps: nAutoCompleteDefaultProps, provideProps: formContext.defaultProps.value.autoComplete })
    const [FormAutoComplete, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const autoCompleteSlots = useFormSlots(context.slots, fieldType)
    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args: any[]) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NAutoComplete
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          placeholder={placeholder.value}
          onUpdate:value={handleUpdateValue}
        >
          {autoCompleteSlots.value}
        </NAutoComplete>
      )
    }
    return FormAutoComplete
  },
})

export default XFormAutoComplete
