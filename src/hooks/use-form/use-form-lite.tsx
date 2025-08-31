import type { FormProps } from 'naive-ui'
import type { FieldProps, LiteFieldDefinition, LiteFieldGroupProps, LiteFieldProps } from './types'
import { useForm } from './use-form'

export function useFormLite(liteFields: LiteFieldProps[], options: FormProps = {}) {
  const fields = convertLiteFieldsToFields(liteFields)
  return useForm(fields, options)
}

function convertLiteFieldsToFields(liteFields: LiteFieldDefinition[]): FieldProps[] {
  const fields: FieldProps[] = []

  for (const liteField of liteFields) {
    if (isLiteFieldGroup(liteField)) {
      const [label, children, options] = liteField
      const convertedChildren = convertLiteFieldsToFields(children)
      fields.push({
        label,
        key: '',
        children: convertedChildren,
        ...(options as object || {}),
      })
    } else {
      const [label, key, props] = liteField
      fields.push({
        label,
        key,
        ...(props as object || {}),
      })
    }
  }

  return fields
}

function isLiteFieldGroup(field: LiteFieldDefinition): field is LiteFieldGroupProps {
  return Array.isArray(field) && field.length >= 2 && Array.isArray(field[1])
}
