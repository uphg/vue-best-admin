export const boolUndef = {
  type: Boolean,
  default: void 0,
}

export const nFormProps = {
  inline: boolUndef,
  labelWidth: [String, Number],
  labelAlign: String,
  labelPlacement: String,
  model: Object,
  rules: Object,
  disabled: boolUndef,
  size: String,
  showRequireMark: boolUndef,
  requireMarkPlacement: String,
  showFeedback: boolUndef,
  onSubmit: Function,
  showLabel: boolUndef,
  validateMessages: Object,
}

export const nFormPropNames = Object.keys(nFormProps).filter(key => key !== 'rules')

export const nFormItemProps = {
  label: String,
  path: String,
  rulePath: String,
  required: boolUndef,
  size: String,
  labelProps: {
    type: Object,
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
}

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
  requireMarkPlacement: 'right',
  size: 'medium',
  validationStatus: undefined,
  offset: 0,
  span: 1,
  suffix: false,
}

// === Input ===
export const nInputProps = {
  bordered: boolUndef,
  type: String,
  placeholder: [String, Array],
  defaultValue: [String, Array],
  value: [String, Array],
  disabled: boolUndef,
  size: String,
  rows: [Number, String],
  round: boolUndef,
  minlength: [Number, String],
  maxlength: [Number, String],
  clearable: boolUndef,
  autosize: {
    type: [Boolean, Object],
    default: undefined,
  },
  pair: boolUndef,
  separator: String,
  readonly: boolUndef,
  passivelyActivated: boolUndef,
  showPasswordOn: String,
  stateful: boolUndef,
  autofocus: boolUndef,
  inputProps: Object,
  resizable: boolUndef,
  showCount: boolUndef,
  loading: boolUndef,
  allowInput: Function,
  renderCount: Function,
  onMousedown: Function,
  onKeydown: Function,
  onKeyup: Function,
  onInput: Function,
  onFocus: [Function, Array],
  onBlur: [Function, Array],
  onClick: [Function, Array],
  onChange: Function,
  onClear: [Function, Array],
  countGraphemes: Function,
  status: String,
  onUpdateValue: [Function, Array],
  /** private */
  textDecoration: [String, Array],
  attrSize: Number,
  onInputBlur: [Function, Array],
  onInputFocus: [Function, Array],
  onDeactivate: [Function, Array],
  onActivate: [Function, Array],
  onWrapperFocus: [Function, Array],
  onWrapperBlur: [Function, Array],
  internalDeactivateOnEnter: boolUndef,
  internalForceFocus: boolUndef,
  internalLoadingBeforeSuffix: boolUndef,
  /** deprecated */
  showPasswordToggle: boolUndef,
  themeOverrides: Object,
}

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
  size: 'medium',
  status: undefined,
  type: 'text',
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
  size: String,
  options: Array,
  labelField: String,
  valueField: String,
  childrenField: String,
  renderLabel: Function,
  renderOption: Function,
  renderTag: Function,
  clearable: boolUndef,
  disabled: boolUndef,
  filterable: boolUndef,
  placeholder: String,
  defaultValue: [String, Number, Array],
  value: [String, Number, Array],
  loading: boolUndef,
  filter: Function,
  placement: String,
  widthMode: String,
  tag: boolUndef,
  remote: boolUndef,
  consistentMenuWidth: boolUndef,
  virtualScroll: boolUndef,
  onUpdateValue: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array],
  onClear: [Function, Array],
  onSearch: [Function, Array],
  onScroll: [Function, Array],
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
  value: Array,
  defaultValue: Array,
  size: String,
  min: Number,
  max: Number,
  onUpdateValue: [Function, Array],
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
  value: String,
  defaultValue: String,
  options: Array,
  size: String,
  disabled: boolUndef,
  clearable: boolUndef,
  placeholder: String,
  getShow: Function,
  renderLabel: Function,
  renderOption: Function,
  loading: boolUndef,
  onUpdateValue: [Function, Array],
  onSelect: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array],
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
  size: String,
  options: Array,
  labelField: String,
  valueField: String,
  childrenField: String,
  disabledField: String,
  clearable: boolUndef,
  disabled: boolUndef,
  filterable: boolUndef,
  placeholder: String,
  defaultValue: [String, Number, Array],
  value: [String, Number, Array],
  showPath: boolUndef,
  separator: String,
  cascadeCheckbox: boolUndef,
  checkStrategy: String,
  renderLabel: Function,
  filter: Function,
  placement: String,
  onUpdateValue: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array],
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
  value: String,
  defaultValue: String,
  modes: Array,
  size: String,
  disabled: boolUndef,
  showAlpha: boolUndef,
  showPreview: boolUndef,
  swatches: Array,
  actions: Array,
  onUpdateValue: [Function, Array],
  onComplete: [Function, Array],
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
  type: String,
  value: [Number, Array],
  defaultValue: [Number, Array],
  placeholder: [String, Array],
  size: String,
  disabled: boolUndef,
  clearable: boolUndef,
  format: String,
  valueFormat: String,
  to: [String, Object],
  shortcuts: Object,
  onUpdateValue: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array],
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
  to: undefined,
  shortcuts: undefined,
}

export const nDatePickerPropNames = Object.keys(nDatePickerProps).filter(key => key !== 'value' && key !== 'placeholder')

