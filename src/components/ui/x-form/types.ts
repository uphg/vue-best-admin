import type { FormProps as NFormProps, FormItemProps as NFormItemProps } from 'naive-ui'
import type { VNodeChild } from 'vue'

// XForm 的 props 接口
export interface XFormProps extends Omit<NFormProps, 'model'> {
  /** 表单数据模型 */
  model?: Record<string, any>
  /** 默认属性配置，用于设置表单组件的默认值 */
  defaultProps?: Record<string, any>
}

// XFormItem 的基础 props 接口
export interface XFormItemProps extends NFormItemProps {
  /** 表单项标签 */
  label?: string
  /** 表单项路径 */
  path?: string
  /** 是否自动生成 placeholder */
  autoPlaceholder?: boolean
  /** 自定义 placeholder 前缀，默认为 "请输入" 或 "请选择" */
  placeholderPrefix?: string
}

// 输入类型组件的基础接口
export interface XFormInputBaseProps extends XFormItemProps {
  /** 输入框的值 */
  value?: string | number | null
  /** 值更新事件 */
  'onUpdate:value'?: (value: string | number | null) => void
  /** placeholder 文本 */
  placeholder?: string
}

// 选择类型组件的基础接口
export interface XFormSelectBaseProps extends XFormItemProps {
  /** 选择器的值 */
  value?: any
  /** 值更新事件 */
  'onUpdate:value'?: (value: any) => void
  /** 选项数据 */
  options?: Array<{ label: string; value: any; [key: string]: any }>
  /** placeholder 文本 */
  placeholder?: string
  /** 是否多选 */
  multiple?: boolean
}

// 复选框组件的基础接口
export interface XFormCheckboxBaseProps extends XFormItemProps {
  /** 复选框的值 */
  value?: any[]
  /** 值更新事件 */
  'onUpdate:value'?: (value: any[]) => void
  /** 选项数据 */
  options?: Array<{ label: string; value: any; [key: string]: any }>
}

// 单选框组件的基础接口
export interface XFormRadioBaseProps extends XFormItemProps {
  /** 单选框的值 */
  value?: any
  /** 值更新事件 */
  'onUpdate:value'?: (value: any) => void
  /** 选项数据 */
  options?: Array<{ label: string; value: any; [key: string]: any }>
}

// 开关组件的基础接口
export interface XFormSwitchBaseProps extends XFormItemProps {
  /** 开关的值 */
  value?: boolean
  /** 值更新事件 */
  'onUpdate:value'?: (value: boolean) => void
}

// 日期选择器组件的基础接口
export interface XFormDatePickerBaseProps extends XFormItemProps {
  /** 日期的值 */
  value?: number | string | null
  /** 值更新事件 */
  'onUpdate:value'?: (value: number | string | null) => void
  /** placeholder 文本 */
  placeholder?: string
  /** 日期类型 */
  type?: 'date' | 'datetime' | 'daterange' | 'datetimerange' | 'month' | 'year'
}

// 时间选择器组件的基础接口
export interface XFormTimePickerBaseProps extends XFormItemProps {
  /** 时间的值 */
  value?: string | null
  /** 值更新事件 */
  'onUpdate:value'?: (value: string | null) => void
  /** placeholder 文本 */
  placeholder?: string
}

// 数字输入框组件的基础接口
export interface XFormInputNumberBaseProps extends XFormItemProps {
  /** 数字的值 */
  value?: number | null
  /** 值更新事件 */
  'onUpdate:value'?: (value: number | null) => void
  /** placeholder 文本 */
  placeholder?: string
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 步长 */
  step?: number
}

// 滑块组件的基础接口
export interface XFormSliderBaseProps extends XFormItemProps {
  /** 滑块的值 */
  value?: number | number[]
  /** 值更新事件 */
  'onUpdate:value'?: (value: number | number[]) => void
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 步长 */
  step?: number
  /** 是否为范围滑块 */
  range?: boolean
}

// 评分组件的基础接口
export interface XFormRateBaseProps extends XFormItemProps {
  /** 评分的值 */
  value?: number
  /** 值更新事件 */
  'onUpdate:value'?: (value: number) => void
  /** 总分数 */
  count?: number
  /** 是否允许半星 */
  allowHalf?: boolean
}

