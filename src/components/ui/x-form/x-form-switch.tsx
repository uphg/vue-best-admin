import { pick } from 'lodash-es'
import { NFormItem, NSwitch } from 'naive-ui'
import { computed, defineComponent, inject, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nSwitchDefaultProps, nSwitchPropNames, nSwitchProps } from './common'
import { genFormItemRule, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xSwitchProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nSwitchProps,
}

const XFormSwitch = defineComponent({
  name: 'XFormSwitch',
  props: xSwitchProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const switchProps = computed(() => mergeProps(pick(rawProps, nSwitchPropNames), nSwitchDefaultProps, defaultProps.value?.switch ?? {}))

    genFormItemRule({ ...formItemProps.value, type: 'switch' }, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NSwitch
            class="w-full"
            {...switchProps.value}
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