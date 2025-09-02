# XForm 组件系统

XForm 是基于 Naive UI 的表单组件封装，提供了更简洁的 API 和更强大的功能。

## 特性

- 🚀 **融合写法**: 将 `NFormItem` 和表单控件合并为一个组件
- 🎯 **自动 placeholder**: 根据 label 自动生成 placeholder
- ⚙️ **默认属性配置**: 支持全局和组件级别的默认属性配置
- 📝 **完整的类型支持**: 提供完整的 TypeScript 类型定义
- 🎨 **保持原有功能**: 完全兼容 Naive UI 的所有功能

## 基础用法

### 传统写法 vs XForm 写法

```vue
<!-- 传统写法 -->
<NForm :model="form">
  <NFormItem label="姓名" path="name">
    <NInput v-model:value="form.name" placeholder="请输入姓名" />
  </NFormItem>
  <NFormItem label="年龄" path="age">
    <NInputNumber v-model:value="form.age" placeholder="请输入年龄" />
  </NFormItem>
</NForm>

<!-- XForm 写法 -->
<XForm :model="form">
  <XFormInput label="姓名" path="name" v-model:value="form.name" />
  <XFormInputNumber label="年龄" path="age" v-model:value="form.age" />
</XForm>
```

## 组件列表

| 组件名 | 对应的 Naive UI 组件 | 说明 |
|--------|---------------------|------|
| `XForm` | `NForm` | 表单容器 |
| `XFormInput` | `NInput` | 输入框 |
| `XFormTextarea` | `NInput` (type="textarea") | 文本域 |
| `XFormInputNumber` | `NInputNumber` | 数字输入框 |
| `XFormSelect` | `NSelect` | 选择器 |
| `XFormCheckbox` | `NCheckboxGroup` + `NCheckbox` | 复选框组 |
| `XFormRadio` | `NRadioGroup` + `NRadio` | 单选框组 |
| `XFormSwitch` | `NSwitch` | 开关 |
| `XFormDatePicker` | `NDatePicker` | 日期选择器 |
| `XFormTimePicker` | `NTimePicker` | 时间选择器 |
| `XFormSlider` | `NSlider` | 滑块 |
| `XFormRate` | `NRate` | 评分 |
| `XFormAutoComplete` | `NAutoComplete` | 自动完成 |
| `XFormCascader` | `NCascader` | 级联选择器 |
| `XFormTreeSelect` | `NTreeSelect` | 树选择器 |
| `XFormColorPicker` | `NColorPicker` | 颜色选择器 |
| `XFormTransfer` | `NTransfer` | 穿梭框 |
| `XFormUpload` | `NUpload` | 上传组件 |
| `XFormDynamicInput` | `NDynamicInput` | 动态输入框 |
| `XFormDynamicTags` | `NDynamicTags` | 动态标签 |
| `XFormInputOTP` | `NInputOTP` | OTP输入框 |
| `XFormMention` | `NMention` | 提及组件 |

## 自动 placeholder

XForm 组件会根据 `label` 和组件类型自动生成 placeholder：

- 输入类组件（Input、InputNumber、Textarea 等）：`请输入${label}`
- 选择类组件（Select、DatePicker、TimePicker 等）：`请选择${label}`

```vue
<template>
  <XForm :model="form">
    <!-- 自动生成 placeholder="请输入姓名" -->
    <XFormInput label="姓名" path="name" v-model:value="form.name" />
    
    <!-- 自动生成 placeholder="请选择性别" -->
    <XFormSelect label="性别" path="gender" v-model:value="form.gender" :options="genderOptions" />
    
    <!-- 禁用自动 placeholder -->
    <XFormInput label="备注" path="remark" v-model:value="form.remark" :auto-placeholder="false" />
    
    <!-- 自定义 placeholder -->
    <XFormInput label="邮箱" path="email" v-model:value="form.email" placeholder="请输入您的邮箱地址" />
  </XForm>
</template>
```

## 默认属性配置

通过 `defaultProps` 可以为表单组件设置默认属性：

```vue
<template>
  <XForm 
    :model="form" 
    :default-props="defaultProps"
  >
    <!-- 这些组件会自动应用默认属性 -->
    <XFormInput label="姓名" path="name" v-model:value="form.name" />
    <XFormSelect label="城市" path="city" v-model:value="form.city" :options="cityOptions" />
    <XFormInputNumber label="年龄" path="age" v-model:value="form.age" />
  </XForm>
</template>

<script setup>
const defaultProps = {
  // 全局默认属性，应用于所有组件
  global: {
    clearable: true,
    size: 'medium'
  },
  // 输入框默认属性
  input: {
    showPasswordOn: 'click'
  },
  // 选择器默认属性
  select: {
    filterable: true
  },
  // 数字输入框默认属性
  'input-number': {
    showButton: false,
    precision: 0
  }
}
</script>
```

## 表单验证

XForm 完全兼容 Naive UI 的表单验证：

```vue
<template>
  <XForm 
    ref="formRef"
    :model="form" 
    :rules="rules"
  >
    <XFormInput label="姓名" path="name" v-model:value="form.name" />
    <XFormInputNumber label="年龄" path="age" v-model:value="form.age" />
  </XForm>
  
  <NButton @click="handleSubmit">提交</NButton>
</template>

<script setup>
const formRef = ref()

const form = reactive({
  name: '',
  age: null
})

const rules = {
  name: {
    required: true,
    message: '请输入姓名',
    trigger: ['blur', 'input']
  },
  age: {
    required: true,
    type: 'number',
    message: '请输入年龄',
    trigger: ['blur', 'change']
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    console.log('表单验证通过', form)
  } catch (error) {
    console.error('表单验证失败', error)
  }
}
</script>
```

