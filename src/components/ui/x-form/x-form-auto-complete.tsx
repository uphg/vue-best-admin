import type { AutoCompleteProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { NAutoComplete, NFormItem } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { nAutoCompleteDefaultProps, nAutoCompletePropNames, nAutoCompleteProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { genPlaceholder } from './helpers'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'
import { xFormItemProps } from './props'
import XFormItemWrap from './x-form-item-wrap'

const xAutoCompleteProps = {
  ...xFormItemProps,
  ...nFormItemProps,
  ...nAutoCompleteProps,
}

type XAutoCompleteProps = ExtractPublicPropTypes<typeof xAutoCompleteProps>

const fieldType = 'auto-complete'

const XFormAutoComplete = defineComponent({
  name: 'XFormAutoComplete',
  props: xAutoCompleteProps,
  emits: ['update:value'],
  setup(rawProps: XAutoCompleteProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemWrapClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<AutoCompleteProps>(rawProps, { defaultProps, rules, autoRules, formItemWrapClass }, {
      fieldType,
      formItemPropNames: nFormItemPropNames,
      fieldPropNames: nAutoCompletePropNames,
      formItemDefaultProps: nFormItemDefaultProps,
      fieldDefaultProps: nAutoCompleteDefaultProps,
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
              <NAutoComplete
                class="w-full"
                {...fieldProps.value as any}
                value={rawProps.value}
                placeholder={placeholder.value}
                onUpdate:value={handleUpdateValue}
              >
                {slots}
              </NAutoComplete>
            ),
            itemSuffix: slots.itemSuffix,
          }}
        />
      </NFormItem>
    )
  },
})

export default XFormAutoComplete
