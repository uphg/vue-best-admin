import type { FormItemRule, FormRules, SelectOption } from 'naive-ui'
import { NCheckbox, NCheckboxGroup, NDatePicker, NForm, NFormItem, NInput, NInputNumber, NRadio, NRadioButton, NRadioGroup, NSelect, NSlider, NSwitch, NTimePicker, NTransfer } from 'naive-ui'
import { omit } from 'naive-ui/es/_utils'

interface FieldConfig {
  as?: 'input' | 'select' | 'date' | 'date-picker' | 'time' | 'time-picker' | 'checkbox-group' | 'checkbox'
    | 'radio' | 'radio-group' | 'radio-button' | 'radio-button-group' | 'switch'
    | 'input-number' | 'time-picker' | 'slider' | 'transfer' | 'checkbox' | 'checkbox'
  placeholder?: string
  options?: SelectOption[]
  rules?: boolean | FormItemRule[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  multiple?: boolean
  [key: string]: any
}

type FieldDefinition = [string, string, FieldConfig?]

interface UseFormOptions {
  autoRules?: string[]
}

export function useForm(fields: FieldDefinition[], options: UseFormOptions = {}) {
  const form = ref<Record<string, any>>({})
  const formRef = ref()
  const tips = shallowRef<Record<string, any>>({})

  // 初始化表单数据
  fields.forEach(([label, key, config]) => {
    tips.value[key] = `请输入${label}`
    const tag = config?.as || 'input'

    switch (tag) {
      case 'checkbox':
      case 'transfer':
        form.value[key] = []
        break
      case 'select':
        form.value[key] = config?.multiple ? [] : null
        break
      case 'switch':
        form.value[key] = false
        break
      case 'input-number':
      case 'slider':
        form.value[key] = config?.min || 0
        break
      case 'date':
      case 'time-picker':
        form.value[key] = null
        break
      default:
        form.value[key] = ''
    }
  })

  // 生成表单规则
  const formRules = computed<FormRules>(() => {
    const rules: FormRules = {}
    fields.forEach(([label, key, config]) => {
      if (config?.rules === true || options.autoRules?.includes(key)) {
        rules[key] = [{ required: true, message: `请输入${label}`, trigger: 'blur' }]
      } else if (Array.isArray(config?.rules)) {
        rules[key] = config.rules
      }
    })

    return rules
  })

  // 渲染表单项
  const renderFormItem = (field: FieldDefinition) => {
    const [label, key, config = {}] = field
    const { as: tag = 'input', placeholder, ...restProps } = config

    const commonProps = {
      'value': form.value[key],
      'onUpdate:value': (value: any) => {
        form.value[key] = value
      },
    }

    let InputElement
    switch (tag) {
      case 'input':
        InputElement = (
          <NInput
            {...commonProps}
            {...restProps}
            placeholder={placeholder ?? `请输入${label}`}
          />
        )
        break

      case 'input-number':
        InputElement = (
          <NInputNumber
            {...commonProps}
            {...restProps}
            placeholder={placeholder ?? `请输入${label}`}
          />
        )
        break

      case 'select':
        InputElement = (
          <NSelect
            {...commonProps}
            {...restProps}
            placeholder={placeholder ?? `请选择${label}`}
          />
        )
        break

      case 'date':
      case 'date-picker':
        InputElement = (
          <NDatePicker
            {...commonProps}
            {...restProps}
            placeholder={placeholder ?? `请选择${label}`}
          />
        )
        break
      case 'time':
      case 'time-picker':
        InputElement = (
          <NTimePicker
            {...commonProps}
            {...restProps}
            placeholder={placeholder ?? `请选择${label}`}
          />
        )
        break

      case 'switch':
        InputElement = (
          <NSwitch {...commonProps} {...restProps} />
        )
        break

      case 'slider':
        InputElement = (
          <NSlider {...commonProps} {...restProps} />
        )
        break

      case 'checkbox':
      case 'checkbox-group': {
        const props = omit(restProps, ['options'])
        InputElement = (
          <NCheckboxGroup {...commonProps} {...props}>
            {restProps.options?.map(option => (
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
        const props = omit(restProps, ['options'])
        InputElement = (
          <NRadioGroup {...commonProps} {...props}>
            {restProps.options?.map(option => (
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
        const props = omit(restProps, ['options'])
        InputElement = (
          <NRadioGroup {...commonProps} {...props}>
            {restProps.options?.map(option => (
              <NRadioButton key={option.value} value={option.value}>
                {option.label}
              </NRadioButton>
            ))}
          </NRadioGroup>
        )
        break
      }

      case 'transfer':
        InputElement = (
          <NTransfer
            {...commonProps}
            {...restProps}
          />
        )
        break

      default:
        InputElement = (
          <NInput
            {...commonProps}
            {...restProps}
            placeholder={placeholder ?? `请输入${label}`}
          />
        )
    }

    return (
      <NFormItem key={key} path={key} label={label}>
        {InputElement}
      </NFormItem>
    )
  }

  // 表单组件
  const Form = defineComponent(() => {
    return () => (
      <NForm
        ref={formRef}
        model={form.value}
        rules={formRules.value}
        labelPlacement="left"
        labelWidth="auto"
        requireMarkPlacement="right-hanging"
        size="medium"
      >
        {fields.map(renderFormItem)}
      </NForm>
    )
  })

  // 重置表单
  function resetForm() {
    setFields(createDefaultField())
    clearValidation()
  }

  // === 工具方法 ===

  // 创建默认字段
  function createDefaultField() {
    const defaultField: Record<string, any> = {}

    fields.forEach(([, key, config]) => {
      const type = config?.type || 'input'

      switch (type) {
        case 'checkbox':
        case 'checkbox-group':
        case 'checkbox-button':
        case 'checkbox-button-group':
        case 'transfer':
          defaultField[key] = []
          break
        case 'switch':
          defaultField[key] = false
          break
        case 'input-number':
        case 'slider':
          defaultField[key] = config?.min || 0
          break
        case 'date':
        case 'date-picker':
        case 'time':
        case 'time-picker':
          defaultField[key] = null
          break
        default:
          defaultField[key] = ''
      }
    })

    return defaultField
  }

  // 重置字段
  function resetField() {
    const defaultData = createDefaultField()
    form.value = defaultData
    formRef.value?.restoreValidation()
  }

  // 批量设置字段
  function setFields(fields: Partial<Record<string, any>>) {
    Object.assign(form.value, fields)
  }

  // 验证表单
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

  // 清除验证
  function clearValidation() {
    formRef.value?.restoreValidation()
  }

  return [Form, form, { formRef, resetForm, setFields, resetField, validate, clearValidation }] as const
}
