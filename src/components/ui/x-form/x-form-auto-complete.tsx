import type { AutoCompleteProps } from 'naive-ui'
import { NAutoComplete, NFormItem } from 'naive-ui'
import { defineComponent, ref, type ExtractPublicPropTypes } from 'vue'
import { mergeClass } from '@/utils/merge-class'
import { nAutoCompleteDefaultProps, nAutoCompletePropNames, nAutoCompleteProps, nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'
import { genPlaceholder } from './helpers'
import { useFormContext } from './use-form-context'
import { useFormProps } from './use-form-props'

const xAutoCompleteProps = {
  contentClass: [String, Object, Array],
  ...nFormItemProps,
  ...nAutoCompleteProps,
}

type XAutoCompleteProps = ExtractPublicPropTypes<typeof xAutoCompleteProps>

const XFormAutoComplete = defineComponent({
  name: 'XFormAutoComplete',
  props: xAutoCompleteProps,
  emits: ['update:value'],
  setup(rawProps: XAutoCompleteProps, { emit, slots }) {
    const { defaultProps, rules, autoRules, formItemContentClass } = useFormContext()
    const [fieldProps, formItemProps] = useFormProps<AutoCompleteProps>(rawProps, { defaultProps, rules, autoRules, formItemContentClass }, {
      fieldType: 'autoComplete',
      formItemPropNames: nFormItemPropNames,
      fieldPropNames: nAutoCompletePropNames,
      formItemDefaultProps: nFormItemDefaultProps,
      fieldDefaultProps: nAutoCompleteDefaultProps,
    })
    const placeholder = ref(genPlaceholder('autoComplete', { label: formItemProps.value.label, placeholder: fieldProps.value.placeholder as string }))
    function handleUpdateValue(...args: any[]) {
      emit('update:value', ...args)
    }

    return () => (
      <NFormItem {...formItemProps.value as any}>
        <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
          {slots.itemPrefix ? slots.itemPrefix() : null}
          <NAutoComplete
            class="w-full"
            {...fieldProps.value as any}
            value={rawProps.value}
            placeholder={placeholder.value}
            onUpdate:value={handleUpdateValue}
          >
            {slots}
          </NAutoComplete>
          {slots.itemSuffix ? slots.itemSuffix() : null}
        </div>
      </NFormItem>
    )
  },
})

export default XFormAutoComplete
