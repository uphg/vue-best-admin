import type { AutoCompleteProps, CascaderProps, CheckboxGroupProps, ColorPickerProps, DatePickerProps, DynamicInputProps, DynamicTagsProps, FormProps, InputNumberProps, InputProps, MentionProps, RadioGroupProps, RateProps, SelectProps, SliderProps, SwitchProps, TimePickerProps, TransferProps, TreeSelectProps, UploadProps } from 'naive-ui'
import type { InputOtpProps } from 'naive-ui/es/input-otp'
import type { LabelHTMLAttributes, PropType } from 'vue'

export const boolUndef = {
  type: Boolean,
  default: void 0,
}

export const nFormProps = {
  inline: boolUndef,
  labelWidth: [String, Number] as PropType<FormProps['labelWidth']>,
  labelAlign: String as PropType<FormProps['labelAlign']>,
  labelPlacement: String as PropType<FormProps['labelPlacement']>,
  model: Object as PropType<FormProps['model']>,
  rules: Object as PropType<FormProps['rules']>,
  disabled: boolUndef,
  size: String as PropType<FormProps['size']>,
  showRequireMark: boolUndef,
  requireMarkPlacement: String as PropType<FormProps['requireMarkPlacement']>,
  showFeedback: boolUndef,
  onSubmit: Function as PropType<FormProps['onSubmit']>,
  showLabel: boolUndef,
  validateMessages: Object as PropType<FormProps['validateMessages']>,
}

export const nFormPropNames = Object.keys(nFormProps).filter(key => key !== 'rules')

export const nFormItemProps = {
  label: String,
  path: String,
  rulePath: String,
  required: boolUndef,
  size: String as PropType<'small' | 'medium' | 'large'>,
  labelProps: {
    type: Object as PropType<LabelHTMLAttributes>,
    default: void 0,
  },
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object,
  rule: [Object, Array],
  first: boolUndef,
  ignorePathChange: boolUndef,
  showFeedback: boolUndef,
  showLabel: boolUndef,
  showRequireMark: boolUndef,
  requireMarkPlacement: String,
  labelWidth: [String, Number],
  labelAlign: String,
  labelPlacement: String,
  labelStyle: [String, Object],
  feedback: String,
  feedbackClass: String,
  feedbackStyle: [String, Object],
  validationStatus: String,
} as const

export const nFormItemDefaultProps = {
  feedback: undefined,
  feedbackClass: undefined,
  feedbackStyle: undefined,
  first: false,
  ignorePathChange: false,
  label: undefined,
  labelAlign: undefined,
  labelPlacement: undefined,
  labelStyle: undefined,
  labelProps: undefined,
  labelWidth: undefined,
  path: undefined,
  rule: undefined,
  rulePath: undefined,
  showFeedback: true,
  showLabel: true,
  showRequireMark: undefined,
  requireMarkPlacement: 'right' as const,
  size: 'medium' as const,
  validationStatus: undefined,
}

// === Input ===
export const nInputProps = {
  bordered: boolUndef,
  type: String as PropType<InputProps['type']>,
  placeholder: [String, Array] as PropType<InputProps['placeholder']>,
  defaultValue: [String, Array] as PropType<InputProps['defaultValue']>,
  value: [String, Array] as PropType<InputProps['value']>,
  disabled: boolUndef,
  size: String as PropType<InputProps['size']>,
  rows: [Number, String] as PropType<InputProps['rows']>,
  round: boolUndef,
  minlength: [Number, String] as PropType<InputProps['minlength']>,
  maxlength: [Number, String] as PropType<InputProps['maxlength']>,
  clearable: boolUndef,
  autosize: {
    type: [Boolean, Object] as PropType<InputProps['autosize']>,
    default: undefined,
  },
  pair: boolUndef,
  separator: String,
  readonly: boolUndef,
  passivelyActivated: boolUndef,
  showPasswordOn: String as PropType<InputProps['showPasswordOn']>,
  stateful: boolUndef,
  autofocus: boolUndef,
  inputProps: Object as PropType<InputProps['inputProps']>,
  resizable: boolUndef,
  showCount: boolUndef,
  loading: boolUndef,
  allowInput: Function as PropType<InputProps['allowInput']>,
  renderCount: Function as PropType<InputProps['renderCount']>,
  onMousedown: Function as PropType<InputProps['onMousedown']>,
  onKeydown: Function as PropType<InputProps['onKeydown']>,
  onKeyup: Function as PropType<InputProps['onKeyup']>,
  onInput: Function as PropType<InputProps['onInput']>,
  onFocus: [Function, Array] as PropType<InputProps['onFocus']>,
  onBlur: [Function, Array] as PropType<InputProps['onBlur']>,
  onClick: [Function, Array] as PropType<InputProps['onClick']>,
  onChange: Function as PropType<InputProps['onChange']>,
  onClear: [Function, Array] as PropType<InputProps['onClear']>,
  countGraphemes: Function as PropType<InputProps['countGraphemes']>,
  status: String as PropType<InputProps['status']>,
  onUpdateValue: [Function, Array] as PropType<InputProps['onUpdateValue']>,
  /** private */
  textDecoration: [String, Array] as PropType<InputProps['textDecoration']>,
  attrSize: Number as PropType<InputProps['attrSize']>,
  onInputBlur: [Function, Array] as PropType<InputProps['onInputBlur']>,
  onInputFocus: [Function, Array] as PropType<InputProps['onInputFocus']>,
  onDeactivate: [Function, Array] as PropType<InputProps['onDeactivate']>,
  onActivate: [Function, Array] as PropType<InputProps['onActivate']>,
  onWrapperFocus: [Function, Array] as PropType<InputProps['onWrapperFocus']>,
  onWrapperBlur: [Function, Array] as PropType<InputProps['onWrapperBlur']>,
  internalDeactivateOnEnter: boolUndef,
  internalForceFocus: boolUndef,
  internalLoadingBeforeSuffix: boolUndef,
  /** deprecated */
  showPasswordToggle: boolUndef,
  themeOverrides: Object as PropType<InputProps['themeOverrides']>,
} as const

export const nInputDefaultProps = {
  allowInput: undefined,
  autofocus: false,
  autosize: false,
  clearable: false,
  defaultValue: null,
  countGraphemes: undefined,
  disabled: false,
  inputProps: undefined,
  loading: undefined,
  maxlength: undefined,
  minlength: undefined,
  pair: false,
  passivelyActivated: false,
  placeholder: undefined,
  readonly: false,
  renderCount: undefined,
  round: false,
  rows: 3,
  separator: undefined,
  showCount: false,
  showPasswordOn: undefined,
  size: 'medium' as const,
  status: undefined,
  type: 'text' as const,
  value: undefined,
  onBlur: undefined,
  onChange: undefined,
  onClear: undefined,
  onFocus: undefined,
  onInput: undefined,
  onUpdateValue: undefined,
}

export const nFormItemPropNames = Object.keys(nFormItemProps)
export const nInputPropNames = Object.keys(nInputProps).filter(key => !['value', 'placeholder'].includes(key))

// === Select ===
export const nSelectProps = {
  multiple: boolUndef,
  size: String as PropType<SelectProps['size']>,
  options: Array as PropType<SelectProps['options']>,
  labelField: String as PropType<SelectProps['labelField']>,
  valueField: String as PropType<SelectProps['valueField']>,
  childrenField: String as PropType<SelectProps['childrenField']>,
  renderLabel: Function as PropType<SelectProps['renderLabel']>,
  renderOption: Function as PropType<SelectProps['renderOption']>,
  renderTag: Function as PropType<SelectProps['renderTag']>,
  clearable: boolUndef,
  disabled: boolUndef,
  filterable: boolUndef,
  placeholder: String as PropType<SelectProps['placeholder']>,
  defaultValue: [String, Number, Array] as PropType<SelectProps['defaultValue']>,
  value: [String, Number, Array] as PropType<SelectProps['value']>,
  loading: boolUndef,
  filter: Function as PropType<SelectProps['filter']>,
  placement: String as PropType<SelectProps['placement']>,
  widthMode: String as PropType<SelectProps['widthMode']>,
  tag: boolUndef,
  remote: boolUndef,
  consistentMenuWidth: boolUndef,
  virtualScroll: boolUndef,
  onUpdateValue: [Function, Array] as PropType<SelectProps['onUpdateValue']>,
  onFocus: [Function, Array] as PropType<SelectProps['onFocus']>,
  onBlur: [Function, Array] as PropType<SelectProps['onBlur']>,
  onClear: [Function, Array] as PropType<SelectProps['onClear']>,
  onSearch: [Function, Array] as PropType<SelectProps['onSearch']>,
  onScroll: [Function, Array] as PropType<SelectProps['onScroll']>,
}

