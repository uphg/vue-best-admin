# useTable

`useTable` 是一个基于 Naive UI 的 `NDataTable` 封装的组合式函数，提供了分页、数据加载、刷新等功能。

## 基本用法

### 导入

```typescript
import { useTable } from '@/hooks/use-data-table'
```

### 参数说明

| 参数      | 类型                                       | 默认值 | 说明         |
| --------- | ------------------------------------------ | ------ | ------------ |
| `columns` | `ShallowRef<DataTableColumn[]>`            | -      | 表格列配置   |
| `props`   | `Partial<UseTableProps>`                   | -      | 表格属性配置 |
| `slots`   | `{ empty: () => any, loading: () => any }` | -      | 插槽配置     |

### UseTableProps 接口

```typescript
interface UseTableProps extends DataTableProps {
  dataSource: (options: { page: number, pageSize: number }) => Promise<any>
  initDataSource: boolean
  hasLoading: boolean
  tableClass: ClassValue
  pagingWrapClass: ClassValue
  onBeforeUpdateData: () => void
  onAfterUpdateData: () => void
}
```

### 返回值

`useTable` 返回一个包含两个元素的元组：

1. `TableComponent` - 渲染表格的 JSX 组件
2. `tableState` - 表格状态对象，包含：
   - `data`: 表格数据
   - `page`: 当前页码
   - `pageSize`: 每页条数
   - `sorter`: 排序配置
   - `refresh`: 刷新数据的方法

## 使用示例

### 基础示例

```tsx
import type { DataTableColumn } from 'naive-ui'
import { defineComponent, shallowRef } from 'vue'
import { useTable } from '@/hooks/use-data-table'

export default defineComponent({
  setup() {
    const columns = shallowRef<DataTableColumn[]>([
      {
        title: '姓名',
        key: 'name',
        width: 100
      },
      {
        title: '年龄',
        key: 'age',
        width: 100
      },
      {
        title: '地址',
        key: 'address'
      }
    ])

    // 模拟数据源
    const fetchData = async ({ page, pageSize }: { page: number, pageSize: number }) => {
      // 模拟API调用
      const total = 100
      const data = Array.from({ length: pageSize }, (_, i) => ({
        name: `用户${(page - 1) * pageSize + i + 1}`,
        age: Math.floor(Math.random() * 50) + 18,
        address: `地址${(page - 1) * pageSize + i + 1}`
      }))

      return {
        data,
        total
      }
    }

    const [Table, tableState] = useTable(columns, {
      dataSource: fetchData
    })

    return () => (
      <div>
        <Table />
      </div>
    )
  }
})
```

### 带加载状态的示例

```tsx
import type { DataTableColumn } from 'naive-ui'
import { defineComponent, shallowRef } from 'vue'
import { useTable } from '@/hooks/use-data-table'

export default defineComponent({
  setup() {
    const columns = shallowRef<DataTableColumn[]>([
      { title: 'ID', key: 'id', width: 80 },
      { title: '标题', key: 'title' },
      { title: '状态', key: 'status', width: 100 },
      { title: '创建时间', key: 'createdAt', width: 180 }
    ])

    const fetchData = async ({ page, pageSize }: { page: number, pageSize: number }) => {
      // 模拟延迟
      await new Promise(resolve => setTimeout(resolve, 1000))

      const data = [
        { id: 1, title: '示例标题1', status: 'active', createdAt: '2024-01-01' },
        { id: 2, title: '示例标题2', status: 'inactive', createdAt: '2024-01-02' },
        // ...更多数据
      ]

      return {
        data,
        total: 50
      }
    }

    const [Table, { refresh }] = useTable(columns, {
      dataSource: fetchData,
      hasLoading: true,
      tableClass: 'custom-table',
      pagingWrapClass: 'custom-pagination'
    })

    return () => (
      <div>
        <Table />
        <button onClick={refresh}>刷新数据</button>
      </div>
    )
  }
})
```

### 自定义分页配置

```tsx
const [Table] = useTable(columns, {
  dataSource: fetchData,
  pagination: {
    pageSizes: [5, 10, 20, 50],
    showSizePicker: true,
    showQuickJumper: true
  }
})
```

## 高级用法

### 自定义空数据和加载状态

```tsx
const [Table] = useTable(columns, {
  dataSource: fetchData
}, {
  empty: () => <div class="text-gray-500">暂无数据</div>,
  loading: () => <div class="text-blue-500">加载中...</div>
})
```

### 事件监听

```typescript
const [Table] = useTable(columns, {
  dataSource: fetchData,
  onBeforeUpdateData: () => {
    console.log('开始更新数据')
  },
  onAfterUpdateData: () => {
    console.log('数据更新完成')
  }
})
```

## 注意事项

1. `dataSource` 函数必须返回一个包含 `data` 和 `total` 属性的对象
2. `columns` 需要使用 `shallowRef` 包裹，以便响应式更新
3. 表格会自动处理分页和加载状态
4. 可以通过 `refresh` 方法手动刷新数据
