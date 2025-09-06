import type { InputOtpProps } from 'naive-ui/es/input-otp'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NInputOtp } from 'naive-ui'
import { defineComponent } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nInputOTPDefaultProps, nInputOTPPropNames, nInputOTPProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xInputOTPProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nInputOTPProps,
}

const XFormInputOTP = defineComponent({
  name: 'XFormInputOTP',
  props: xInputOTPProps,
  emits: ['update:value'],
  setup(rawProps: XInputOTPProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<InputOtpProps>(rawProps, context, {
      fieldType: 'inputOtp' as any,
      fieldPropNames: nInputOTPPropNames,
      fieldDefaultProps: nInputOTPDefaultProps,
      formItemPropNames: nFormItemPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
    })

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value as any}>
        <div class={mergeClass('w-full', context.formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NInputOtp
            class="w-full"
            {...fieldProps.value as any}
            value={rawProps.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NInputOtp>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

type XInputOTPProps = ExtractPublicPropTypes<typeof xInputOTPProps>

export default XFormInputOTP
