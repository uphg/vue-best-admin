# useForm

`useForm` 是一个基于 Naive UI 的表单封装组合式函数，提供了表单验证、字段管理、数据重置等功能。

## 基本用法

### 导入

```typescript
import { useForm } from '@/hooks/use-form'
```

### 参数说明

| 参数      | 类型                | 默认值 | 说明             |
| --------- | ------------------- | ------ | ---------------- |
| `fields`  | `FieldDefinition[]` | -      | 表单字段定义数组 |
| `options` | `UseFormOptions`    | `{}`   | 表单配置选项     |

### 类型定义

```typescript
interface FieldDefinition {
  0: string // 标签名
  1: string | NestedFieldDefinition[] // 字段名或嵌套字段定义数组
  2: FieldProps // 字段属性
}

interface NestedFieldDefinition {
  0: string | null // 标签名（null 表示无标签）
  1: string // 字段名
  2: FieldProps // 字段属性
}

interface FieldProps {
  as?: FieldAs // 组件类型
  cols?: number // 嵌套字段网格列数
  xGap?: number // 嵌套字段水平间距
  yGap?: number // 嵌套字段垂直间距
  [key: string]: any // 其他属性
}

interface UseFormOptions {
  autoRules?: string[] // 自动生成规则的字段名数组
  grid?: boolean // 是否启用 Grid 布局
}
```

### FieldAs 类型

支持的表单组件类型：

- `'input'` - 输入框
- `'input-number'` - 数字输入框
- `'select'` - 选择器
- `'date'` / `'date-picker'` - 日期选择器
- `'time'` / `'time-picker'` - 时间选择器
- `'switch'` - 开关
- `'checkbox'` / `'checkbox-group'` - 复选框
- `'radio'` / `'radio-group'` - 单选框
- `'slider'` - 滑块
- `'rate'` - 评分
- `'color-picker'` - 颜色选择器
- `'cascader'` - 级联选择器
- `'tree-select'` - 树形选择器
- `'auto-complete'` - 自动完成
- `'dynamic-input'` - 动态输入
- `'dynamic-tags'` - 动态标签
- `'upload'` - 上传
- `'transfer'` - 穿梭框

### 返回值

`useForm` 返回一个包含四个元素的元组：

1. `Form` - 渲染表单的 JSX 组件
2. `form` - 表单数据对象（响应式）
3. `formMethods` - 表单方法对象，包含：
   - `formRef`: 表单引用
   - `rules`: 表单验证规则
   - `resetForm`: 重置整个表单
   - `setFields`: 批量设置字段值
   - `resetFields`: 重置表单字段
   - `validate`: 验证表单
   - `resetValidation`: 清除验证状态

## 使用示例

### 基础示例

```tsx
import { defineComponent } from 'vue'
import { useForm } from '@/hooks/use-form'

export default defineComponent({
  setup() {
    const fields = [
      ['用户名', 'username', { as: 'input', placeholder: '请输入用户名' }],
      ['邮箱', 'email', { as: 'input', type: 'email', placeholder: '请输入邮箱' }],
      ['年龄', 'age', { as: 'input-number', min: 0, max: 120 }],
      ['性别', 'gender', {
        as: 'select',
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' }
        ]
      }]
    ]

    const [Form, form, { validate, resetForm }] = useForm(fields, {
      autoRules: ['username', 'email', 'age', 'gender']
    })

    const handleSubmit = async () => {
      try {
        const values = await validate()
        console.log('表单提交:', values)
      } catch (errors) {
        console.error('验证失败:', errors)
      }
    }

    return () => (
      <div>
        <Form />
        <div style={{ marginTop: '16px' }}>
          <button onClick={handleSubmit}>提交</button>
          <button onClick={resetForm} style={{ marginLeft: '8px' }}>重置</button>
        </div>
      </div>
    )
  }
})
```

### Grid 布局

`useForm` 支持启用 Grid 布局模式，将整个表单包装在 `NGrid` 组件中，并使用 `NFormItemGi` 替代 `NFormItem`。这样可以更灵活地控制表单项的布局。

#### 启用 Grid 布局

```tsx
import { defineComponent } from 'vue'
import { useForm } from '@/hooks/use-form'

export default defineComponent({
  setup() {
    const fields = [
      ['用户名', 'username', { as: 'input', span: 12 }],
      ['邮箱', 'email', { as: 'input', span: 12 }],
      ['手机号', 'phone', { as: 'input', span: 8 }],
      ['年龄', 'age', { as: 'input-number', span: 8 }],
      ['性别', 'gender', { as: 'select', span: 8, options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' }
      ]}],
      ['地址', 'address', { as: 'input', span: 24 }],
      ['备注', 'remark', { as: 'input', type: 'textarea', rows: 3, span: 24 }]
    ]

    const [Form, form] = useForm(fields, {
      grid: true, // 启用 Grid 布局
      autoRules: ['username', 'email', 'phone', 'age', 'gender']
    })

    return () => (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>用户信息表单 (Grid 布局)</h2>
        <Form />
      </div>
    )
  }
})
```

上述代码将渲染为：