// 上传组件的基础接口
export interface XFormUploadBaseProps extends XFormItemProps {
  /** 文件列表 */
  fileList?: any[]
  /** 文件列表更新事件 */
  'onUpdate:fileList'?: (fileList: any[]) => void
  /** 上传地址 */
  action?: string
  /** 是否支持多选 */
  multiple?: boolean
  /** 接受的文件类型 */
  accept?: string
}

// 自动完成组件的基础接口
export interface XFormAutoCompleteBaseProps extends XFormItemProps {
  /** 输入框的值 */
  value?: string
  /** 值更新事件 */
  'onUpdate:value'?: (value: string) => void
  /** placeholder 文本 */
  placeholder?: string
  /** 选项数据 */
  options?: Array<{ label: string; value: string; [key: string]: any }>
}

// 级联选择器组件的基础接口
export interface XFormCascaderBaseProps extends XFormItemProps {
  /** 级联选择器的值 */
  value?: any[]
  /** 值更新事件 */
  'onUpdate:value'?: (value: any[]) => void
  /** 选项数据 */
  options?: any[]
  /** placeholder 文本 */
  placeholder?: string
  /** 是否多选 */
  multiple?: boolean
}

// 树选择器组件的基础接口
export interface XFormTreeSelectBaseProps extends XFormItemProps {
  /** 树选择器的值 */
  value?: any
  /** 值更新事件 */
  'onUpdate:value'?: (value: any) => void
  /** 选项数据 */
  options?: any[]
  /** placeholder 文本 */
  placeholder?: string
  /** 是否多选 */
  multiple?: boolean
}

// 颜色选择器组件的基础接口
export interface XFormColorPickerBaseProps extends XFormItemProps {
  /** 颜色的值 */
  value?: string | null
  /** 值更新事件 */
  'onUpdate:value'?: (value: string | null) => void
}

// 动态输入框组件的基础接口
export interface XFormDynamicInputBaseProps extends XFormItemProps {
  /** 动态输入框的值 */
  value?: string[]
  /** 值更新事件 */
  'onUpdate:value'?: (value: string[]) => void
  /** 最小数量 */
  min?: number
  /** 最大数量 */
  max?: number
  /** placeholder 文本 */
  placeholder?: string
}

// 动态标签组件的基础接口
export interface XFormDynamicTagsBaseProps extends XFormItemProps {
  /** 动态标签的值 */
  value?: string[]
  /** 值更新事件 */
  'onUpdate:value'?: (value: string[]) => void
}

// 穿梭框组件的基础接口
export interface XFormTransferBaseProps extends XFormItemProps {
  /** 穿梭框的值 */
  value?: any[]
  /** 值更新事件 */
  'onUpdate:value'?: (value: any[]) => void
  /** 选项数据 */
  options?: any[]
}

// 文本域组件的基础接口
export interface XFormTextareaBaseProps extends XFormItemProps {
  /** 文本域的值 */
  value?: string
  /** 值更新事件 */
  'onUpdate:value'?: (value: string) => void
  /** placeholder 文本 */
  placeholder?: string
  /** 行数 */
  rows?: number
  /** 是否自动调整高度 */
  autosize?: boolean | { minRows?: number; maxRows?: number }
}

// 组件类型枚举
export type XFormComponentType = 
  | 'input'
  | 'textarea'
  | 'input-number'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'date-picker'
  | 'time-picker'
  | 'slider'
  | 'rate'
  | 'upload'
  | 'auto-complete'
  | 'cascader'
  | 'tree-select'
  | 'color-picker'
  | 'dynamic-input'
  | 'dynamic-tags'
  | 'transfer'
  | 'input-otp'
  | 'mention'

// OTP输入框组件的基础接口
export interface XFormInputOTPBaseProps extends XFormItemProps {
  /** OTP的值 */
  value?: string
  /** 值更新事件 */
  'onUpdate:value'?: (value: string) => void
  /** 长度 */
  length?: number
  /** 是否禁用 */
  disabled?: boolean
}

// 提及组件的基础接口
export interface XFormMentionBaseProps extends XFormItemProps {
  /** 提及的值 */
  value?: string
  /** 值更新事件 */
  'onUpdate:value'?: (value: string) => void
  /** placeholder 文本 */
  placeholder?: string
  /** 选项数据 */
  options?: Array<{ label: string; value: string; [key: string]: any }>
  /** 触发字符 */
  prefix?: string | string[]
  /** 是否禁用 */
  disabled?: boolean
}

// 工具函数类型
export interface PlaceholderConfig {
  input: string
  select: string
}