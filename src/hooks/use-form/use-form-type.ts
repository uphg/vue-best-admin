import type { AutoCompleteProps, CascaderProps, CheckboxGroupProps, ColorPickerProps, DatePickerProps, DynamicInputProps, DynamicTagsProps, InputNumberProps, InputProps, RadioGroupProps, RateProps, SelectOption, SelectProps, SliderProps, SwitchProps, TimePickerProps, TransferProps, TreeSelectProps, UploadProps } from 'naive-ui'

interface FieldPropsMap {
  'auto-complete': Partial<AutoCompleteProps> & { as?: 'auto-complete' }
  'cascader': Partial<CascaderProps> & { as?: 'cascader' }
  'color-picker': Partial<ColorPickerProps> & { as?: 'color-picker' }
  'checkbox': Partial<CheckboxGroupProps> & { as?: 'checkbox', options?: SelectOption[] }
  'checkbox-button': Partial<CheckboxGroupProps> & { as?: 'checkbox-button', options?: SelectOption[] }
  'checkbox-group': Partial<CheckboxGroupProps> & { as?: 'checkbox-group', options?: SelectOption[] }
  'checkbox-button-group': Partial<CheckboxGroupProps> & { as?: 'checkbox-button-group', options?: any[] }
  'date': Partial<DatePickerProps> & { as?: 'date' }
  'date-picker': Partial<DatePickerProps> & { as?: 'date-picker' }
  'dynamic-input': Partial<DynamicInputProps> & { as?: 'dynamic-input' }
  'dynamic-tags': Partial<DynamicTagsProps> & { as?: 'dynamic-tags' }
  'input': Partial<InputProps> & { as?: 'input' }
  'input-number': Partial<InputNumberProps> & { as?: 'input-number' }
  'radio': Partial<RadioGroupProps> & { as?: 'radio', options?: SelectOption[] }
  'radio-group': Partial<RadioGroupProps> & { as?: 'radio-group', options?: SelectOption[] }
  'radio-button': Partial<RadioGroupProps> & { as?: 'radio-button', options?: SelectOption[] }
  'radio-button-group': Partial<RadioGroupProps> & { as?: 'radio-button-group', options?: SelectOption[] }
  'switch': Partial<SwitchProps> & { as?: 'switch' }
  'rate': Partial<RateProps> & { as?: 'rate' }
  'select': Partial<SelectProps> & { as?: 'select' }
  'slider': Partial<SliderProps> & { as?: 'slider' }
  'time': Partial<TimePickerProps> & { as?: 'time' }
  'time-picker': Partial<TimePickerProps> & { as?: 'time-picker' }
  'transfer': Partial<TransferProps> & { as?: 'transfer' }
  'tree-select': Partial<TreeSelectProps> & { as?: 'tree-select' }
  'upload': Partial<UploadProps> & { as?: 'upload' }
}
