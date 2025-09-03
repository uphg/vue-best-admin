import type { PlaceholderConfig, XFormComponentType } from './types'
import { merge } from 'lodash-es'
import { selectTypes } from '@/constants/form'

export function mergeProps<T extends Record<string, any>>(props: T, defaultProps: T, provideDefaultProps: T): T {
  return merge(defaultProps, provideDefaultProps, props)
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
