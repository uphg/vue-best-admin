import type { FormItemRule, FormRules, SelectOption } from 'naive-ui'
import { NAutoComplete, NCascader, NCheckbox, NCheckboxGroup, NColorPicker, NDatePicker, NDynamicInput, NDynamicTags, NForm, NFormItem, NInput, NInputNumber, NRadio, NRadioButton, NRadioGroup, NRate, NSelect, NSlider, NSwitch, NTimePicker, NTransfer, NTreeSelect, NUpload } from 'naive-ui'
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
  rules?: boolean | FormItemRule[]
  placeholder?: string
  options?: SelectOption[]
  multiple?: boolean
  min?: number
  max?: number
  [key: string]: any
}

type FieldDefinition = [string, string, FieldProps]

interface UseFormOptions {
  autoRules?: string[]
}

export function useForm(fields: FieldDefinition[], options: UseFormOptions = {}) {
  const form = ref<Record<string, any>>({})
  const formRef = ref()
  const tips = shallowRef<Record<string, any>>({})

  // 初始化表单数据
  fields.forEach(([label, key, props]) => {
    tips.value[key] = `请输入${label}`
    const tag = props?.as || 'input'

    switch (tag) {
      case 'checkbox':
      case 'checkbox-group':
      case 'checkbox-button':
      case 'checkbox-button-group':
      case 'transfer':
      case 'dynamic-tags':
        form.value[key] = []
        break
      case 'select':
      case 'tree-select':
      case 'cascader':
        form.value[key] = props?.multiple ? [] : null
        break
      case 'switch':
        form.value[key] = false
        break
      case 'input-number':
      case 'slider':
      case 'rate':
        form.value[key] = props?.min || 0
        break
      case 'date':
      case 'date-picker':
      case 'time':
      case 'time-picker':
      case 'color-picker':
        form.value[key] = null
        break
      case 'upload':
        form.value[key] = []
        break
      case 'dynamic-input':
        form.value[key] = []
        break
      default:
        form.value[key] = ''
    }
  })

  // 生成表单规则
  const formRules = computed<FormRules>(() => {
    const rules: FormRules = {}
    fields.forEach(([label, key, props]) => {
      if (props?.rules === true || options.autoRules?.includes(key)) {
        rules[key] = [{ required: true, message: `请输入${label}`, trigger: 'blur' }]
      } else if (Array.isArray(props?.rules)) {
        rules[key] = props.rules
      }
    })

    return rules
  })

  // 渲染表单项
  const renderFormItem = (field: FieldDefinition) => {
    const [label, key, props] = field
    const propsData = props || {}
    const { as: tag = 'input', placeholder, options, ...restProps } = propsData

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
        const otherProps = omit(restProps, ['options'])
        InputElement = (
          <NCheckboxGroup {...commonProps} {...otherProps}>
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
        const otherProps = omit(restProps, ['options'])
        InputElement = (
          <NRadioGroup {...commonProps} {...otherProps}>
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
        const otherProps = omit(restProps, ['options'])
        InputElement = (
          <NRadioGroup {...commonProps} {...otherProps}>
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
        InputElement = (
          <NAutoComplete
            {...commonProps}
            {...restProps}
            placeholder={placeholder ?? `请输入${label}`}
          />
        )
        break

      case 'cascader':
        InputElement = (
          <NCascader
            {...commonProps}
            {...restProps}
            placeholder={placeholder ?? `请选择${label}`}
          />
        )
        break

      case 'color-picker':
        InputElement = (
          <NColorPicker
            {...commonProps}
            {...restProps}
          />
        )
        break

      case 'dynamic-input':
        InputElement = (
          <NDynamicInput
            {...commonProps}
            {...restProps}
            placeholder={placeholder ?? `请输入${label}`}
          />
        )
        break

      case 'dynamic-tags':
        InputElement = (
          <NDynamicTags
            {...commonProps}
            {...restProps}
          />
        )
        break

      case 'checkbox-button':
      case 'checkbox-button-group': {
        const otherProps = omit(restProps, ['options'])
        InputElement = (
          <NCheckboxGroup {...commonProps} {...otherProps}>
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
        InputElement = (
          <NRate
            {...commonProps}
            {...restProps}
          />
        )
        break

      case 'tree-select':
        InputElement = (
          <NTreeSelect
            {...commonProps}
            {...restProps}
            placeholder={placeholder ?? `请选择${label}`}
          />
        )
        break

      case 'upload':
        InputElement = (
          <NUpload
            {...commonProps}
            {...restProps}
          />
        )
        break

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

    fields.forEach(([, key, props]) => {
      const tag = props?.as || 'input'

      switch (tag) {
        case 'checkbox':
        case 'checkbox-group':
        case 'checkbox-button':
        case 'checkbox-button-group':
        case 'transfer':
        case 'dynamic-tags':
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
        case 'upload':
          defaultField[key] = []
          break
        case 'dynamic-input':
          defaultField[key] = []
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
