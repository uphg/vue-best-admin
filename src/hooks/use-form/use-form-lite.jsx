import { useForm } from './use-form'

export function useFormLite(liteFields, options = {}) {
  const fields = convertLiteFieldsToFields(liteFields)
  return useForm(fields, options)
}

function convertLiteFieldsToFields(liteFields) {
  const fields = []
  for (const liteField of liteFields) {
    if (isLiteFieldGroup(liteField)) {
      const [label, key, options] = liteField
      const { children } = options ?? {}
      if (!children) continue
      const convertedChildren = convertLiteFieldsToFields(children)
      fields.push({
        label,
        key,
        children: convertedChildren,
        ...(options || {}),
      })
    } else {
      const [label, key, props] = liteField
      fields.push({
        label,
        key,
        ...(props || {}),
      })
    }
  }
  return fields
}

function isLiteFieldGroup(liteField) {
  return liteField[1] === null
}