import type { AutoCompleteProps, CascaderProps, CheckboxGroupProps, ColorPickerProps, DatePickerProps, DynamicInputProps, DynamicTagsProps, FormItemProps, InputNumberProps, InputProps, MentionProps, RadioGroupProps, RateProps, SelectProps, SliderProps, SwitchProps, TimePickerProps, TransferProps, TreeSelectProps, UploadProps } from 'naive-ui'
import type { InputOtpProps } from 'naive-ui/es/input-otp'

// 组件类型枚举
export type XFormComponentType = 'input'
  | 'select'
  | 'autoComplete'
  | 'cascader'
  | 'checkboxGroup'
  | 'colorPicker'
  | 'date'
  | 'datePicker'
  | 'dynamicInput'
  | 'dynamicTags'
  | 'inputNumber'
  | 'inputOtp'
  | 'radioGroup'
  | 'rate'
  | 'slider'
  | 'switch'
  | 'time'
  | 'timePicker'
  | 'transfer'
  | 'treeSelect'
  | 'upload'
  | 'mention'

// 定义更明确的类型
export interface XFormContext {
  rules: Ref<Record<string, any>>
  formItemContentClass: Ref<any>
  autoRules: Ref<boolean | string[]>
  defaultProps: Ref<FormDefaultProps>
}

// 提供默认值类型
export interface FormDefaultProps {
  formItem?: Partial<FormItemProps>
  input?: Partial<InputProps>
  select?: Partial<SelectProps>
  autoComplete?: Partial<AutoCompleteProps>
  cascader?: Partial<CascaderProps>
  checkboxGroup?: Partial<CheckboxGroupProps>
  colorPicker?: Partial<ColorPickerProps>
  date?: Partial<DatePickerProps>
  datePicker?: Partial<DatePickerProps>
  dynamicInput?: Partial<DynamicInputProps>
  dynamicTags?: Partial<DynamicTagsProps>
  inputNumber?: Partial<InputNumberProps>
  inputOtp?: Partial<InputOtpProps>
  radioGroup?: Partial<RadioGroupProps>
  rate?: Partial<RateProps>
  slider?: Partial<SliderProps>
  switch?: Partial<SwitchProps>
  time?: Partial<TimePickerProps>
  timePicker?: Partial<TimePickerProps>
  transfer?: Partial<TransferProps>
  treeSelect?: Partial<TreeSelectProps>
  upload?: Partial<UploadProps>
  mention?: Partial<MentionProps>
}

// 工具函数类型
export interface PlaceholderConfig {
  input: string
  select: string
}
