# XModal 组件

基于 Naive UI 的 Modal 组件封装，提供了更加灵活的配置选项和自定义样式支持，内置滚动条和尺寸管理。

## 基础用法

```tsx
import XModal from '@/components/ui/x-modal/x-modal'

const [visible, setVisible] = useState(false)

<XModal
  v-model:visible={visible}
  title="标题"
  onConfirm={() => console.log('确认')}
  onCancel={() => console.log('取消')}
>
  <p>这是弹窗内容</p>
</XModal>
```

## API

### Props

| 属性           | 类型                                                         | 默认值     | 说明                       |
| -------------- | ------------------------------------------------------------ | ---------- | -------------------------- |
| visible        | `boolean`                                                    | -          | 是否显示弹窗，支持 v-model |
| title          | `string`                                                     | -          | 弹窗标题                   |
| showClose      | `boolean`                                                    | `true`     | 是否显示关闭按钮           |
| showFooter     | `boolean`                                                    | `true`     | 是否显示底部操作区域       |
| confirmLoading | `boolean`                                                    | `false`    | 确认按钮加载状态           |
| confirmText    | `string`                                                     | `'确认'`   | 确认按钮文字               |
| cancelText     | `string`                                                     | `'取消'`   | 取消按钮文字               |
| maskClosable   | `boolean`                                                    | `true`     | 点击遮罩层是否可以关闭     |
| size           | `'small' \| 'medium' \| 'large' \| 'huge'`                   | `'medium'` | 弹窗尺寸                   |
| headerClass    | `string`                                                     | -          | 头部自定义样式类名         |
| contentClass   | `string`                                                     | -          | 内容区域自定义样式类名     |
| footerClass    | `string`                                                     | -          | 底部区域自定义样式类名     |
| onConfirm      | `(event: MouseEvent) => boolean \| Promise<boolean> \| void` | -          | 确认按钮点击回调           |
| onCancel       | `(event: MouseEvent) => boolean \| Promise<boolean> \| void` | -          | 取消按钮点击回调           |
| onClose        | `(event: MouseEvent) => boolean \| Promise<boolean> \| void` | -          | 关闭按钮点击回调           |
| onAfterEnter   | `() => void`                                                 | -          | 弹窗打开后回调             |
| onAfterLeave   | `() => void`                                                 | -          | 弹窗关闭后回调             |
| onEsc          | `() => void`                                                 | -          | 按 ESC 键回调              |
| onMaskClick    | `() => void`                                                 | -          | 点击遮罩层回调             |

### Events

| 事件名         | 说明             | 参数                 |
| -------------- | ---------------- | -------------------- |
| update:visible | 弹窗显示状态改变 | `(visible: boolean)` |

### Slots

| 插槽名  | 说明           | 参数 |
| ------- | -------------- | ---- |
| default | 弹窗主体内容   | -    |
| header  | 自定义头部内容 | -    |
| footer  | 自定义底部内容 | -    |

### 尺寸规格

| 尺寸   | 最大宽度            |
| ------ | ------------------- |
| small  | `max-w-sm` (384px)  |
| medium | `max-w-md` (448px)  |
| large  | `max-w-lg` (512px)  |
| huge   | `max-w-2xl` (672px) |

### 默认样式

组件默认包含以下样式：

- **弹窗容器**: `bg-white rounded-lg min-w-sm`
- **头部**: `flex items-center justify-between p-4`
- **标题**: `text-lg`
- **内容**: `p-4` + 自动滚动条，最大高度为 `calc(100vh-60px-66px-(20px*2))`
- **底部**: `flex items-center justify-end gap-3 p-4`

## 使用示例

### 基础弹窗

```tsx
const [visible, setVisible] = useState(false)

<XModal
  v-model:visible={visible}
  title="基础弹窗"
  onConfirm={() => {
    console.log('确认操作')
    setVisible(false)
  }}
>
  <p>这是一个基础的弹窗示例</p>
</XModal>
```

### 异步确认

```tsx
<XModal
  v-model:visible={visible}
  title="异步操作"
  confirmLoading={loading}
  onConfirm={async () => {
    setLoading(true)
    try {
      await someAsyncOperation()
      return true // 返回 true 关闭弹窗
    } catch (error) {
      return false // 返回 false 保持弹窗打开
    } finally {
      setLoading(false)
    }
  }}
>
  <p>点击确认将执行异步操作</p>
</XModal>
```

### 自定义头部和底部

```tsx
<XModal v-model:visible={visible} showFooter={false}>
  {{
    header: () => (
      <div class="flex gap-2 items-center">
        <IconUser />
        <span>用户信息</span>
      </div>
    ),
    default: () => <UserForm />,
    footer: () => (
      <div class="flex w-full justify-between">
        <NButton onClick={() => setVisible(false)}>关闭</NButton>
        <div class="space-x-2">
          <NButton>重置</NButton>
          <NButton type="primary">保存</NButton>
        </div>
      </div>
    )
  }}
</XModal>
```

### 不同尺寸

```tsx
// 小尺寸弹窗
<XModal v-model:visible={visible} size="small" title="小弹窗">
  <p>小尺寸内容</p>
</XModal>

// 大尺寸弹窗
<XModal v-model:visible={visible} size="huge" title="大弹窗">
  <div class="space-y-4">
    <p>更多内容...</p>
  </div>
</XModal>
```

### 自定义样式

```tsx
<XModal
  v-model:visible={visible}
  title="自定义样式"
  headerClass="bg-blue-50 border-b"
  contentClass="bg-gray-50"
  footerClass="bg-blue-50 border-t"
  class="shadow-2xl"
>
  <p>自定义样式的弹窗内容</p>
</XModal>
```

### 禁用遮罩关闭

```tsx
<XModal
  v-model:visible={visible}
  title="重要确认"
  maskClosable={false}
  showClose={false}
>
  <p>此弹窗只能通过底部按钮关闭</p>
</XModal>
```