export const nSelectDefaultProps = {
  multiple: false,
  size: 'medium',
  options: [],
  labelField: 'label',
  valueField: 'value',
  childrenField: 'children',
  clearable: false,
  disabled: false,
  filterable: false,
  placeholder: undefined,
  defaultValue: null,
  value: undefined,
  loading: false,
  placement: 'bottom-start',
  widthMode: 'trigger',
  tag: false,
  remote: false,
  consistentMenuWidth: true,
  virtualScroll: true,
}

export const nSelectPropNames = Object.keys(nSelectProps).filter(key => key !== 'value' && key !== 'placeholder')

// === CheckboxGroup ===
export const nCheckboxGroupProps = {
  disabled: boolUndef,
  value: Array as PropType<CheckboxGroupProps['value']>,
  defaultValue: Array as PropType<CheckboxGroupProps['defaultValue']>,
  size: String as PropType<CheckboxGroupProps['size']>,
  min: Number as PropType<CheckboxGroupProps['min']>,
  max: Number as PropType<CheckboxGroupProps['max']>,
  onUpdateValue: [Function, Array] as PropType<CheckboxGroupProps['onUpdateValue']>,
}

export const nCheckboxGroupDefaultProps = {
  disabled: false,
  value: undefined,
  defaultValue: null,
  size: 'medium',
  min: undefined,
  max: undefined,
}

export const nCheckboxGroupPropNames = Object.keys(nCheckboxGroupProps).filter(key => key !== 'value')

// === AutoComplete ===
export const nAutoCompleteProps = {
  value: String as PropType<AutoCompleteProps['value']>,
  defaultValue: String as PropType<AutoCompleteProps['defaultValue']>,
  options: Array as PropType<AutoCompleteProps['options']>,
  size: String as PropType<AutoCompleteProps['size']>,
  disabled: boolUndef,
  clearable: boolUndef,
  placeholder: String as PropType<AutoCompleteProps['placeholder']>,
  getShow: Function as PropType<AutoCompleteProps['getShow']>,
  renderLabel: Function as PropType<AutoCompleteProps['renderLabel']>,
  renderOption: Function as PropType<AutoCompleteProps['renderOption']>,
  loading: boolUndef,
  onUpdateValue: [Function, Array] as PropType<AutoCompleteProps['onUpdateValue']>,
  onSelect: [Function, Array] as PropType<AutoCompleteProps['onSelect']>,
  onFocus: [Function, Array] as PropType<AutoCompleteProps['onFocus']>,
  onBlur: [Function, Array] as PropType<AutoCompleteProps['onBlur']>,
}

export const nAutoCompleteDefaultProps = {
  value: undefined,
  defaultValue: null,
  options: [],
  size: 'medium',
  disabled: false,
  clearable: false,
  placeholder: undefined,
  loading: false,
}

export const nAutoCompletePropNames = Object.keys(nAutoCompleteProps).filter(key => key !== 'value' && key !== 'placeholder')

// === Cascader ===
export const nCascaderProps = {
  multiple: boolUndef,
  size: String as PropType<CascaderProps['size']>,
  options: Array as PropType<CascaderProps['options']>,
  labelField: String as PropType<CascaderProps['labelField']>,
  valueField: String as PropType<CascaderProps['valueField']>,
  childrenField: String as PropType<CascaderProps['childrenField']>,
  disabledField: String as PropType<CascaderProps['disabledField']>,
  clearable: boolUndef,
  disabled: boolUndef,
  filterable: boolUndef,
  placeholder: String as PropType<CascaderProps['placeholder']>,
  defaultValue: [String, Number, Array] as PropType<CascaderProps['defaultValue']>,
  value: [String, Number, Array] as PropType<CascaderProps['value']>,
  showPath: boolUndef,
  separator: String as PropType<CascaderProps['separator']>,
  cascadeCheckbox: boolUndef,
  checkStrategy: String as PropType<CascaderProps['checkStrategy']>,
  renderLabel: Function as PropType<CascaderProps['renderLabel']>,
  filter: Function as PropType<CascaderProps['filter']>,
  placement: String as PropType<CascaderProps['placement']>,
  onUpdateValue: [Function, Array] as PropType<CascaderProps['onUpdateValue']>,
  onFocus: [Function, Array] as PropType<CascaderProps['onFocus']>,
  onBlur: [Function, Array] as PropType<CascaderProps['onBlur']>,
}

export const nCascaderDefaultProps = {
  multiple: false,
  size: 'medium',
  options: [],
  labelField: 'label',
  valueField: 'value',
  childrenField: 'children',
  disabledField: 'disabled',
  clearable: false,
  disabled: false,
  filterable: false,
  placeholder: undefined,
  defaultValue: null,
  value: undefined,
  showPath: true,
  separator: ' / ',
  cascadeCheckbox: true,
  checkStrategy: 'all',
  placement: 'bottom-start',
}

export const nCascaderPropNames = Object.keys(nCascaderProps).filter(key => key !== 'value' && key !== 'placeholder')

// === ColorPicker ===
export const nColorPickerProps = {
  value: String as PropType<ColorPickerProps['value']>,
  defaultValue: String as PropType<ColorPickerProps['defaultValue']>,
  modes: Array as PropType<ColorPickerProps['modes']>,
  size: String as PropType<ColorPickerProps['size']>,
  disabled: boolUndef,
  showAlpha: boolUndef,
  showPreview: boolUndef,
  swatches: Array as PropType<ColorPickerProps['swatches']>,
  actions: Array as PropType<ColorPickerProps['actions']>,
  onUpdateValue: [Function, Array] as PropType<ColorPickerProps['onUpdateValue']>,
  onComplete: [Function, Array] as PropType<ColorPickerProps['onComplete']>,
}

export const nColorPickerDefaultProps = {
  value: undefined,
  defaultValue: null,
  modes: ['rgb', 'hex', 'hsl'],
  size: 'medium',
  disabled: false,
  showAlpha: true,
  showPreview: false,
  swatches: undefined,
  actions: null,
}

export const nColorPickerPropNames = Object.keys(nColorPickerProps).filter(key => key !== 'value')

// === DatePicker ===
export const nDatePickerProps = {
  type: String as PropType<DatePickerProps['type']>,
  value: [Number, Array] as PropType<DatePickerProps['value']>,
  defaultValue: [Number, Array] as PropType<DatePickerProps['defaultValue']>,
  placeholder: [String, Array] as PropType<DatePickerProps['placeholder']>,
  size: String as PropType<DatePickerProps['size']>,
  disabled: boolUndef,
  clearable: boolUndef,
  format: String as PropType<DatePickerProps['format']>,
  valueFormat: String as PropType<DatePickerProps['valueFormat']>,
  // timeZone: String as PropType<DatePickerProps['timeZone']>, // 该属性在某些版本中可能不存在
  to: [String, Object] as PropType<DatePickerProps['to']>,
  shortcuts: Object as PropType<DatePickerProps['shortcuts']>,
  onUpdateValue: [Function, Array] as PropType<DatePickerProps['onUpdateValue']>,
  onFocus: [Function, Array] as PropType<DatePickerProps['onFocus']>,
  onBlur: [Function, Array] as PropType<DatePickerProps['onBlur']>,
}

export const nDatePickerDefaultProps = {
  type: 'date',
  value: undefined,
  defaultValue: null,
  placeholder: undefined,
  size: 'medium',
  disabled: false,
  clearable: true,
  format: undefined,
  valueFormat: undefined,
  // timeZone: undefined,
  to: undefined,
  shortcuts: undefined,
}

export const nDatePickerPropNames = Object.keys(nDatePickerProps).filter(key => key !== 'value' && key !== 'placeholder')

// === DynamicInput ===
export const nDynamicInputProps = {
  value: Array as PropType<DynamicInputProps['value']>,
  defaultValue: Array as PropType<DynamicInputProps['defaultValue']>,
  preset: String as PropType<DynamicInputProps['preset']>,
  keyField: String as PropType<DynamicInputProps['keyField']>,
  itemStyle: [String, Object] as PropType<DynamicInputProps['itemStyle']>,
  createButtonProps: Object as PropType<DynamicInputProps['createButtonProps']>,
  // onCreateClick: Function as PropType<DynamicInputProps['onCreateClick']>, // 该属性在某些版本中可能不存在
  // onRemoveClick: Function as PropType<DynamicInputProps['onRemoveClick']>, // 该属性在某些版本中可能不存在
  onUpdateValue: [Function, Array] as PropType<DynamicInputProps['onUpdateValue']>,
}

export const nDynamicInputDefaultProps = {
  value: undefined,
  defaultValue: [],
  preset: 'input',
  keyField: undefined,
  itemStyle: undefined,
  createButtonProps: undefined,
}

export const nDynamicInputPropNames = Object.keys(nDynamicInputProps).filter(key => key !== 'value')

