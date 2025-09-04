import { pick } from 'lodash-es'
import { NFormItem, NRate } from 'naive-ui'
import { computed, defineComponent, inject, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nRateDefaultProps, nRatePropNames, nRateProps } from './common'
import { genFormItemRule, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xRateProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nRateProps,
}

const XFormRate = defineComponent({
  name: 'XFormRate',
  props: xRateProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const rateProps = computed(() => mergeProps(pick(rawProps, nRatePropNames), nRateDefaultProps, defaultProps.value?.rate ?? {}))

    genFormItemRule({ ...formItemProps.value, type: 'rate' }, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NRate
            class="w-full"
            {...rateProps.value}
            value={rawProps.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NRate>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormRate