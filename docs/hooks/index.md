# 快速开始

本章节介绍了项目中可用的自定义组合式函数（Hooks）。

## 可用的 Hooks

### [useTable](./use-data-table.md)

基于 Naive UI 的数据表格封装，提供分页、数据加载、刷新等功能。

**主要特性：**

- 自动分页处理
- 数据加载状态管理
- 支持自定义列配置
- 响应式数据更新

### [useForm](./use-form.md)

基于 Naive UI 的表单封装，提供表单验证、字段管理等功能。

**主要特性：**

- 自动表单验证规则生成
- 支持多种表单组件类型
- 嵌套字段支持
- 表单状态管理

### 使用示例

#### useTable

```typescript
import type { DataTableColumn } from 'naive-ui'
import { useTable } from '@/hooks/use-data-table'

const columns = shallowRef<DataTableColumn[]>([
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' }
])

const [Table] = useTable(columns, {
  dataSource: async ({ page, pageSize }) => {
    // 获取数据
    return { data: [], total: 0 }
  }
})
```

#### useForm

```typescript
import { useForm } from '@/hooks/use-form'

const fields = [
  ['用户名', 'username', { as: 'input' }],
  ['年龄', 'age', { as: 'input-number' }]
]

const [Form, form, { validate }] = useForm(fields, {
  autoRules: ['username', 'age']
})
```

## 注意事项

1. 所有 hooks 都基于 Vue 3 的组合式 API
2. 需要配合 Naive UI 组件库使用
3. 支持 TypeScript 类型推断
4. 遵循项目的代码规范
