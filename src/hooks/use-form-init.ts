interface FormInitOptions<T> {
  initialData: T
  rules?: Record<string, any>
}

export function useFormInit<T extends Record<string, any>>(options: FormInitOptions<T>) {
  const formRef = ref()
  const form = ref({ ...options.initialData })
  const formRules = options.rules || {}

  const resetForm = () => {
    Object.assign(form, options.initialData)
  }

  return {
    formRef,
    form,
    formRules,
    resetForm,
  }
}
