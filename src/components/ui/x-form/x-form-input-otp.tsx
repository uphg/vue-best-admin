import type { ExtractPublicPropTypes } from 'vue'
import { NInputOtp } from 'naive-ui'
import { defineComponent } from 'vue'
import { xFormItemOptions } from './common'
import { xFormItemProps } from './form-props'
import { nFormItemProps, nInputOTPDefaultProps, nInputOTPPropNames, nInputOTPProps } from './n-form-props'
import { useFormContext } from './use-form-context'
import { useFormItemWrap } from './use-form-item-wrap'
import { useFormSlots } from './use-form-slots'
import { useMergeDefaultProps } from './use-merge-default-props'

const xInputOTPProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nInputOTPProps,
}

const fieldType = 'input-otp'

const XFormInputOTP = defineComponent({
  ...xFormItemOptions,
  name: 'XFormInputOTP',
  props: xInputOTPProps,
  emits: ['update:value'],
  setup(rawProps: XInputOTPProps, context) {
    const formContext = useFormContext()
    const fieldProps = useMergeDefaultProps({ rawProps, propNames: nInputOTPPropNames, defaultProps: nInputOTPDefaultProps, provideProps: formContext.defaultProps.value.inputOtp })
    const [FormInputOTP, formItemProps] = useFormItemWrap(rawProps, context, { fieldType, formContext, render })
    const inputOTPSlots = useFormSlots(context.slots, fieldType)

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
          {inputOTPSlots.value}
        </NInputOtp>
      )
    }
    return FormInputOTP
  },
})

type XInputOTPProps = ExtractPublicPropTypes<typeof xInputOTPProps>

export default XFormInputOTP
