import { pick } from 'lodash-es'
import { NFormItem, NSlider } from 'naive-ui'
import { computed, defineComponent, inject, type Ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nSliderDefaultProps, nSliderPropNames, nSliderProps } from './common'
import { genFormItemRule, mergeProps } from './helpers'
import { xFormContextProviderKey } from './x-form'

const xSliderProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nSliderProps,
}

const XFormSlider = defineComponent({
  name: 'XFormSlider',
  props: xSliderProps,
  emits: ['update:value'],
  setup(rawProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = inject<Record<string, Ref<any>>>(xFormContextProviderKey)!

    const formItemProps = computed(() => {
      const result = mergeProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {})
      return result
    })
    const sliderProps = computed(() => mergeProps(pick(rawProps, nSliderPropNames), nSliderDefaultProps, defaultProps.value?.slider ?? {}))

    genFormItemRule({ ...formItemProps.value, type: 'slider' }, rules.value, autoRules.value)

    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NSlider
            class="w-full"
            {...sliderProps.value}
            value={rawProps.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NSlider>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormSlider