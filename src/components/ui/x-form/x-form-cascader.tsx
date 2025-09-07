import type { CascaderProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NCascader, NFormItem } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { nCascaderDefaultProps, nCascaderPropNames, nCascaderProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { genPlaceholder } from './helpers'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import { xFormItemProps } from './props'
import XFormItemWrap from './x-form-item-wrap'

const xCascaderProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nCascaderProps,
}

type XCascaderProps = ExtractPublicPropTypes<typeof xCascaderProps>

const fieldType = 'cascader'

const XFormCascader = defineComponent({
  name: 'XFormCascader',
  props: xCascaderProps,
  emits: ['update:value'],
  setup(rawProps: XCascaderProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemWrapClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<CascaderProps>(rawProps, { defaultProps, rules, autoRules, formItemWrapClass }, {
      fieldType,
      formItemPropNames: nFormItemPropNames,
      fieldPropNames: nCascaderPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
      fieldDefaultProps: nCascaderDefaultProps,
    })
    const placeholder = ref(genPlaceholder(fieldType, { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder as string }))
    function handleUpdateValue(...args: any[]) {
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
              <NCascader
                class="w-full"
                {...fieldProps.value as any}
                value={rawProps.value}
                placeholder={placeholder.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NCascader>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

export default XFormCascader