## 组件属性

### XForm

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `model` | `Record<string, any>` | `{}` | 表单数据模型 |
| `defaultProps` | `Record<string, any>` | `{}` | 默认属性配置 |
| 其他属性 | - | - | 继承 `NForm` 的所有属性 |

### XFormInput

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `label` | `string` | - | 表单项标签 |
| `path` | `string` | - | 表单项路径 |
| `value` | `string \| number \| null` | - | 输入框的值 |
| `autoPlaceholder` | `boolean` | `true` | 是否自动生成 placeholder |
| `placeholderPrefix` | `string` | - | 自定义 placeholder 前缀 |
| 其他属性 | - | - | 继承 `NFormItem` 和 `NInput` 的所有属性 |

### 其他组件

其他 XForm 组件的属性类似，都包含：
- `label`: 表单项标签
- `path`: 表单项路径  
- `value`: 组件的值
- `autoPlaceholder`: 是否自动生成 placeholder（适用于有 placeholder 的组件）
- 继承对应 Naive UI 组件的所有属性

## 事件

所有 XForm 组件都支持对应 Naive UI 组件的事件，主要是 `update:value` 事件：

```vue
<XFormInput 
  label="姓名" 
  path="name" 
  v-model:value="form.name"
  @update:value="handleNameChange"
/>
```

## 方法

XForm 组件暴露了表单的验证方法：

```vue
<template>
  <XForm ref="formRef" :model="form">
    <!-- 表单项 -->
  </XForm>
</template>

<script setup>
const formRef = ref()

// 验证表单
const validate = async () => {
  return await formRef.value?.validate()
}

// 重置验证状态
const restoreValidation = () => {
  formRef.value?.restoreValidation()
}
</script>
```

## 完整示例

```vue
<template>
  <div class="form-demo">
    <XForm 
      ref="formRef"
      :model="form"
      :rules="rules"
      :default-props="defaultProps"
      label-placement="left"
      label-width="auto"
    >
      <XFormInput label="姓名" path="name" v-model:value="form.name" />
      
      <XFormInputNumber 
        label="年龄" 
        path="age" 
        v-model:value="form.age"
        :min="0"
        :max="120"
      />
      
      <XFormSelect 
        label="性别" 
        path="gender" 
        v-model:value="form.gender"
        :options="genderOptions"
      />
      
      <XFormDatePicker 
        label="出生日期" 
        path="birthDate" 
        v-model:value="form.birthDate"
        type="date"
      />
      
      <XFormCheckbox 
        label="兴趣爱好" 
        path="hobbies" 
        v-model:value="form.hobbies"
        :options="hobbyOptions"
      />
      
      <XFormSwitch 
        label="接收通知" 
        path="notification" 
        v-model:value="form.notification"
      />
    </XForm>
    
    <div class="form-actions">
      <NButton type="primary" @click="handleSubmit">提交</NButton>
      <NButton @click="handleReset">重置</NButton>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { NButton } from 'naive-ui'
import { 
  XForm, 
  XFormInput, 
  XFormInputNumber, 
  XFormSelect, 
  XFormDatePicker, 
  XFormCheckbox, 
  XFormSwitch,
  XFormTransfer,
  XFormUpload,
  XFormDynamicInput,
  XFormDynamicTags,
  XFormInputOTP,
  XFormMention
} from '@/components/ui/x-form'

const formRef = ref()

const form = reactive({
  name: '',
  age: null,
  gender: null,
  birthDate: null,
  hobbies: [],
  notification: false
})

const rules = {
  name: {
    required: true,
    message: '请输入姓名',
    trigger: ['blur', 'input']
  },
  age: {
    required: true,
    type: 'number',
    message: '请输入年龄',
    trigger: ['blur', 'change']
  }
}

const defaultProps = {
  global: {
    clearable: true
  },
  select: {
    filterable: true
  }
}

const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' }
]

const hobbyOptions = [
  { label: '阅读', value: 'reading' },
  { label: '运动', value: 'sports' },
  { label: '音乐', value: 'music' }
]

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    console.log('提交数据:', form)
  } catch (error) {
    console.error('验证失败:', error)
  }
}

const handleReset = () => {
  Object.assign(form, {
    name: '',
    age: null,
    gender: null,
    birthDate: null,
    hobbies: [],
    notification: false
  })
  formRef.value?.restoreValidation()
}
</script>
```

## 注意事项

1. **v-model 使用**: 所有 XForm 组件都使用 `v-model:value` 进行双向绑定
2. **属性继承**: XForm 组件会将不识别的属性传递给对应的 Naive UI 组件
3. **类型安全**: 建议使用 TypeScript 以获得更好的类型提示和检查
4. **性能优化**: 大型表单建议使用 `v-show` 而不是 `v-if` 来切换表单项的显示状态

## 扩展

如果需要添加新的表单组件，可以参考现有组件的实现方式：

1. 创建新的组件文件
2. 定义组件的 props 接口
3. 实现组件逻辑
4. 在 `index.ts` 中导出
5. 更新类型定义

这样就可以保持 XForm 系统的一致性和可扩展性。