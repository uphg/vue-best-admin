import type { FormItemProps } from 'naive-ui'
import type { XFormContext } from './types'
import type { CamelInputElement, InputElement } from '@/types/form'
import { camelize } from '@vue/shared'
import { assign, pick } from 'lodash-es'
import { ref, watch } from 'vue'
import { genFormItemRule, resolveProps } from './helpers'

export interface UseFormFieldOptions {
  fieldType: InputElement
  formItemPropNames: string[]
  fieldPropNames: string[]
  formItemDefaultProps: Partial<FormItemProps>
  fieldDefaultProps: Record<string, any>
}

export function useFormProps<T extends Record<string, any>>(rawProps: Record<string, any>, context: XFormContext, options: UseFormFieldOptions) {
  const { fieldType, fieldPropNames, fieldDefaultProps, formItemPropNames, formItemDefaultProps } = options

  // 一次性合并默认值
  const staticDefaults = {
    formItem: resolveProps(
      pick(rawProps, formItemPropNames),
      formItemDefaultProps,
      context.defaultProps.value?.formItem ?? {},
    ),
    field: resolveProps(
      pick(rawProps, fieldPropNames),
      fieldDefaultProps,
      context.defaultProps.value?.[camelize(fieldType) as CamelInputElement] ?? {},
    ),
  }

  // 响应式 props
  const formItemProps = ref<FormItemProps>(assign({}, staticDefaults.formItem))
  const fieldProps = ref<T>(assign({}, staticDefaults.field) as any)

  // 监听 props 变化
  watch(
    () => pick(rawProps, formItemPropNames),
    (newProps) => {
      formItemProps.value = assign({}, formItemProps.value, newProps) as Record<string, any>
    },
    { deep: true },
  )

  watch(
    () => pick(rawProps, fieldPropNames),
    (newProps) => {
      fieldProps.value = assign({}, fieldProps.value, newProps) as Record<string, any>
    },
    { deep: true },
  )

  // 生成表单规则
  watchEffect(() => {
    genFormItemRule(fieldType, { props: formItemProps.value, rules: context.rules.value, autoRules: context.autoRules.value })
  })

  return [fieldProps, formItemProps] as [Ref<T>, Ref<FormItemProps>]
}