```html
<n-form>
  <n-grid>
    <n-form-item-gi label="用户名" path="username" :span="12">
      <n-input v-model:value={form.username} />
    </n-form-item-gi>
    <n-form-item-gi label="邮箱" path="email" :span="12">
      <n-input v-model:value={form.email} />
    </n-form-item-gi>
    <n-form-item-gi label="手机号" path="phone" :span="8">
      <n-input v-model:value={form.phone} />
    </n-form-item-gi>
    <n-form-item-gi label="年龄" path="age" :span="8">
      <n-input-number v-model:value={form.age} />
    </n-form-item-gi>
    <n-form-item-gi label="性别" path="gender" :span="8">
      <n-select v-model:value={form.gender} :options="[...]" />
    </n-form-item-gi>
    <n-form-item-gi label="地址" path="address" :span="24">
      <n-input v-model:value={form.address} />
    </n-form-item-gi>
    <n-form-item-gi label="备注" path="remark" :span="24">
      <n-input v-model:value={form.remark} type="textarea" :rows="3" />
    </n-form-item-gi>
  </n-grid>
</n-form>
```

#### Grid 布局属性

当启用 Grid 布局时，可以在字段属性中使用以下 Grid 相关的属性：

| 属性     | 类型     | 默认值 | 说明                                           |
| -------- | -------- | ------ | ---------------------------------------------- |
| `span`   | `number` | -      | 栅格占据的列数（NFormItemGi 的 span 属性）    |
| `offset` | `number` | -      | 栅格左侧间隔列数（NFormItemGi 的 offset 属性） |
| `suffix` | `string` | -      | 后缀内容（NFormItemGi 的 suffix 属性）        |

#### Grid 布局与嵌套字段

Grid 布局也支持嵌套字段，嵌套字段内部仍然使用自己的网格配置：

```tsx
const fields = [
  ['个人信息', [
    ['姓名', 'name', { as: 'input', span: 12 }],
    ['年龄', 'age', { as: 'input-number', span: 12 }]
  ], { grid: { cols: 24, xGap: 16, yGap: 8 } }],
  ['联系方式', [
    [null, 'phone', { as: 'input', placeholder: '手机号' }],
    [null, 'email', { as: 'input', placeholder: '邮箱' }]
  ], { grid: { cols: 2, xGap: 16 } }],
  ['备注', 'remark', { as: 'input', type: 'textarea', span: 24 }]
]

const [Form] = useForm(fields, { grid: true })
```

### 复杂表单示例

```tsx
import { defineComponent } from 'vue'
import { useForm } from '@/hooks/use-form'

export default defineComponent({
  setup() {
    const fields = [
      ['姓名', 'name', { as: 'input', placeholder: '请输入姓名' }],
      ['出生日期', 'birthday', { as: 'date-picker', type: 'date' }],
      ['技能', 'skills', {
        as: 'checkbox-group',
        options: [
          { label: 'JavaScript', value: 'js' },
          { label: 'TypeScript', value: 'ts' },
          { label: 'Vue', value: 'vue' },
          { label: 'React', value: 'react' }
        ]
      }],
      ['工作经验', 'experience', { as: 'slider', min: 0, max: 20 }],
      ['满意度', 'satisfaction', { as: 'rate' }],
      ['是否在职', 'employed', { as: 'switch' }],
      ['所在城市', 'city', {
        as: 'cascader',
        options: [
          {
            label: '北京',
            value: 'beijing',
            children: [
              { label: '朝阳区', value: 'chaoyang' },
              { label: '海淀区', value: 'haidian' }
            ]
          },
          {
            label: '上海',
            value: 'shanghai',
            children: [
              { label: '浦东新区', value: 'pudong' },
              { label: '徐汇区', value: 'xuhui' }
            ]
          }
        ]
      }],
      ['头像', 'avatar', { as: 'upload', accept: 'image/*' }],
      ['个人简介', 'bio', { as: 'input', type: 'textarea', rows: 4 }]
    ]

    const [Form, form, { validate, setFields }] = useForm(fields, {
      autoRules: ['name', 'birthday', 'skills', 'experience', 'city']
    })

    // 设置默认值
    setFields({
      name: '张三',
      experience: 3,
      employed: true
    })

    const handleSubmit = async () => {
      try {
        const values = await validate()
        console.log('提交数据:', values)
      } catch (errors) {
        console.error('验证失败:', errors)
      }
    }

    return () => (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2>用户信息表单</h2>
        <Form />
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button onClick={handleSubmit}>提交信息</button>
        </div>
      </div>
    )
  }
})
```

### 自定义验证规则

```typescript
const fields = [
  ['邮箱', 'email', {
    as: 'input',
    type: 'email',
    rules: {
      required: true,
      message: '请输入有效的邮箱地址',
      trigger: 'blur',
      validator: (rule, value) => {
        const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
        return emailRegex.test(value)
      }
    }
  }],
  ['密码', 'password', {
    as: 'input',
    type: 'password',
    rules: {
      required: true,
      message: '密码长度至少6位',
      trigger: 'blur',
      validator: (rule, value) => value.length >= 6
    }
  }],
  ['确认密码', 'confirmPassword', {
    as: 'input',
    type: 'password',
    rules: {
      required: true,
      message: '两次密码输入不一致',
      trigger: 'blur',
      validator: (rule, value, form) => value === form.password
    }
  }]
]

const [Form, form] = useForm(fields)
```

