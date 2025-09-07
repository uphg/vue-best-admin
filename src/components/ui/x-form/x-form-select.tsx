import type { SelectProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NFormItem, NSelect } from 'naive-ui'
import { defineComponent, ref } from 'vue'

import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps, nSelectDefaultProps, nSelectPropNames, nSelectProps } from './common'
import { genPlaceholder } from './helpers'
import { xFormItemProps } from './props'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import XFormItemWrap from './x-form-item-wrap'

const xSelectProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nSelectProps,
}

type XSelectProps = ExtractPublicPropTypes<typeof xSelectProps>

const fieldType = 'select'

const XFormSelect = defineComponent({
  name: 'XFormSelect',
  props: xSelectProps,
  emits: ['update:value'],
  setup(rawProps: XSelectProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemWrapClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<SelectProps>(rawProps, { defaultProps, rules, autoRules, formItemWrapClass }, {
      fieldType,
      formItemPropNames: nFormItemPropNames,
      fieldPropNames: nSelectPropNames,
      formItemDefaultProps: nFormItemDefaultProps,
      fieldDefaultProps: nSelectDefaultProps,
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
              <NSelect
                {...fieldProps.value as any}
                value={rawProps.value}
                placeholder={placeholder.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NSelect>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

export default XFormSelect