// === DynamicTags ===
export const nDynamicTagsProps = {
  value: Array as PropType<DynamicTagsProps['value']>,
  defaultValue: Array as PropType<DynamicTagsProps['defaultValue']>,
  size: String as PropType<DynamicTagsProps['size']>,
  disabled: boolUndef,
  renderTag: Function as PropType<DynamicTagsProps['renderTag']>,
  tagStyle: [String, Object] as PropType<DynamicTagsProps['tagStyle']>,
  inputStyle: [String, Object] as PropType<DynamicTagsProps['inputStyle']>,
  inputProps: Object as PropType<DynamicTagsProps['inputProps']>,
  max: Number as PropType<DynamicTagsProps['max']>,
  onUpdateValue: [Function, Array] as PropType<DynamicTagsProps['onUpdateValue']>,
}

export const nDynamicTagsDefaultProps = {
  value: undefined,
  defaultValue: [],
  size: 'medium',
  disabled: false,
  tagStyle: undefined,
  inputStyle: undefined,
  inputProps: undefined,
  max: undefined,
}

export const nDynamicTagsPropNames = Object.keys(nDynamicTagsProps).filter(key => key !== 'value')

// === InputNumber ===
export const nInputNumberProps = {
  value: Number as PropType<InputNumberProps['value']>,
  defaultValue: Number as PropType<InputNumberProps['defaultValue']>,
  placeholder: String as PropType<InputNumberProps['placeholder']>,
  size: String as PropType<InputNumberProps['size']>,
  disabled: boolUndef,
  readonly: boolUndef,
  clearable: boolUndef,
  keyboard: Object as PropType<InputNumberProps['keyboard']>,
  min: Number as PropType<InputNumberProps['min']>,
  max: Number as PropType<InputNumberProps['max']>,
  step: Number as PropType<InputNumberProps['step']>,
  precision: Number as PropType<InputNumberProps['precision']>,
  showButton: boolUndef,
  buttonPlacement: String as PropType<InputNumberProps['buttonPlacement']>,
  format: Function as PropType<InputNumberProps['format']>,
  parse: Function as PropType<InputNumberProps['parse']>,
  validator: Function as PropType<InputNumberProps['validator']>,
  onUpdateValue: [Function, Array] as PropType<InputNumberProps['onUpdateValue']>,
  onFocus: [Function, Array] as PropType<InputNumberProps['onFocus']>,
  onBlur: [Function, Array] as PropType<InputNumberProps['onBlur']>,
}

export const nInputNumberDefaultProps = {
  value: undefined,
  defaultValue: null,
  placeholder: undefined,
  size: 'medium',
  disabled: false,
  readonly: false,
  clearable: false,
  keyboard: { ArrowUp: true, ArrowDown: true },
  min: undefined,
  max: undefined,
  step: 1,
  precision: undefined,
  showButton: true,
  buttonPlacement: 'right',
}

export const nInputNumberPropNames = Object.keys(nInputNumberProps).filter(key => key !== 'value' && key !== 'placeholder')

// === RadioGroup ===
export const nRadioGroupProps = {
  value: [String, Number, Boolean] as PropType<RadioGroupProps['value']>,
  defaultValue: [String, Number, Boolean] as PropType<RadioGroupProps['defaultValue']>,
  name: String as PropType<RadioGroupProps['name']>,
  size: String as PropType<RadioGroupProps['size']>,
  disabled: boolUndef,
  onUpdateValue: [Function, Array] as PropType<RadioGroupProps['onUpdateValue']>,
}

export const nRadioGroupDefaultProps = {
  value: undefined,
  defaultValue: null,
  name: undefined,
  size: 'medium',
  disabled: false,
}

export const nRadioGroupPropNames = Object.keys(nRadioGroupProps).filter(key => key !== 'value')

// === Rate ===
export const nRateProps = {
  value: Number as PropType<RateProps['value']>,
  defaultValue: Number as PropType<RateProps['defaultValue']>,
  count: Number as PropType<RateProps['count']>,
  size: [String, Number] as PropType<RateProps['size']>,
  allowHalf: boolUndef,
  disabled: boolUndef,
  readonly: boolUndef,
  clearable: boolUndef,
  color: String as PropType<RateProps['color']>,
  onUpdateValue: [Function, Array] as PropType<RateProps['onUpdateValue']>,
}

export const nRateDefaultProps = {
  value: undefined,
  defaultValue: null,
  count: 5,
  size: 'medium',
  allowHalf: false,
  disabled: false,
  readonly: false,
  clearable: false,
  color: undefined,
}

export const nRatePropNames = Object.keys(nRateProps).filter(key => key !== 'value')

// === Slider ===
export const nSliderProps = {
  value: [Number, Array] as PropType<SliderProps['value']>,
  defaultValue: [Number, Array] as PropType<SliderProps['defaultValue']>,
  min: Number as PropType<SliderProps['min']>,
  max: Number as PropType<SliderProps['max']>,
  step: [Number, String] as PropType<SliderProps['step']>,
  range: boolUndef,
  disabled: boolUndef,
  marks: Object as PropType<SliderProps['marks']>,
  tooltip: boolUndef,
  formatTooltip: Function as PropType<SliderProps['formatTooltip']>,
  showTooltip: boolUndef,
  vertical: boolUndef,
  reverse: boolUndef,
  onUpdateValue: [Function, Array] as PropType<SliderProps['onUpdateValue']>,
}

export const nSliderDefaultProps = {
  value: undefined,
  defaultValue: 0,
  min: 0,
  max: 100,
  step: 1,
  range: false,
  disabled: false,
  marks: undefined,
  tooltip: true,
  showTooltip: undefined,
  vertical: false,
  reverse: false,
}

export const nSliderPropNames = Object.keys(nSliderProps).filter(key => key !== 'value')

// === Switch ===
export const nSwitchProps = {
  value: Boolean as PropType<SwitchProps['value']>,
  defaultValue: Boolean as PropType<SwitchProps['defaultValue']>,
  size: String as PropType<SwitchProps['size']>,
  disabled: boolUndef,
  loading: boolUndef,
  checkedValue: [String, Number, Boolean] as PropType<SwitchProps['checkedValue']>,
  uncheckedValue: [String, Number, Boolean] as PropType<SwitchProps['uncheckedValue']>,
  railStyle: Function as PropType<SwitchProps['railStyle']>,
  onUpdateValue: [Function, Array] as PropType<SwitchProps['onUpdateValue']>,
}

export const nSwitchDefaultProps = {
  value: undefined,
  defaultValue: false,
  size: 'medium',
  disabled: false,
  loading: false,
  checkedValue: true,
  uncheckedValue: false,
}

export const nSwitchPropNames = Object.keys(nSwitchProps).filter(key => key !== 'value')

// === TimePicker ===
export const nTimePickerProps = {
  value: [Number, String] as PropType<TimePickerProps['value']>,
  defaultValue: [Number, String] as PropType<TimePickerProps['defaultValue']>,
  placeholder: String as PropType<TimePickerProps['placeholder']>,
  size: String as PropType<TimePickerProps['size']>,
  disabled: boolUndef,
  clearable: boolUndef,
  format: String as PropType<TimePickerProps['format']>,
  valueFormat: String as PropType<TimePickerProps['valueFormat']>,
  use12Hours: boolUndef,
  // hourStep: Number as PropType<TimePickerProps['hourStep']>, // 该属性在某些版本中可能不存在
  // minuteStep: Number as PropType<TimePickerProps['minuteStep']>, // 该属性在某些版本中可能不存在
  // secondStep: Number as PropType<TimePickerProps['secondStep']>, // 该属性在某些版本中可能不存在
  actions: Array as PropType<TimePickerProps['actions']>,
  onUpdateValue: [Function, Array] as PropType<TimePickerProps['onUpdateValue']>,
  onFocus: [Function, Array] as PropType<TimePickerProps['onFocus']>,
  onBlur: [Function, Array] as PropType<TimePickerProps['onBlur']>,
}

export const nTimePickerDefaultProps = {
  value: undefined,
  defaultValue: null,
  placeholder: undefined,
  size: 'medium',
  disabled: false,
  clearable: true,
  format: 'HH:mm:ss',
  valueFormat: undefined,
  use12Hours: false,
  // hourStep: 1,
  // minuteStep: 1,
  // secondStep: 1,
  actions: null,
}

export const nTimePickerPropNames = Object.keys(nTimePickerProps).filter(key => key !== 'value' && key !== 'placeholder')

