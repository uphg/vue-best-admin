import type { PlaceholderConfig, XFormComponentType } from './types'
import { selectTypes } from '@/constants/form'

/**
 * 生成 placeholder 文本
 * @param label 标签文本
 * @param type 组件类型
 * @param customPlaceholder 自定义 placeholder
 * @param placeholderPrefix 自定义前缀配置
 * @returns placeholder 文本
 */
export function generatePlaceholder(
  label?: string,
  type: XFormComponentType = 'input',
  customPlaceholder?: string,
  placeholderPrefix?: Partial<PlaceholderConfig>,
): string {
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
    ...placeholderPrefix,
  }

  const prefix = selectTypes.includes(type) ? config.select : config.input
  return `${prefix}${label}`
}

/**
 * 合并默认属性
 * @param defaultProps 默认属性配置
 * @param componentType 组件类型
 * @param currentProps 当前属性
 * @returns 合并后的属性
 */
export function mergeDefaultProps(
  defaultProps: Record<string, any> = {},
  componentType: XFormComponentType,
  currentProps: Record<string, any> = {},
): Record<string, any> {
  const typeDefaults = defaultProps[componentType] || {}
  const globalDefaults = defaultProps.global || {}

  // 合并顺序：全局默认 < 组件类型默认 < 当前属性
  return {
    ...globalDefaults,
    ...typeDefaults,
    ...currentProps,
  }
}

/**
 * 判断是否为选择类型的组件
 * @param type 组件类型
 * @returns 是否为选择类型
 */
export function isSelectType(type: XFormComponentType): boolean {
  const selectTypes: XFormComponentType[] = [
    'select',
    'date-picker',
    'time-picker',
    'cascader',
    'tree-select',
    'color-picker',
    'transfer',
  ]
  return selectTypes.includes(type)
}

/**
 * 判断是否为输入类型的组件
 * @param type 组件类型
 * @returns 是否为输入类型
 */
export function isInputType(type: XFormComponentType): boolean {
  const inputTypes: XFormComponentType[] = [
    'input',
    'textarea',
    'input-number',
    'auto-complete',
    'dynamic-input',
    'mention',
  ]
  return inputTypes.includes(type)
}

/**
 * 获取组件的默认值
 * @param type 组件类型
 * @param multiple 是否多选（适用于 select 等组件）
 * @returns 默认值
 */
export function getDefaultValue(type: XFormComponentType, multiple = false): any {
  switch (type) {
    case 'checkbox':
    case 'dynamic-tags':
    case 'dynamic-input':
    case 'transfer':
    case 'upload':
      return []

    case 'select':
    case 'cascader':
    case 'tree-select':
      return multiple ? [] : null

    case 'switch':
      return false

    case 'input-number':
    case 'slider':
    case 'rate':
      return 0

    case 'date-picker':
    case 'time-picker':
    case 'color-picker':
      return null

    case 'input-otp':
    case 'mention':
      return ''

    default:
      return null
  }
}

/**
 * 深度合并对象
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的对象
 */
export function deepMerge(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
  const result = { ...target }

  for (const key in source) {
    if (source.hasOwn(key)) {
      const sourceValue = source[key]
      const targetValue = result[key]

      if (isObject(sourceValue) && isObject(targetValue)) {
        result[key] = deepMerge(targetValue, sourceValue)
      } else {
        result[key] = sourceValue
      }
    }
  }

  return result
}

/**
 * 判断是否为对象
 * @param value 值
 * @returns 是否为对象
 */
function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * 提取 NFormItem 的属性
 * @param props 组件属性
 * @returns NFormItem 属性和其他属性
 */
export function extractFormItemProps(props: Record<string, any>) {
  const formItemPropNames = [
    'path',
    'rule',
    'first',
    'ignorePathChange',
    'showFeedback',
    'showLabel',
    'showRequireMark',
    'requireMarkPlacement',
    'labelWidth',
    'labelAlign',
    'labelPlacement',
    'labelStyle',
    'feedback',
    'feedbackClass',
    'feedbackStyle',
    'size',
    'validationStatus',
  ]

  const formItemProps: Record<string, any> = {}
  const otherProps: Record<string, any> = {}

  for (const key in props) {
    if (formItemPropNames.includes(key) || key === 'label') {
      formItemProps[key] = props[key]
    } else {
      otherProps[key] = props[key]
    }
  }

  return { formItemProps, otherProps }
}
