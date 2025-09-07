import type { SwitchProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'

import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nSwitchDefaultProps, nSwitchPropNames, nSwitchProps } from './common'
import { xFormItemProps } from './props'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import XFormItemWrap from './x-form-item-wrap'

const xSwitchProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nSwitchProps,
}

type XSwitchProps = ExtractPublicPropTypes<typeof xSwitchProps>

const fieldType = 'switch'

const XFormSwitch = defineComponent({
  name: 'XFormSwitch',
  props: xSwitchProps,
  emits: ['update:value'],
  setup(rawProps: XSwitchProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemWrapClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<SwitchProps>(rawProps, { defaultProps, rules, autoRules, formItemWrapClass }, {
      fieldType,
      formItemPropNames: nFormItemPropNames,
      fieldPropNames: nSwitchPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
      fieldDefaultProps: nSwitchDefaultProps,
    })

    function handleUpdateValue(...args: any[]) {
      console.log('XFormSwitch handleUpdateValue', ...args)
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <XFormItemWrap
          wrap={rawProps.wrap}
          wrapClass={rawProps.wrapClass}
          provideWrapClass={formItemWrapClass.value}
          v-slots={{
            itemPrefix: slots.itemPrefix,
            default: () => (
              <NSwitch
                class="w-full"
                {...fieldProps.value as any}
                value={rawProps.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NSwitch>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

export default XFormSwitch
