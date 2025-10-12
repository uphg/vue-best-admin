import { NSelect } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { xFormItemOptions } from './common.js'
import { xFormItemProps } from './form-props.js'
import { genPlaceholder } from './helpers.js'
import { nFormItemProps, nSelectDefaultProps, nSelectPropNames, nSelectProps } from './n-form-props.js'
import { useFormContext } from './use-form-context.js'
import { useFormItemWrap } from './use-form-item-wrap.js'
import { useFormSlots } from './use-form-slots.js'
import { useMergeDefaultProps } from './use-merge-default-props.js'

const xSelectProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nSelectProps,
}

const fieldType = 'select'

const XFormSelect = defineComponent({
  ...xFormItemOptions,
  name: 'XFormSelect',
  props: xSelectProps,
  emits: ['update:value'],
  setup(rawProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nSelectPropNames, defaultProps: nSelectDefaultProps, provideProps: formContext.defaultProps.value.select })
    const [FormSelect, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const selectSlots = useFormSlots(context.slots, fieldType)
    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NSelect
          {...fieldProps.value}
          value={rawProps.value}
          class={rawProps.inputClass}
          placeholder={placeholder.value}
          onUpdate:value={handleUpdateValue}
        >
          {selectSlots.value}
        </NSelect>
      )
    }
    return FormSelect
  },
})

export default XFormSelect