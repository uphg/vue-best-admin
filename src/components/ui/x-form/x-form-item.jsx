import { defineComponent } from 'vue'
import { xFormItemOptions } from './common.js'
import { xFormItemProps } from './form-props.js'
import { nFormItemProps } from './n-form-props.js'
import { useFormContext } from './use-form-context.js'
import { useFormItemWrap } from './use-form-item-wrap.js'

const formItemProps = {
  ...xFormItemProps,
  ...nFormItemProps,
}

const fieldType = 'input'

const XFormItem = defineComponent({
  ...xFormItemOptions,
  name: 'XFormItem',
  props: formItemProps,
  setup(rawProps, context) {
    const formContext = useFormContext()
    const [FormItem] = useFormItemWrap(rawProps, context, { fieldType, formContext, render: context.slots?.default })

    return FormItem
  },
})

export default XFormItem