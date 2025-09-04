import type { FormRules } from 'naive-ui'
import type { InputElement } from '@/types/form'
import { selectTypes } from '@/constants/form'

export function getFieldRuleConfig(tag: InputElement, label?: string | null) {
  const baseRule = {
    required: true,
    message: selectTypes.includes(tag) ? `请选择${label}` : `请输入${label}`,
  }

  switch (tag) {
    case 'input':
    case 'auto-complete':
    case 'dynamic-input':
      return {
        ...baseRule,
        trigger: ['blur', 'input'],
      }

    case 'select':
    case 'tree-select':
    case 'cascader':
    case 'date':
    case 'date-picker':
    case 'time':
    case 'time-picker':
    case 'radio':
    case 'radio-group':
    case 'radio-button':
    case 'radio-button-group':
      return {
        ...baseRule,
        trigger: ['blur', 'change'],
        validator: (_rule: any, value: any) => {
          if (value === null || value === undefined || value === '') {
            return new Error(baseRule.message)
          }
          return true
        },
      }

    case 'checkbox':
    case 'checkbox-group':
    case 'checkbox-button':
    case 'checkbox-button-group':
    case 'dynamic-tags':
    case 'transfer':
    case 'upload':
      return {
        type: 'array' as const,
        ...baseRule,
        trigger: 'change',
      }

    case 'input-number':
      return {
        type: 'number' as const,
        ...baseRule,
        trigger: ['blur', 'change'],
      }

    case 'switch':
      return {
        type: 'boolean' as const,
        ...(baseRule),
        trigger: 'change',
      }

    case 'slider':
    case 'rate':
      return {
        type: 'number' as const,
        ...baseRule,
        trigger: ['blur', 'change'],
      }

    case 'color-picker':
      return {
        ...baseRule,
        trigger: 'change',
      }

    default:
      return {
        ...baseRule,
        trigger: ['blur', 'input'],
      }
  }
}

export function setNestedRule(rules: FormRules, path: string, ruleConfig: any) {
  const keys = path.split('.')
  let current: any = rules

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!current[key]) {
      current[key] = {}
    }
    current = current[key]
  }

  const lastKey = keys[keys.length - 1]
  current[lastKey] = ruleConfig
}

export function hasNestedRule(rules: FormRules, path: string): boolean {
  const keys = path.split('.')
  let current: any = rules

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (!current[key]) {
      return false
    }
    current = current[key]
  }

  return true
}
