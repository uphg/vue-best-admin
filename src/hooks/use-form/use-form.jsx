import { isObject } from '@vueuse/core'
import { assign, isNil, omit } from 'lodash-es'
import { NForm, NGrid } from 'naive-ui'
import { customOptionNames, defaultFormProps } from './common'
import { createDefaultField, createFormRules, createItemNodeMap, renderFields } from './helpers'

export function useForm(fields, options = {}) {
  const form = ref({})
  const formRef = shallowRef()
  const { itemsNodeMap, flattenedFields } = createItemNodeMap(fields, form)
  const defaultField = createDefaultField(flattenedFields)
  flattenedFields.forEach(({ key }) => {
    if (isNil(key)) return
    form.value[key] = defaultField[key]
  })

  const formRules = ref(createFormRules(flattenedFields, options))
  const formProps = assign({}, defaultFormProps, omit(options, customOptionNames))
  const isGrid = !!options?.grid
  const gridProps = isObject(options?.grid) ? options.grid : {}

  const Form = defineComponent(() => {
    return () => {
      const FormItems = renderFields(fields, itemsNodeMap, isGrid)
      return (
        <NForm
          {...formProps}
          ref={formRef}
          model={form.value}
          rules={formRules.value}
        >
          {isGrid ? <NGrid {...gridProps}>{FormItems}</NGrid> : FormItems}
        </NForm>
      )
    }
  })

  function resetForm() {
    resetFields()
    resetValidation()
  }

  function resetFields() {
    const defaultValue = createDefaultField(flattenedFields)
    setFields(defaultValue)
  }

  function setFields(fields) {
    Object.keys(fields).forEach((key) => {
      form.value[key] = fields[key]
    })
  }

  async function validate(callback, shouldRuleBeApplied) {
    return formRef.value?.validate(callback, shouldRuleBeApplied)
  }

  function resetValidation() {
    formRef.value?.restoreValidation()
  }

  return [Form, { form, formRef, rules: formRules, resetForm, setFields, resetFields, validate, resetValidation }]
}