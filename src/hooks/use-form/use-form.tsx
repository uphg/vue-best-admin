import type { FormRules, SelectOption } from 'naive-ui'
import { isObject } from '@vueuse/core'
import { assign, pick } from 'lodash-es'
import { NAutoComplete, NCascader, NCheckbox, NCheckboxGroup, NColorPicker, NDatePicker, NDynamicInput, NDynamicTags, NForm, NFormItem, NFormItemGi, NGrid, NInput, NInputNumber, NRadio, NRadioButton, NRadioGroup, NRate, NSelect, NSlider, NSwitch, NTimePicker, NTransfer, NTreeSelect, NUpload } from 'naive-ui'
import { omit } from 'naive-ui/es/_utils'

type FieldAs = 'auto-complete'
  | 'cascader'
  | 'color-picker'
  | 'checkbox' | 'checkbox-button' | 'checkbox-group' | 'checkbox-button-group'
  | 'date' | 'date-picker'
  | 'dynamic-input'
  | 'dynamic-tags'
  | 'input'
  | 'input-number'
  | 'radio' | 'radio-group' | 'radio-button' | 'radio-button-group'
  | 'switch'
  | 'rate'
  | 'select'
  | 'slider'
  | 'switch'
  | 'time' | 'time-picker'
  | 'transfer'
  | 'tree-select'
  | 'upload'

interface FieldProps {
  as?: FieldAs
  [key: string]: any
}

type NestedField = [string, string, FieldProps]
type NestedFieldGroup = [string, NestedField[], Record<string, any>]
type RegularField = [string, string, FieldProps]
type FieldDefinition = RegularField | NestedFieldGroup

interface FormProps {
  autoRules?: string[]
  [key: string]: any
}

const defaultFormProps = {
  labelPlacement: 'left',
  labelWidth: 'auto',
  requireMarkPlacement: 'right-hanging',
  size: 'medium',
}
const nFormItemPropNames = ['showFeedback', 'showLabel', 'showRequireMark', 'requireMarkPlacement', 'labelPlacement', 'labelAlign', 'labelStyle', 'labelProps', 'labelWidth', 'first', 'ignorePathChange', 'rulePath', 'rule']
const selectTypes = ['select', 'tree-select', 'cascader', 'date', 'date-picker', 'time', 'time-picker', 'radio', 'radio-group', 'radio-button', 'radio-button-group', 'checkbox', 'checkbox-group', 'checkbox-button', 'checkbox-button-group', 'color-picker', 'switch', 'slider', 'rate', 'transfer', 'upload']

export function useForm(fields: FieldDefinition[], options: FormProps = {}) {
  const form = ref<Record<string, any>>({})
  const formRef = ref()
  const tips = shallowRef<Record<string, any>>({})
  const { itemsNodeMap, flattenedFields } = createItemNodeMap(fields, form)
  const defaultField = createDefaultField()
  flattenedFields.forEach(([label, key]) => {
    tips.value[key] = `请输入${label}`
    form.value[key] = defaultField[key]
  })

  const formRules = ref(createFormRules(flattenedFields, options))
  const formProps = assign({}, defaultFormProps, omit(options, ['autoRules'])) as Record<string, any>

  const Form = defineComponent(() => {
    return () => (
      <NForm
        {...formProps}
        ref={formRef}
        model={form.value}
        rules={formRules.value}
      >
        {renderFields(fields, itemsNodeMap)}
      </NForm>
    )
  })

  function resetForm() {
    resetFields()
    resetValidation()
  }

  // === 工具方法 ===

  function createDefaultField() {
    const defaultField: Record<string, any> = {}
    flattenedFields.forEach(([, key, props]) => {
      const tag = props?.as || 'input'
      switch (tag) {
        case 'checkbox':
        case 'checkbox-group':
        case 'checkbox-button':
        case 'checkbox-button-group':
        case 'transfer':
        case 'dynamic-tags':
        case 'upload':
        case 'dynamic-input':
          defaultField[key] = []
          break
        case 'switch':
          defaultField[key] = false
          break
        case 'select':
        case 'tree-select':
        case 'cascader':
          defaultField[key] = props?.multiple ? [] : null
          break
        case 'input-number':
        case 'slider':
        case 'rate':
          defaultField[key] = props?.min || 0
          break
        case 'date':
        case 'date-picker':
        case 'time':
        case 'time-picker':
        case 'color-picker':
          defaultField[key] = null
          break
        default:
          defaultField[key] = null
      }
    })
    return defaultField
  }

  function resetFields() {
    const defaultValue = createDefaultField()
    setFields(defaultValue)
  }

  function setFields(fields: Partial<Record<string, any>>) {
    Object.keys(fields).forEach((key) => {
      form.value[key] = fields[key]
    })
  }

  async function validate() {
    return new Promise((resolve, reject) => {
      formRef.value?.validate((errors: any) => {
        if (errors) {
          reject(errors)
        } else {
          resolve(form.value)
        }
      })
    })
  }

  function resetValidation() {
    formRef.value?.restoreValidation()
  }

  return [Form, form, { formRef, rules: formRules, resetForm, setFields, resetFields, validate, resetValidation }] as const
}

