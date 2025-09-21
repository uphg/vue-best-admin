import type { ExtractPublicPropTypes } from 'vue'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common'
import { xFormItemProps } from './form-props'
import { nFormItemProps } from './n-form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'

type XInputProps = ExtractPublicPropTypes<typeof formItemProps>

const formItemProps = {
  ...xFormItemProps,
  ...nFormItemProps,
}

const fieldType = 'input'

const XFormItem = defineComponent({
  ...xFormItemOptions,
  name: 'XFormItem',
  props: formItemProps,
  setup(rawProps: XInputProps, context) {
    const formContext = useFormContext()
    const [FormItem] = useFormItemWrap(rawProps, context, { fieldType, formContext, render: context.slots?.default })

    return FormItem
  },
})

export default XFormItem