// === Transfer ===
export const nTransferProps = {
  value: Array as PropType<TransferProps['value']>,
  defaultValue: Array as PropType<TransferProps['defaultValue']>,
  options: Array as PropType<TransferProps['options']>,
  disabled: boolUndef,
  virtualScroll: boolUndef,
  sourceTitle: String as PropType<TransferProps['sourceTitle']>,
  targetTitle: String as PropType<TransferProps['targetTitle']>,
  filterable: boolUndef,
  sourceFilterPlaceholder: String as PropType<TransferProps['sourceFilterPlaceholder']>,
  targetFilterPlaceholder: String as PropType<TransferProps['targetFilterPlaceholder']>,
  filter: Function as PropType<TransferProps['filter']>,
  size: String as PropType<TransferProps['size']>,
  renderSourceLabel: Function as PropType<TransferProps['renderSourceLabel']>,
  renderTargetLabel: Function as PropType<TransferProps['renderTargetLabel']>,
  renderSourceList: Function as PropType<TransferProps['renderSourceList']>,
  renderTargetList: Function as PropType<TransferProps['renderTargetList']>,
  onUpdateValue: [Function, Array] as PropType<TransferProps['onUpdateValue']>,
}

export const nTransferDefaultProps = {
  value: undefined,
  defaultValue: [],
  options: [],
  disabled: false,
  virtualScroll: false,
  sourceTitle: '源项',
  targetTitle: '目标项',
  filterable: false,
  sourceFilterPlaceholder: '请输入搜索内容',
  targetFilterPlaceholder: '请输入搜索内容',
  size: 'medium',
}

export const nTransferPropNames = Object.keys(nTransferProps).filter(key => key !== 'value')

// === TreeSelect ===
export const nTreeSelectProps = {
  multiple: boolUndef,
  cascade: boolUndef,
  checkable: boolUndef,
  value: [String, Number, Array] as PropType<TreeSelectProps['value']>,
  defaultValue: [String, Number, Array] as PropType<TreeSelectProps['defaultValue']>,
  options: Array as PropType<TreeSelectProps['options']>,
  placeholder: String as PropType<TreeSelectProps['placeholder']>,
  size: String as PropType<TreeSelectProps['size']>,
  disabled: boolUndef,
  clearable: boolUndef,
  filterable: boolUndef,
  checkStrategy: String as PropType<TreeSelectProps['checkStrategy']>,
  labelField: String as PropType<TreeSelectProps['labelField']>,
  keyField: String as PropType<TreeSelectProps['keyField']>,
  childrenField: String as PropType<TreeSelectProps['childrenField']>,
  disabledField: String as PropType<TreeSelectProps['disabledField']>,
  virtualScroll: boolUndef,
  maxTagCount: [Number, String] as PropType<TreeSelectProps['maxTagCount']>,
  ellipsisTagPopoverProps: Object as PropType<TreeSelectProps['ellipsisTagPopoverProps']>,
  onUpdateValue: [Function, Array] as PropType<TreeSelectProps['onUpdateValue']>,
  onFocus: [Function, Array] as PropType<TreeSelectProps['onFocus']>,
  onBlur: [Function, Array] as PropType<TreeSelectProps['onBlur']>,
}

export const nTreeSelectDefaultProps = {
  multiple: false,
  cascade: false,
  checkable: false,
  value: undefined,
  defaultValue: null,
  options: [],
  placeholder: undefined,
  size: 'medium',
  disabled: false,
  clearable: false,
  filterable: false,
  checkStrategy: 'all',
  labelField: 'label',
  keyField: 'key',
  childrenField: 'children',
  disabledField: 'disabled',
  virtualScroll: true,
  maxTagCount: 'responsive',
}

export const nTreeSelectPropNames = Object.keys(nTreeSelectProps).filter(key => key !== 'value' && key !== 'placeholder')

// === Upload ===
export const nUploadProps = {
  accept: String as PropType<UploadProps['accept']>,
  action: String as PropType<UploadProps['action']>,
  directory: boolUndef,
  directoryDnd: boolUndef,
  method: String as PropType<UploadProps['method']>,
  multiple: boolUndef,
  name: String as PropType<UploadProps['name']>,
  data: [Object, Function] as PropType<UploadProps['data']>,
  headers: [Object, Function] as PropType<UploadProps['headers']>,
  withCredentials: boolUndef,
  responseType: String as PropType<UploadProps['responseType']>,
  disabled: boolUndef,
  max: Number as PropType<UploadProps['max']>,
  fileList: Array as PropType<UploadProps['fileList']>,
  defaultFileList: Array as PropType<UploadProps['defaultFileList']>,
  listType: String as PropType<UploadProps['listType']>,
  showDownloadButton: boolUndef,
  showRemoveButton: boolUndef,
  showRetryButton: boolUndef,
  showPreviewButton: boolUndef,
  showCancelButton: boolUndef,
  showFileList: boolUndef,
  createThumbnailUrl: Function as PropType<UploadProps['createThumbnailUrl']>,
  onUpdateFileList: [Function, Array] as PropType<UploadProps['onUpdateFileList']>,
  onBeforeUpload: Function as PropType<UploadProps['onBeforeUpload']>,
  onRemove: Function as PropType<UploadProps['onRemove']>,
  onFinish: Function as PropType<UploadProps['onFinish']>,
  onError: Function as PropType<UploadProps['onError']>,
  onPreview: Function as PropType<UploadProps['onPreview']>,
  onDownload: Function as PropType<UploadProps['onDownload']>,
}

