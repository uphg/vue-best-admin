import { NFormItem, NFormItemGi } from 'naive-ui'
import { watchEffect } from 'vue'
import { nGridItemPropNames } from './form-props.js'
import { genFormItemRule } from './helpers.jsx'
import { nFormItemDefaultProps, nFormItemPropNames } from './n-form-props.js'
import { useMergeDefaultProps } from './use-merge-default-props.jsx'
import XFormItemWrap from './x-form-item-wrap.jsx'

export function useFormItemWrap(rawProps, { slots }, options) {
  const { fieldType, render, formContext } = options
  const { defaultProps, rules, autoRules, formItemWrapClass, grid } = formContext
  const formItemProps = useMergeDefaultProps({
    rawProps,
    propNames: grid.value ? nFormItemPropNames.concat(nGridItemPropNames) : nFormItemPropNames,
    defaultProps: nFormItemDefaultProps,
    provideProps: defaultProps.value.formItem,
  })

  watchEffect(() => {
    genFormItemRule(fieldType, { props: formItemProps.value, rules: rules.value, autoRules: autoRules.value })
  })

  return [() => {
    const FormItem = grid.value ? NFormItemGi : NFormItem
    return (
      <FormItem {...formItemProps.value}>
        {{
          feedback: slots?.feedback,
          label: slots?.label,
          default: () => (
            <XFormItemWrap
              wrap={rawProps.wrap}
              wrapClass={rawProps.wrapClass}
              provideWrapClass={formItemWrapClass.value}
              v-slots={{
                itemPrefix: slots.itemPrefix,
                itemSuffix: slots.itemSuffix,
                default: render,
              }}
            />
          ),
        }}

      </FormItem>
    )
  }, formItemProps]
}