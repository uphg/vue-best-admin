// Form field types and interfaces for JavaScript version

// Type constants (kept as comments for reference)
// FieldAs = InputElement - available input types
// FieldLabel = string | undefined | null - field label type
// FieldKey = string | null - field key type

export const FieldAs = {
  INPUT: 'input',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  DATE_PICKER: 'date-picker',
  TIME_PICKER: 'time-picker',
  SWITCH: 'switch',
  SLIDER: 'slider',
  RATE: 'rate',
  COLOR_PICKER: 'color-picker',
  UPLOAD: 'upload',
  CASCADER: 'cascader',
  TREE_SELECT: 'tree-select',
  TRANSFER: 'transfer',
  DYNAMIC_INPUT: 'dynamic-input',
  DYNAMIC_TAGS: 'dynamic-tags',
  INPUT_NUMBER: 'input-number',
  AUTO_COMPLETE: 'auto-complete',
}

// Field props structure
export const createFieldProps = (label, key, options = {}) => ({
  label,
  key,
  ...options,
})

// Lite field rest props
export const createLiteFieldRestProps = (options = {}) => ({
  as: undefined,
  children: [],
  ...options,
})

// Lite field group options
export const createLiteFieldGroupOptions = (options = {}) => ({
  grid: undefined,
  ...options,
})

// Form default props
export const createUseFormProps = (options = {}) => ({
  autoRules: false,
  grid: false,
  ...options,
})

// Field props map - maps component types to their props
export const FieldPropsMap = {
  'auto-complete': { as: 'auto-complete' },
  'cascader': { as: 'cascader', options: [] },
  'color-picker': { as: 'color-picker' },
  'checkbox': { as: 'checkbox', options: [] },
  'checkbox-button': { as: 'checkbox-button', options: [] },
  'checkbox-group': { as: 'checkbox-group', options: [] },
  'checkbox-button-group': { as: 'checkbox-button-group', options: [] },
  'date': { as: 'date' },
  'date-picker': { as: 'date-picker' },
  'dynamic-input': { as: 'dynamic-input' },
  'dynamic-tags': { as: 'dynamic-tags' },
  'input': { as: 'input' },
  'input-number': { as: 'input-number' },
  'radio': { as: 'radio', options: [] },
  'radio-group': { as: 'radio-group', options: [] },
  'radio-button': { as: 'radio-button', options: [] },
  'radio-button-group': { as: 'radio-button-group', options: [] },
  'switch': { as: 'switch' },
  'rate': { as: 'rate' },
  'select': { as: 'select', options: [] },
  'slider': { as: 'slider' },
  'time': { as: 'time' },
  'time-picker': { as: 'time-picker' },
  'transfer': { as: 'transfer', options: [] },
  'tree-select': { as: 'tree-select', options: [] },
  'upload': { as: 'upload' },
}

export default {
  FieldAs,
  createFieldProps,
  createLiteFieldRestProps,
  createLiteFieldGroupOptions,
  createUseFormProps,
  FieldPropsMap,
}