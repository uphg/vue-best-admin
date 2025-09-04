import type { Ref } from 'vue'
import { pick } from 'lodash-es'
import { NFormItem, NTransfer } from 'naive-ui'
import { computed, defineComponent, inject } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nTransferDefaultProps, nTransferPropNames, nTransferProps } from './common'
import { genFormItemRule, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xTransferProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nTransferProps,
}

const XFormTransfer = defineComponent({
  name: 'XFormTransfer',
  props: xTransferProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const transferProps = computed(() => mergeProps(pick(rawProps, nTransferPropNames), nTransferDefaultProps, defaultProps.value?.transfer ?? {}))

    genFormItemRule({ ...formItemProps.value, type: 'transfer' }, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NTransfer
            class="w-full"
            {...transferProps.value}
            value={rawProps.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NTransfer>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormTransfer
