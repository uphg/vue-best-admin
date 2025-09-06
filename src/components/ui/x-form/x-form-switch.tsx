import type { SwitchProps } from 'naive-ui'
import { NFormItem, NSwitch } from 'naive-ui'
import { defineComponent, type ExtractPublicPropTypes } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nSwitchDefaultProps, nSwitchPropNames, nSwitchProps } from './common'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xSwitchProps = {
  contentClass: [String, Object, Array],
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
    const { defaultProps, rules, autoRules, formItemContentClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<SwitchProps>(rawProps, { defaultProps, rules, autoRules, formItemContentClass }, {
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
      <NFormItem {...formItemProps.value as any}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NSwitch
            class="flex-1"
            {...fieldProps.value as any}
            value={rawProps.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NSwitch>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormSwitch
