import type { FormRules } from 'naive-ui'
import type { PlaceholderConfig } from './types'
import type { CamelInputElement } from '@/types/form'
import { assign, isNil, pick } from 'lodash-es'
import { NFormItem } from 'naive-ui'
import { selectTypes } from '@/constants/form'
import { getFieldRuleConfig, hasNestedRule, setNestedRule } from '@/utils/form'
import { mergeClass } from '@/utils/merge-class'
import { useFormContext } from './use-form-context'
import { nFormItemDefaultProps, nFormItemPropNames, nFormItemProps } from './common'

export function createFormFieldComponent(
  componentName: string,
  FieldComponent: any,
  fieldPropNames: string[],
  fieldDefaultProps: any,
  placeholderType: CamelInputElement,
) {
  return defineComponent({
    name: componentName,
    props: {
      contentClass: [String, Object, Array],
      ...nFormItemProps,
      ...FieldComponent.props,
    },
    emits: ['update:value'],
    setup(rawProps: Record<string, any>, { emit, slots }) {
      const { defaultProps, rules, autoRules, formItemContentClass } = useFormContext()

      const formItemProps = computed(() =>
        resolveProps(pick(rawProps, nFormItemPropNames), nFormItemDefaultProps, defaultProps.value?.formItem ?? {}),
      )

      const fieldProps = computed(() =>
        resolveProps(pick(rawProps, fieldPropNames), fieldDefaultProps, defaultProps.value?.[placeholderType] ?? {}),
      )

      const placeholder = computed(() =>
        genPlaceholder(placeholderType, {
          label: formItemProps.value.label,
          placeholder: fieldProps.value.placeholder,
        }),
      )

      genFormItemRule(formItemProps.value, rules.value, autoRules.value)

      function handleUpdateValue(...args: any[]) {
        emit('update:value', ...args)
      }

      return () => (
        <NFormItem {...formItemProps.value}>
          <div class={mergeClass('w-full', formItemContentClass.value, rawProps.contentClass)}>
            {slots.itemPrefix?.()}
            <FieldComponent
              class="w-full"
              {...fieldProps.value}
              value={rawProps.value}
              placeholder={placeholder.value}
              onUpdate:value={handleUpdateValue}
            >
              {slots}
            </FieldComponent>
            {slots.itemSuffix?.()}
          </div>
        </NFormItem>
      )
    },
  })
}

export function resolveProps<T extends Record<string, any>>(props: T, defaultProps: T, provideDefaultProps?: T): T {
  const result = {} as T
  console.log('resolveProps')
  console.log('props', props)
  console.log('defaultProps', defaultProps)
  console.log('provideDefaultProps', provideDefaultProps)
  //
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
  type: CamelInputElement = 'input',
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