### 嵌套布局示例

`useForm` 支持嵌套布局功能，可以在一个表单项下创建多个子字段，并通过网格布局进行排列。

#### 基本嵌套布局

```tsx
import { defineComponent } from 'vue'
import { useForm } from '@/hooks/use-form'

export default defineComponent({
  setup() {
    const fields = [
      ['活动名称', [
        [null, 'name1', { as: 'input', placeholder: '请输入主要名称' }],
        [null, 'name2', { as: 'input', placeholder: '请输入备用名称' }]
      ], { cols: 2, xGap: 24 }],
      ['活动区域', 'region', {
        as: 'select',
        options: [
          { label: '区域一', value: 0 },
          { label: '区域二', value: 1 },
          { label: '区域三', value: 2 }
        ]
      }]
    ]

    const [Form, form] = useForm(fields, {
      autoRules: ['name1', 'name2', 'region']
    })

    return () => <Form />
  }
})
```

上述代码将渲染为：

```html
<n-form>
  <n-form-item label="活动名称">
    <n-grid :cols="2" :x-gap="24">
      <n-grid-item>
        <n-form-item path="name1">
          <n-input v-model:value={form.name1} placeholder="请输入主要名称" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item path="name2">
          <n-input v-model:value={form.name2} placeholder="请输入备用名称" />
        </n-form-item>
      </n-grid-item>
    </n-grid>
  </n-form-item>
  <n-form-item label="活动区域" path="region">
    <n-select
      v-model:value={form.region}
      options={[
        { label: '区域一', value: 0 },
        { label: '区域二', value: 1 },
        { label: '区域三', value: 2 }
      ]}
    />
  </n-form-item>
</n-form>
```

#### 复杂嵌套布局

```tsx
const fields = [
  ['联系信息', [
    ['姓名', 'contactName', { as: 'input' }],
    ['电话', 'contactPhone', { as: 'input' }],
    ['邮箱', 'contactEmail', { as: 'input', type: 'email' }]
  ], { cols: 3, xGap: 16, yGap: 16 }],
  ['地址信息', [
    [null, 'province', { as: 'select', placeholder: '请选择省份', options: [] }],
    [null, 'city', { as: 'select', placeholder: '请选择城市', options: [] }],
    [null, 'district', { as: 'select', placeholder: '请选择区县', options: [] }],
    [null, 'address', { as: 'input', placeholder: '详细地址' }]
  ], { cols: 2, xGap: 16 }],
  ['备注', 'remark', { as: 'input', type: 'textarea', rows: 3 }]
]
```

#### 嵌套布局配置选项

在嵌套字段的配置对象中，可以使用以下布局选项：

| 属性   | 类型     | 默认值 | 说明           |
| ------ | -------- | ------ | -------------- |
| `cols` | `number` | `1`    | 网格列数       |
| `xGap` | `number` | `0`    | 水平间距（px） |
| `yGap` | `number` | `0`    | 垂直间距（px） |

#### 嵌套字段标签

- 当嵌套字段的标签为 `null` 时，该字段不会显示标签，只渲染输入组件
- 当嵌套字段有标签时，会在网格项内创建带标签的表单项

### 嵌套字段示例

```typescript
const fields = [
  ['用户.姓名', 'user.name', { as: 'input' }],
  ['用户.邮箱', 'user.email', { as: 'input', type: 'email' }],
  ['地址.省', 'address.province', { as: 'input' }],
  ['地址.市', 'address.city', { as: 'input' }],
  ['地址.区', 'address.district', { as: 'input' }]
]

const [Form, form] = useForm(fields, {
  autoRules: ['user.name', 'user.email', 'address.province', 'address.city', 'address.district']
})

// 设置嵌套字段值
setFields({
  user: {
    name: '李四',
    email: 'lisi@example.com'
  },
  address: {
    province: '北京',
    city: '北京市',
    district: '朝阳区'
  }
})
```

### 表单方法使用

```typescript
const [Form, form, {
  formRef,
  rules,
  resetForm,
  setFields,
  resetFields,
  validate,
  resetValidation
}] = useForm(fields)

// 重置整个表单
resetForm()

// 重置表单字段
resetFields('username')

// 设置字段值
setFields({
  username: 'newUser',
  email: 'new@example.com'
})

// 验证表单
async function handleSubmit() {
  try {
    const values = await validate()
    console.log('验证成功:', values)
  } catch (errors) {
    console.error('验证失败:', errors)
  }
}

// 清除验证状态
resetValidation()
```

## 注意事项

1. 字段名支持嵌套路径（如 `user.name`）
2. `autoRules` 参数用于指定哪些字段自动生成验证规则
3. 可以通过 `rules` 属性自定义验证规则
4. 表单数据是响应式的，可以直接修改 `form.value`
5. 所有表单组件都支持 Naive UI 的原生属性
6. 上传组件使用 `fileList` 作为 modelKey