export const nUploadDefaultProps = {
  accept: undefined,
  action: undefined,
  directory: false,
  directoryDnd: false,
  method: 'POST',
  multiple: false,
  name: 'file',
  data: undefined,
  headers: undefined,
  withCredentials: false,
  responseType: '',
  disabled: false,
  max: undefined,
  fileList: undefined,
  defaultFileList: [],
  listType: 'text',
  showDownloadButton: false,
  showRemoveButton: true,
  showRetryButton: true,
  showPreviewButton: false,
  showCancelButton: true,
  showFileList: true,
}

export const nUploadPropNames = Object.keys(nUploadProps).filter(key => key !== 'fileList')

// === Mention ===
export const nMentionProps = {
  value: String as PropType<MentionProps['value']>,
  defaultValue: String as PropType<MentionProps['defaultValue']>,
  options: Array as PropType<MentionProps['options']>,
  prefix: [String, Array] as PropType<MentionProps['prefix']>,
  placeholder: String as PropType<MentionProps['placeholder']>,
  size: String as PropType<MentionProps['size']>,
  disabled: boolUndef,
  type: String as PropType<MentionProps['type']>,
  separator: String as PropType<MentionProps['separator']>,
  bordered: boolUndef,
  autosize: [Boolean, Object] as PropType<MentionProps['autosize']>,
  renderLabel: Function as PropType<MentionProps['renderLabel']>,
  filter: Function as PropType<MentionProps['filter']>,
  onUpdateValue: [Function, Array] as PropType<MentionProps['onUpdateValue']>,
  onSelect: [Function, Array] as PropType<MentionProps['onSelect']>,
  onFocus: [Function, Array] as PropType<MentionProps['onFocus']>,
  onBlur: [Function, Array] as PropType<MentionProps['onBlur']>,
}

export const nMentionDefaultProps = {
  value: undefined,
  defaultValue: '',
  options: [],
  prefix: '@',
  placeholder: undefined,
  size: 'medium',
  disabled: false,
  type: 'text',
  separator: ' ',
  bordered: true,
  autosize: false,
}

export const nMentionPropNames = Object.keys(nMentionProps).filter(key => key !== 'value' && key !== 'placeholder')

// === InputOTP ===
export const nInputOTPProps = {
  value: Array as PropType<InputOtpProps['value']>,
  defaultValue: Array as PropType<InputOtpProps['defaultValue']>,
  length: Number as PropType<InputOtpProps['length']>,
  block: boolUndef,
  size: String as PropType<InputOtpProps['size']>,
  disabled: boolUndef,
  mask: boolUndef,
  readonly: boolUndef,
  status: String as PropType<InputOtpProps['status']>,
  gap: [String, Number] as PropType<InputOtpProps['gap']>,
  placeholder: String as PropType<InputOtpProps['placeholder']>,
  allowInput: Function as PropType<InputOtpProps['allowInput']>,
  onBlur: [Function, Array] as PropType<InputOtpProps['onBlur']>,
  onFocus: [Function, Array] as PropType<InputOtpProps['onFocus']>,
  onUpdateValue: [Function, Array] as PropType<InputOtpProps['onUpdateValue']>,
  onFinish: [Function, Array] as PropType<InputOtpProps['onFinish']>,
}

export const nInputOTPDefaultProps = {
  value: undefined,
  defaultValue: [],
  length: 6,
  block: false,
  size: 'medium',
  disabled: false,
  mask: false,
  readonly: false,
  status: undefined,
  gap: undefined,
  placeholder: '',
  allowInput: undefined,
}

export const nInputOTPPropNames = Object.keys(nInputOTPProps).filter(key => key !== 'value')
