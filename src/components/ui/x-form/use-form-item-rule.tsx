import type { XFormProps } from './x-form'
import type { InputElement } from '@/types/form'
import { genFormItemRule } from './helpers'

interface FormItemRuleOptions {
  props: Ref<Record<string, any>>
  rules: Ref<Record<string, any>>
  autoRules: Ref<XFormProps['autoRules']>
}

export function useFormItemRule(fieldType: InputElement, { props, rules, autoRules }: FormItemRuleOptions) {
  watchEffect(() => {
    genFormItemRule(fieldType, { props: props.value, rules: rules.value, autoRules: autoRules.value })
  })
}
