import type { ExtractPublicPropTypes } from 'vue'
import { omit } from 'lodash-es'
import { NSelect } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { nFormItemProps, nSelectDefaultProps, nSelectPropNames, nSelectProps } from './common'
import { genPlaceholder } from './helpers'
import { xFormItemProps } from './props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useMergeDefaultProps } from './use-merge-default-props'

type XSelectProps = ExtractPublicPropTypes<typeof xSelectProps>

const xSelectProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nSelectProps,
}

const fieldType = 'select'

const XFormSelect = defineComponent({
  name: 'XFormSelect',
  props: xSelectProps,
  emits: ['update:value'],
  setup(rawProps: XSelectProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nSelectPropNames, defaultProps: nSelectDefaultProps, provideProps: formContext.defaultProps.value.select })
    const [FormSelect, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const selectSlots = computed(() => omit(context.slots, 'itemPrefix', 'itemSuffix'))
    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args: any[]) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NSelect
          {...fieldProps.value}
          value={rawProps.value}
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
