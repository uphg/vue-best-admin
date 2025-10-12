import { NTreeSelect } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { xFormItemOptions } from './common.js'
import { xFormItemProps } from './form-props.js'
import { genPlaceholder } from './helpers.jsx'
import { nFormItemProps, nTreeSelectDefaultProps, nTreeSelectPropNames, nTreeSelectProps } from './n-form-props.js'
import { useFormContext } from './use-form-context.jsx'
import { useFormItemWrap } from './use-form-item-wrap.jsx'
import { useFormSlots } from './use-form-slots.jsx'
import { useMergeDefaultProps } from './use-merge-default-props.jsx'

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
  setup(rawProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nTreeSelectPropNames, defaultProps: nTreeSelectDefaultProps, provideProps: formContext.defaultProps.value.treeSelect })
    const [FormTreeSelect, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const treeSelectSlots = useFormSlots(context.slots, fieldType)
    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args) {
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

export default XFormTreeSelect