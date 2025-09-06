import type { CascaderProps } from 'naive-ui'
import { NCascader, NFormItem } from 'naive-ui'
import { defineComponent, ref, type ExtractPublicPropTypes } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nCascaderDefaultProps, nCascaderPropNames, nCascaderProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { genPlaceholder } from './helpers'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xCascaderProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nCascaderProps,
}

type XCascaderProps = ExtractPublicPropTypes<typeof xCascaderProps>

const XFormCascader = defineComponent({
  name: 'XFormCascader',
  props: xCascaderProps,
  emits: ['update:value'],
  setup(rawProps: XCascaderProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<CascaderProps>(rawProps, { defaultProps, rules, autoRules, formItemContentClass }, {
      fieldType: 'cascader',
      formItemPropNames: nFormItemPropNames,
      fieldPropNames: nCascaderPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
      fieldDefaultProps: nCascaderDefaultProps,
    })
    const placeholder = ref(genPlaceholder('cascader', { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder as string }))
    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value as any}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NCascader
            class="w-full"
            {...fieldProps.value as any}
            value={rawProps.value}
            placeholder={placeholder.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NCascader>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormCascader
