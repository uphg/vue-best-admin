import type { FormInst } from 'naive-ui'

interface FormFieldConfig {
  [key: string]: any
}

export function useFormOptions<T extends FormFieldConfig>(defaultField: T | (() => T)) {
  // 表单数据
  const form = ref<T>(createDefaultField())

  // 表单引用
  const formRef = shallowRef<FormInst | null>(null)

  // 创建默认字段
  function createDefaultField(): T {
    if (typeof defaultField === 'function') {
      return defaultField()
    }
    return JSON.parse(JSON.stringify(defaultField))
  }

  // 重置字段
  function resetField() {
    const defaultData = createDefaultField()
    form.value = defaultData
    formRef.value?.restoreValidation()
  }

  // 设置字段值
  function setField(key: keyof T, value: any) {
    form.value[key] = value
  }

  // 批量设置字段
  function setFields(fields: Partial<T>) {
    Object.assign(form.value, fields)
  }

  // 获取字段值
  function getField(key: keyof T) {
    return form.value[key]
  }

  // 验证表单
  async function validate() {
    try {
      await formRef.value?.validate()
      return true
    } catch (error) {
      return false
    }
  }

  // 验证指定字段
  async function validateField(key: keyof T) {
    try {
      await formRef.value?.validate(undefined, (rule) => {
        return rule.key === String(key)
      })
      return true
    } catch (error) {
      return false
    }
  }

  // 清除验证
  function clearValidation() {
    formRef.value?.restoreValidation()
  }

  // 清除指定字段验证
  function clearFieldValidation(key: keyof T) {
    // Naive UI 的 restoreValidation 不支持单个字段参数，只能全部清除
    formRef.value?.restoreValidation()
  }

  return {
    // 响应式数据
    form,
    formRef,

    // 基础操作
    createDefaultField,
    resetField,
    setField,
    setFields,
    getField,

    // 验证相关
    validate,
    validateField,
    clearValidation,
    clearFieldValidation,
  }
}
