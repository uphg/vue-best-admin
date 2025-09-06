# XForm 组件库

基于 Naive UI 的表单组件封装，提供统一的表单项接口和自动验证功能。

## 特性

- 🎯 **统一接口**: 所有表单组件都有一致的 API 设计
- 🔧 **自动验证**: 支持自动生成验证规则
- 🎨 **灵活样式**: 支持自定义样式和布局
- 📝 **TypeScript**: 完整的类型支持
- 🚀 **高性能**: 基于 Vue 3 Composition API

## 组件列表

### 基础输入组件

- `XFormInput` - 文本输入框
- `XFormInputNumber` - 数字输入框
- `XFormInputOTP` - OTP 验证码输入框（基于 Naive UI 的 NInputOtp）

### 选择组件

- `XFormSelect` - 下拉选择器
- `XFormCheckbox` - 复选框组
- `XFormRadio` - 单选框组
- `XFormCascader` - 级联选择器
- `XFormTreeSelect` - 树形选择器
- `XFormAutoComplete` - 自动完成

### 日期时间组件

- `XFormDatePicker` - 日期选择器
- `XFormTimePicker` - 时间选择器

### 其他组件

- `XFormSwitch` - 开关
- `XFormSlider` - 滑块
- `XFormRate` - 评分
- `XFormColorPicker` - 颜色选择器
- `XFormDynamicInput` - 动态输入
- `XFormDynamicTags` - 动态标签
- `XFormTransfer` - 穿梭框
- `XFormUpload` - 文件上传
- `XFormMention` - 提及

## 基础用法

```tsx
import { XForm, XFormInput, XFormInputOTP, XFormSelect } from '@/components/ui/x-form'

const Demo = defineComponent(() => {
  const formRef = ref()
  const formData = ref({
    username: '',
    gender: null,
    otpCode: null,
  })

  const genderOptions = [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' },
  ]

  function handleSubmit() {
    formRef.value?.validate((errors) => {
      if (!errors) {
        console.log('表单数据:', formData.value)
      }
    })
  }

  return () => (
    <XForm ref={formRef} model={formData.value} autoRules>
      <XFormInput
        v-model:value={formData.value.username}
        label="用户名"
        path="username"
        placeholder="请输入用户名"
      />

      <XFormSelect
        v-model:value={formData.value.gender}
        label="性别"
        path="gender"
        options={genderOptions}
        placeholder="请选择性别"
      />

      <XFormInputOTP
        v-model:value={formData.value.otpCode}
        label="验证码"
        path="otpCode"
        length={6}
        placeholder="请输入验证码"
      />

      <NButton type="primary" onClick={handleSubmit}>
        提交
      </NButton>
    </XForm>
  )
})
```

## 自动验证

通过设置 `autoRules` 属性，组件会根据表单项类型自动生成验证规则：

```tsx
<XForm model={formData.value} autoRules>
  <XFormInput
    v-model:value={formData.value.email}
    label="邮箱"
    path="email"
    type="email"
  />
</XForm>
```

## 自定义验证规则

```tsx
const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: ['blur', 'input']
  }
}

<XForm model={formData.value} rules={rules}>
  <XFormInput
    v-model:value={formData.value.username}
    label="用户名"
    path="username"
  />
</XForm>
```

## 默认属性配置

可以通过 `defaultProps` 为所有表单组件设置默认属性：

```tsx
const defaultProps = {
  formItem: {
    labelPlacement: 'left',
    labelWidth: 'auto'
  },
  input: {
    clearable: true
  },
  select: {
    clearable: true,
    filterable: true
  }
}

<XForm model={formData.value} defaultProps={defaultProps}>
  {/* 所有表单项都会应用默认属性 */}
</XForm>
```

## 插槽支持

所有组件都支持前缀和后缀插槽：

```tsx
<XFormInput
  v-model:value={formData.value.username}
  label="用户名"
  path="username"
>
  {{
    itemPrefix: () => <Icon name="user" />,
    itemSuffix: () => <NButton size="small">检查</NButton>
  }}
</XFormInput>
```

## API

### XForm Props

| 属性                 | 类型                        | 默认值  | 说明             |
| -------------------- | --------------------------- | ------- | ---------------- |
| model                | `object`                    | `{}`    | 表单数据对象     |
| rules                | `FormRules`                 | `{}`    | 验证规则         |
| autoRules            | `boolean \| string[]`       | `false` | 自动生成验证规则 |
| defaultProps         | `object`                    | `{}`    | 默认属性配置     |
| formItemContentClass | `string \| object \| array` | `''`    | 表单项内容样式类 |

### XForm Methods

| 方法名            | 说明         | 参数                                                               |
| ----------------- | ------------ | ------------------------------------------------------------------ |
| validate          | 验证表单     | `(callback?: Function, shouldRuleBeApplied?: Function) => Promise` |
| restoreValidation | 恢复验证状态 | `() => void`                                                       |
| reset             | 重置表单     | `() => void`                                                       |

### 通用 Props

所有表单组件都支持以下通用属性：

| 属性         | 类型                        | 默认值 | 说明           |
| ------------ | --------------------------- | ------ | -------------- |
| label        | `string`                    | -      | 表单项标签     |
| path         | `string`                    | -      | 表单项路径     |
| value        | `any`                       | -      | 表单项值       |
| contentClass | `string \| object \| array` | -      | 内容容器样式类 |

### 通用 Events

| 事件名       | 说明       | 参数                   |
| ------------ | ---------- | ---------------------- |
| update:value | 值更新事件 | `(value: any) => void` |

### 通用 Slots

| 插槽名     | 说明           |
| ---------- | -------------- |
| itemPrefix | 表单项前缀内容 |
| itemSuffix | 表单项后缀内容 |

## 类型定义

```typescript
// 表单组件类型
export type CamelInputElement = 'input'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'input-number'
  | 'slider'
  | 'rate'
  | 'date-picker'
  | 'time-picker'
  | 'color-picker'
  | 'auto-complete'
  | 'cascader'
  | 'tree-select'
  | 'dynamic-input'
  | 'dynamic-tags'
  | 'transfer'
  | 'upload'
  | 'mention'
  | 'input-otp'

// 基础表单项接口
export interface XFormItemProps extends NFormItemProps {
  label?: string
  path?: string
  autoPlaceholder?: boolean
  placeholderPrefix?: string
}

// XFormInputOTP 特有属性
export interface XFormInputOTPProps {
  value?: string[] | null
  length?: number // 验证码位数，默认 6
  block?: boolean // 是否块级显示
  mask?: boolean // 是否隐藏输入内容
  gap?: string | number // 输入框间距
  allowInput?: (char: string, index: number, currentValue: string[]) => boolean
  onFinish?: (value: string[]) => void // 输入完成回调
}
```

## 注意事项

1. 所有组件都需要在 `XForm` 组件内使用
2. 使用 `v-model:value` 进行双向绑定
3. 设置 `path` 属性以启用验证功能
4. 上传组件使用 `v-model:fileList` 进行绑定
5. `XFormInputOTP` 组件的 `value` 类型为 `string[] | null`，表示每个输入框的值数组

## 更多示例

查看 `src/pages/form/x-form-demo-page.tsx` 获取完整的使用示例。
