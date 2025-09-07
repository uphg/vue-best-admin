import type { InputOtpProps } from 'naive-ui/es/input-otp'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NInputOtp } from 'naive-ui'
import { defineComponent } from 'vue'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nInputOTPDefaultProps, nInputOTPPropNames, nInputOTPProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import { xFormItemProps } from './props'
import XFormItemWrap from './x-form-item-wrap'

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
  setup(rawProps: XInputOTPProps, { emit, slots }) {
    const context = useFormContext()

    const [fieldProps, formItemProps] = useFormProps<InputOtpProps>(rawProps, context, {
      fieldType,
      fieldPropNames: nInputOTPPropNames,
      fieldDefaultProps: nInputOTPDefaultProps,
      formItemPropNames: nFormItemPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
    })

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <XFormItemWrap
          wrap={rawProps.wrap}
          wrapClass={rawProps.wrapClass}
          provideWrapClass={context.formItemWrapClass.value}
          v-slots={{
            itemPrefix: slots.itemPrefix,
            default: () => (
              <NInputOtp
                class="w-full"
                {...fieldProps.value as any}
                value={rawProps.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NInputOtp>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

type XInputOTPProps = ExtractPublicPropTypes<typeof xInputOTPProps>

export default XFormInputOTP
