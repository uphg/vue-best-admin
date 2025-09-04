import type { FormRules } from 'naive-ui'
import type { PlaceholderConfig, XFormComponentType } from './types'
import { merge } from 'lodash-es'
import { selectTypes } from '@/constants/form'
import { getFieldRuleConfig, hasNestedRule, setNestedRule } from '@/utils/form'

export function mergeProps<T extends Record<string, any>>(props: T, defaultProps: T, provideDefaultProps: T): T {
  return merge({}, defaultProps, provideDefaultProps, props)
}

export function genPlaceholder(
  type: XFormComponentType = 'input',
  options: {
    label?: string
    placeholder?: string
    prefixConfig?: Partial<PlaceholderConfig>
  },
): string {
  const { label, placeholder: customPlaceholder, prefixConfig } = options
  // 如果有自定义 placeholder，直接返回
  if (customPlaceholder) {
    return customPlaceholder
  }

  // 如果没有 label，返回默认值
  if (!label) {
    return selectTypes.includes(type) ? '请选择' : '请输入'
  }

  // 根据组件类型生成 placeholder
  const config: PlaceholderConfig = {
    input: '请输入',
    select: '请选择',
    ...prefixConfig,
  }

  const placeholderPrefix = selectTypes.includes(type) ? config.select : config.input
  return `${placeholderPrefix}${label}`
}

export function genFormItemRule(props: Record<string, any>, rules: FormRules, autoRules: boolean | string[] = false) {
  const { path, label, type } = props
  if (!path || !label || hasNestedRule(rules, path)) {
    return
  }

  if (typeof autoRules === 'boolean') {
    if (!autoRules) return
  } else {
    if (!autoRules?.includes(path)) return
  }

  const rule = getFieldRuleConfig(type || 'input', label)
  if (rule) {
    if (path.includes('.')) {
      setNestedRule(rules, path, rule)
    } else {
      rules[path] = rule
    }
  }
}