// === DynamicInput ===
export const nDynamicInputProps = {
  value: Array,
  defaultValue: Array,
  preset: String,
  keyField: String,
  itemStyle: [String, Object],
  createButtonProps: Object,
  onUpdateValue: [Function, Array],
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
  value: Array,
  defaultValue: Array,
  size: String,
  disabled: boolUndef,
  renderTag: Function,
  tagStyle: [String, Object],
  inputStyle: [String, Object],
  inputProps: Object,
  max: Number,
  onUpdateValue: [Function, Array],
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
  value: Number,
  defaultValue: Number,
  placeholder: String,
  size: String,
  disabled: boolUndef,
  readonly: boolUndef,
  clearable: boolUndef,
  keyboard: Object,
  min: Number,
  max: Number,
  step: Number,
  precision: Number,
  showButton: boolUndef,
  buttonPlacement: String,
  format: Function,
  parse: Function,
  validator: Function,
  onUpdateValue: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array],
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
  value: [String, Number, Boolean],
  defaultValue: [String, Number, Boolean],
  name: String,
  size: String,
  disabled: boolUndef,
  onUpdateValue: [Function, Array],
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
  value: Number,
  defaultValue: Number,
  count: Number,
  size: [String, Number],
  allowHalf: boolUndef,
  disabled: boolUndef,
  readonly: boolUndef,
  clearable: boolUndef,
  color: String,
  onUpdateValue: [Function, Array],
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
  value: [Number, Array],
  defaultValue: [Number, Array],
  min: Number,
  max: Number,
  step: [Number, String],
  range: boolUndef,
  disabled: boolUndef,
  marks: Object,
  tooltip: boolUndef,
  formatTooltip: Function,
  showTooltip: boolUndef,
  vertical: boolUndef,
  reverse: boolUndef,
  onUpdateValue: [Function, Array],
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
  value: boolUndef,
  defaultValue: boolUndef,
  size: String,
  disabled: boolUndef,
  loading: boolUndef,
  checkedValue: {
    type: [String, Number, Boolean],
    default: void 0,
  },
  uncheckedValue: {
    type: [String, Number, Boolean],
    default: void 0,
  },
  railStyle: Function,
  onUpdateValue: [Function, Array],
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
  value: [Number, String],
  defaultValue: [Number, String],
  placeholder: String,
  size: String,
  disabled: boolUndef,
  clearable: boolUndef,
  format: String,
  valueFormat: String,
  use12Hours: boolUndef,
  actions: Array,
  onUpdateValue: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array],
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
  actions: null,
}

export const nTimePickerPropNames = Object.keys(nTimePickerProps).filter(key => key !== 'value' && key !== 'placeholder')

// === Transfer ===
export const nTransferProps = {
  value: Array,
  defaultValue: Array,
  options: Array,
  disabled: boolUndef,
  virtualScroll: boolUndef,
  sourceTitle: String,
  targetTitle: String,
  filterable: boolUndef,
  sourceFilterPlaceholder: String,
  targetFilterPlaceholder: String,
  filter: Function,
  size: String,
  renderSourceLabel: Function,
  renderTargetLabel: Function,
  renderSourceList: Function,
  renderTargetList: Function,
  onUpdateValue: [Function, Array],
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
  value: [String, Number, Array],
  defaultValue: [String, Number, Array],
  options: Array,
  placeholder: String,
  size: String,
  disabled: boolUndef,
  clearable: boolUndef,
  filterable: boolUndef,
  checkStrategy: String,
  labelField: String,
  keyField: String,
  childrenField: String,
  disabledField: String,
  virtualScroll: boolUndef,
  maxTagCount: [Number, String],
  ellipsisTagPopoverProps: Object,
  onUpdateValue: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array],
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
  accept: String,
  action: String,
  directory: boolUndef,
  directoryDnd: boolUndef,
  method: String,
  multiple: boolUndef,
  name: String,
  data: [Object, Function],
  headers: [Object, Function],
  withCredentials: boolUndef,
  responseType: String,
  disabled: boolUndef,
  max: Number,
  fileList: Array,
  defaultFileList: Array,
  listType: String,
  showDownloadButton: boolUndef,
  showRemoveButton: boolUndef,
  showRetryButton: boolUndef,
  showPreviewButton: boolUndef,
  showCancelButton: boolUndef,
  showFileList: boolUndef,
  createThumbnailUrl: Function,
  onUpdateFileList: [Function, Array],
  onBeforeUpload: Function,
  onRemove: Function,
  onFinish: Function,
  onError: Function,
  onPreview: Function,
  onDownload: Function,
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
  value: String,
  defaultValue: String,
  options: Array,
  prefix: [String, Array],
  placeholder: String,
  size: String,
  disabled: boolUndef,
  type: String,
  separator: String,
  bordered: boolUndef,
  autosize: [Boolean, Object],
  renderLabel: Function,
  filter: Function,
  onUpdateValue: [Function, Array],
  onSelect: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array],
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
  value: Array,
  defaultValue: Array,
  length: Number,
  block: boolUndef,
  size: String,
  disabled: boolUndef,
  mask: boolUndef,
  readonly: boolUndef,
  status: String,
  gap: [String, Number],
  placeholder: String,
  allowInput: Function,
  onBlur: [Function, Array],
  onFocus: [Function, Array],
  onUpdateValue: [Function, Array],
  onFinish: [Function, Array],
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