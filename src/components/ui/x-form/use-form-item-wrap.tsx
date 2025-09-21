import type { RenderFunction, SetupContext } from 'vue'
import type { XFormContext } from './types'
import type { InputElement } from '@/types/form'
import { NFormItem, NFormItemGi } from 'naive-ui'
import { nGridItemPropNames } from './form-props'
import { genFormItemRule } from './helpers'
import { nFormItemDefaultProps, nFormItemPropNames } from './n-form-props'
import { useMergeDefaultProps } from './use-merge-default-props'
import XFormItemWrap from './x-form-item-wrap'

interface FormItemWrapOptions {
  fieldType: InputElement
  formContext: XFormContext
  render?: RenderFunction
}

export function useFormItemWrap<T extends Record<string, any>>(rawProps: T, { slots }: SetupContext<any[], any>, options: FormItemWrapOptions) {
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
  }, formItemProps] as const
}
