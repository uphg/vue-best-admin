import type { FormRules } from 'naive-ui'
import type { PlaceholderConfig } from './types'
import type { InputElement } from '@/types/form'
import { assign, isNil } from 'lodash-es'
import { selectTypes } from '@/constants/form'
import { getFieldRuleConfig, hasNestedRule, setNestedRule } from '@/utils/form'

export function resolveProps<T extends Record<string, any>>(props: T, defaultProps: T, provideDefaultProps?: T): T {
  const result = {} as T
  Object.assign(result, defaultProps)
  for (const key in defaultProps) {
    if (provideDefaultProps && !isNil(provideDefaultProps[key])) {
      result[key] = provideDefaultProps[key]
    }
    if (!isNil(props[key])) {
      result[key] = props[key]
    }
  }
  return assign({}, defaultProps, provideDefaultProps, props)
}

export function genPlaceholder(
  type: InputElement = 'input',
  options: {
    label?: string | null
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

export function genFormItemRule(type: InputElement, { props, rules, autoRules }: { props: Record<string, any>, rules: FormRules, autoRules?: boolean | string[] }) {
  const { path, label } = props

  if (!path || !label || hasNestedRule(rules, path)) {
    return
  }

  if (typeof autoRules === 'boolean') {
    if (!autoRules) return
  } else {
    if (!autoRules?.includes(path)) return
  }

  const rule = getFieldRuleConfig(type || 'input', { label })
  if (rule) {
    if (path.includes('.')) {
      setNestedRule(rules, path, rule)
    } else {
      rules[path] = rule
    }
  }
}
