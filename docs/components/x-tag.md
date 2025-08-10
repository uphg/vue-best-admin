# Tag 组件

多功能标签组件，支持多种主题色、可选择状态、关闭功能等特性。

## 基础用法

```tsx
import XTag from '@/components/ui/x-tag/x-tag'

// 基础标签
<XTag>默认标签</XTag>

// 带主题色的标签
<XTag hue="blue">蓝色标签</XTag>

// 可关闭的标签
<XTag closable onClose={() => console.log('closed')}>
  可关闭标签
</XTag>
```

## API

### Props

| 属性      | 类型                | 默认值  | 说明                                                                              |
| --------- | ------------------- | ------- | --------------------------------------------------------------------------------- |
| class     | `string`            | `''`    | 自定义样式类名                                                                    |
| bordered  | `boolean`           | `false` | 是否显示边框                                                                      |
| checkable | `boolean`           | `false` | 是否可选择                                                                        |
| disabled  | `boolean`           | `false` | 是否禁用                                                                          |
| round     | `boolean`           | `false` | 是否圆形                                                                          |
| hue       | `string`            | -       | 主题色，支持 `red`, `blue`, `green`, `yellow`, `purple`, `pink`, `indigo`, `gray` |
| closable  | `boolean`           | `false` | 是否可关闭                                                                        |
| onClick   | `MouseEventHandler` | -       | 点击事件回调                                                                      |
| onClose   | `MouseEventHandler` | -       | 关闭事件回调                                                                      |

### Events

| 事件名         | 参数      | 说明                                                |
| -------------- | --------- | --------------------------------------------------- |
| update:checked | `boolean` | 选择状态变化时触发（仅在 `checkable` 为 `true` 时） |

## 主题色

组件支持以下主题色：

- `red` - 红色主题
- `blue` - 蓝色主题
- `green` - 绿色主题
- `yellow` - 黄色主题
- `purple` - 紫色主题
- `pink` - 粉色主题
- `indigo` - 靛蓝主题
- `gray` - 灰色主题

每种主题色都包含对应的背景色、文字色和边框色。

## 使用示例

### 基础标签

```tsx
<XTag>默认标签</XTag>
```

### 主题色标签

```tsx
<XTag hue="red">错误</XTag>
<XTag hue="green">成功</XTag>
<XTag hue="blue">信息</XTag>
<XTag hue="yellow">警告</XTag>
```

### 带边框的标签

```tsx
<XTag bordered hue="blue">带边框的标签</XTag>
```

### 圆形标签

```tsx
<XTag round hue="green">圆形标签</XTag>
```

### 可选择标签

```tsx
<XTag checkable onUpdate:checked={checked => console.log(checked)}>
  可选择标签
</XTag>
```

### 可关闭标签

```tsx
<XTag closable hue="red" onClose={() => alert('标签被关闭')}>
  可关闭标签
</XTag>
```

### 禁用标签

```tsx
<XTag disabled hue="gray">禁用标签</XTag>
```

### 组合使用

```tsx
<XTag bordered round closable hue="purple" onClose={handleClose}>
  组合功能标签
</XTag>
```

## 样式类

组件默认包含以下样式：

- 基础：`inline-flex items-center px-1.5 py-1 text-sm font-medium`
- 过渡：`transition-colors duration-200`
- 聚焦：`focus:outline-none`

### 状态样式

- **默认状态**: `text-gray-700 bg-gray-100 hover:bg-gray-200`
- **选中状态**: `bg-blue-500 text-white border-blue-500`
- **禁用状态**: `opacity-50 cursor-not-allowed`
