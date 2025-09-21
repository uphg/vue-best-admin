import type { ExtractPublicPropTypes } from 'vue'
import { NCascader } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { xFormItemOptions } from './common'
import { xFormItemProps } from './form-props'
import { genPlaceholder } from './helpers'
import { nCascaderDefaultProps, nCascaderPropNames, nCascaderProps, nFormItemProps } from './n-form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useFormSlots } from './use-form-slots'
import { useMergeDefaultProps } from './use-merge-default-props'

const xCascaderProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nCascaderProps,
}

type XCascaderProps = ExtractPublicPropTypes<typeof xCascaderProps>

const fieldType = 'cascader'

const XFormCascader = defineComponent({
  ...xFormItemOptions,
  name: 'XFormCascader',
  props: xCascaderProps,
  emits: ['update:value'],
  setup(rawProps: XCascaderProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nCascaderPropNames, defaultProps: nCascaderDefaultProps, provideProps: formContext.defaultProps.value.cascader })
    const [FormCascader, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const cascaderSlots = useFormSlots(context.slots, fieldType)
    const placeholder = computed(() => genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder }))

    function handleUpdateValue(...args: any[]) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NCascader
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          placeholder={placeholder.value}
          onUpdate:value={handleUpdateValue}
        >
          {cascaderSlots.value}
        </NCascader>
      )
    }
    return FormCascader
  },
})

export default XFormCascader
