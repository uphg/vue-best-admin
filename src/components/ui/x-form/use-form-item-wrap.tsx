import type { RenderFunction, SetupContext } from 'vue'
import type { XFormContext } from './types'
import type { InputElement } from '@/types/form'
import { NFormItem } from 'naive-ui'
import { nFormItemDefaultProps, nFormItemPropNames } from './common'
import { genFormItemRule } from './helpers'
import { useMergeDefaultProps } from './use-merge-default-props'
import XFormItemWrap from './x-form-item-wrap'

interface FormItemWrapOptions {
  fieldType: InputElement
  render: RenderFunction
  formContext: XFormContext
}

export function useFormItemWrap<T extends Record<string, any>>(rawProps: T, { slots }: SetupContext<any[], any>, options: FormItemWrapOptions) {
  const { fieldType, render, formContext } = options
  const { defaultProps, rules, autoRules, formItemWrapClass } = formContext
  const formItemProps = useMergeDefaultProps({
    rawProps,
    propNames: nFormItemPropNames,
    defaultProps: nFormItemDefaultProps,
    provideProps: defaultProps.value.formItem,
  })

  watchEffect(() => {
    genFormItemRule(fieldType, { props: formItemProps.value, rules: rules.value, autoRules: autoRules.value })
  })

  return [() => (
    <NFormItem {...formItemProps.value}>
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
    </NFormItem>
  ), formItemProps] as const
}
