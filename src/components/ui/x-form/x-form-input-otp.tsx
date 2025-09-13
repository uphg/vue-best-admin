import type { ExtractPublicPropTypes } from 'vue'
import { NInputOtp } from 'naive-ui'
import { defineComponent } from 'vue'
import { nFormItemProps, nInputOTPDefaultProps, nInputOTPPropNames, nInputOTPProps } from './common'
import { xFormItemProps } from './props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useMergeDefaultProps } from './use-merge-default-props'

const xInputOTPProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nInputOTPProps,
}

const fieldType = 'input-otp'

const XFormInputOTP = defineComponent({
  name: 'XFormInputOTP',
  props: xInputOTPProps,
  emits: ['update:value'],
  setup(rawProps: XInputOTPProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nInputOTPPropNames, defaultProps: nInputOTPDefaultProps, provideProps: formContext.defaultProps.value.inputOtp })
    const [FormInputOTP, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })

    function handleUpdateValue(...args: any[]) {
      context.emit('update:value', ...args)
    }

    function render() {
      return (
        <NInputOtp
          class="w-full"
          {...fieldProps.value}
          value={rawProps.value}
          onUpdate:value={handleUpdateValue}
        >
          {context.slots}
        </NInputOtp>
      )
    }
    return FormInputOTP
  },
})

type XInputOTPProps = ExtractPublicPropTypes<typeof xInputOTPProps>

export default XFormInputOTP