function renderFields(fields: FieldDefinition[], itemsNodeMap: Map<string, any>) {
  return fields.map((field) => {
    if (isNestedField(field)) {
      const [label, nestedFields, gridProps] = field
      return (
        <NFormItem key={label} label={label}>
          <NGrid {...gridProps}>
            {nestedFields.map(([label, key, props]) => {
              const Input = itemsNodeMap.get(key)
              return (
                <NFormItemGi key={key} path={key} label={label} {...pick(props, nFormItemPropNames)}>
                  {Input}
                </NFormItemGi>
              )
            })}
          </NGrid>
        </NFormItem>
      )
    } else {
      const [label, key] = field
      const Input = itemsNodeMap.get(key)
      return (
        <NFormItem key={key} path={key} label={label}>
          {Input}
        </NFormItem>
      )
    }
  })
}

function isNestedField(field: FieldDefinition): field is NestedFieldGroup {
  return Array.isArray(field[1])
}

function flattenFields(fields: FieldDefinition[]): RegularField[] {
  const flattened: RegularField[] = []

  fields.forEach((field) => {
    if (isNestedField(field)) {
      const [label, nestedFields] = field
      nestedFields.forEach(([_, key, props]) => {
        flattened.push([label, key, props])
      })
    } else {
      flattened.push(field)
    }
  })

  return flattened
}

function createFormRules(fields: RegularField[], options: FormProps = {}) {
  const rules: FormRules = {}

  fields.forEach(([label, key, props]) => {
    // 优先使用手动传入的规则
    if (isObject(props?.rules)) {
      rules[key] = props.rules
      return
    }

    // 只有在 autoRules 中包含该字段时才生成规则
    if (!options.autoRules?.includes(key)) {
      return
    }

    const tag = props?.as || 'input'
    const ruleConfig = getFieldRuleConfig(tag, label, key, props)

    if (ruleConfig) {
      // 处理嵌套字段
      if (key.includes('.')) {
        setNestedRule(rules, key, ruleConfig)
      } else {
        rules[key] = ruleConfig
      }
    }
  })

  return rules
}

