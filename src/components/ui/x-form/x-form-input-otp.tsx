import { pick } from 'lodash-es'
import { NFormItem, NInputOtp } from 'naive-ui'
import { computed, defineComponent, inject, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nInputOTPDefaultProps, nInputOTPPropNames, nInputOTPProps } from './common'
import { genFormItemRule, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xInputOTPProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nInputOTPProps,
}

const XFormInputOTP = defineComponent({
  name: 'XFormInputOTP',
  props: xInputOTPProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const inputOTPProps = computed(() => mergeProps(pick(rawProps, nInputOTPPropNames), nInputOTPDefaultProps, defaultProps.value?.inputOTP ?? {}))

    genFormItemRule({ ...formItemProps.value, type: 'input-otp' }, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NInputOtp
            class="w-full"
            {...inputOTPProps.value}
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

export default XFormInputOTP