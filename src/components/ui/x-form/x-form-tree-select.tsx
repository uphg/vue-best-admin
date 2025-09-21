import type { ExtractPublicPropTypes } from 'vue'
import { NTreeSelect } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { xFormItemOptions } from './common'
import { xFormItemProps } from './form-props'
import { genPlaceholder } from './helpers'
import { nFormItemProps, nTreeSelectDefaultProps, nTreeSelectPropNames, nTreeSelectProps } from './n-form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useFormSlots } from './use-form-slots'
import { useMergeDefaultProps } from './use-merge-default-props'

const xTreeSelectProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nTreeSelectProps,
}

const fieldType = 'tree-select'

const XFormTreeSelect = defineComponent({
  ...xFormItemOptions,
  name: 'XFormTreeSelect',
  props: xTreeSelectProps,
  emits: ['update:value'],
  setup(rawProps: XTreeSelectProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nTreeSelectPropNames, defaultProps: nTreeSelectDefaultProps, provideProps: formContext.defaultProps.value.treeSelect })
    const [FormTreeSelect, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const treeSelectSlots = useFormSlots(context.slots, fieldType)
    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args: any[]) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NTreeSelect
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          placeholder={placeholder.value}
          onUpdate:value={handleUpdateValue}
        >
          {treeSelectSlots.value}
        </NTreeSelect>
      )
    }
    return FormTreeSelect
  },
})

type XTreeSelectProps = ExtractPublicPropTypes<typeof xTreeSelectProps>

export default XFormTreeSelect