function getFieldRuleConfig(tag: FieldAs, label: string, key: string, props?: FieldProps) {
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

function setNestedRule(rules: FormRules, path: string, ruleConfig: any) {
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

function createItemNodeMap(fields: FieldDefinition[], form: Ref<Record<string, any>>) {
  const flattenedFields = flattenFields(fields)
  const map = new Map()

  flattenedFields.forEach((field) => {
    const [_, key] = field
    const node = createItemNode(field, form)
    map.set(key, node)
  })

  return {
    itemsNodeMap: map,
    flattenedFields,
  }

  function createItemNode(field: RegularField, form: Ref<Record<string, any>>) {
    const [label, key, _props] = field
    const propsData = _props || {}
    const { as: tag = 'input', placeholder, ...restProps } = propsData
    const modelKey = tag === 'upload' ? 'fileList' : 'value'

    const onUpdateValue = (value: any) => {
      form.value[key] = value
    }

    let InputElement
    switch (tag) {
      case 'input':
        InputElement = () => (
          <NInput
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请输入${label}`}
          />
        )
        break

      case 'input-number':
        InputElement = () => (
          <NInputNumber
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请输入${label}`}
          />
        )
        break

      case 'select':
        InputElement = () => (
          <NSelect
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请选择${label}`}
          />
        )
        break
      case 'date':
      case 'date-picker':
        InputElement = () => (
          <NDatePicker
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请选择${label}`}
          />
        )
        break
      case 'time':
      case 'time-picker':
        InputElement = () => (
          <NTimePicker
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请选择${label}`}
          />
        )
        break

      case 'switch':
        InputElement = () => (
          <NSwitch
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
          />
        )
        break

      case 'slider':
        InputElement = () => (
          <NSlider
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
          />
        )
        break

      case 'checkbox':
      case 'checkbox-group': {
        const { options } = restProps
        const otherProps = omit(restProps, ['options'])
        InputElement = () => (
          <NCheckboxGroup
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...otherProps}
          >
            {options?.map((option: SelectOption) => (
              <NCheckbox key={option.value} value={option.value}>
                {option.label}
              </NCheckbox>
            ))}
          </NCheckboxGroup>
        )
        break
      }

      case 'radio':
      case 'radio-group':{
        const { options } = restProps
        const otherProps = omit(restProps, ['options'])
        InputElement = () => (
          <NRadioGroup
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...otherProps}
          >
            {options?.map((option: SelectOption) => (
              <NRadio key={option.value} value={option.value}>
                {option.label}
              </NRadio>
            ))}
          </NRadioGroup>
        )
        break
      }

      case 'radio-button':
      case 'radio-button-group': {
        const { options } = restProps
        const otherProps = omit(restProps, ['options'])
        InputElement = () => (
          <NRadioGroup
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...otherProps}
          >
            {options?.map((option: SelectOption) => (
              <NRadioButton key={option.value} value={option.value}>
                {option.label}
              </NRadioButton>
            ))}
          </NRadioGroup>
        )
        break
      }

      case 'auto-complete':
        InputElement = () => (
          <NAutoComplete
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请输入${label}`}
          />
        )
        break

      case 'cascader':
        InputElement = () => (
          <NCascader
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请选择${label}`}
          />
        )
        break

      case 'color-picker':
        InputElement = () => (
          <NColorPicker
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
          />
        )
        break

      case 'dynamic-input':
        InputElement = () => (
          <NDynamicInput
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请输入${label}`}
          />
        )
        break

      case 'dynamic-tags':
        InputElement = () => (
          <NDynamicTags
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
          />
        )
        break

      case 'checkbox-button':
      case 'checkbox-button-group': {
        const { options } = restProps
        const otherProps = omit(restProps, ['options'])
        InputElement = () => (
          <NCheckboxGroup
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...otherProps}
          >
            {options?.map((option: SelectOption) => (
              <NCheckbox key={option.value} value={option.value}>
                {option.label}
              </NCheckbox>
            ))}
          </NCheckboxGroup>
        )
        break
      }

      case 'rate':
        InputElement = () => (
          <NRate
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
          />
        )
        break

      case 'tree-select':
        InputElement = () => (
          <NTreeSelect
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请选择${label}`}
          />
        )
        break

      case 'upload':
        InputElement = () => (
          <NUpload
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
          />
        )
        break

      case 'transfer':
        InputElement = () => (
          <NTransfer
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
          />
        )
        break

      default:
        InputElement = () => (
          <NInput
            {...{
              [modelKey]: form.value[key],
              [`onUpdate:${modelKey}`]: onUpdateValue,
            }}
            {...restProps}
            placeholder={placeholder ?? `请输入${label}`}
          />
        )
    }
    return InputElement
  }
}
