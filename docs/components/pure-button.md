# PureButton 组件

纯净按钮组件，提供最基础的按钮交互功能，具有简洁的样式和过渡动画效果。

## 基础用法

```tsx
import PureButton from '@/components/ui/pure-button/pure-button'

// 基础按钮
<PureButton onClick={handleClick}>点击按钮</PureButton>

// 自定义样式
<PureButton class="bg-blue-500 text-white">自定义按钮</PureButton>
```

## API

### Props

| 属性    | 类型                          | 默认值 | 说明           |
| ------- | ----------------------------- | ------ | -------------- |
| class   | `string \| Array \| Object`   | -      | 自定义样式类名 |
| onClick | `(event: MouseEvent) => void` | -      | 点击事件回调   |

### 默认样式

组件默认包含以下样式：

- `text-black` - 黑色文字
- `rounded-3px` - 3px 圆角
- `border-none` - 无边框
- `bg-transparent` - 透明背景
- `cursor-pointer` - 鼠标指针
- `transition-colors duration-300` - 颜色过渡动画
- 交互状态：
  - `hover:bg-neutral-800/9` - 悬停时的背景色
  - `focus:bg-neutral-800/9` - 聚焦时的背景色
  - `active:bg-neutral-800/13` - 激活时的背景色
  - `focus:outline-none` - 移除聚焦轮廓

## 使用示例

### 基础按钮

```tsx
<PureButton onClick={() => console.log('clicked')}>
  点击我
</PureButton>
```

### 图标按钮

```tsx
import IconMenu from '~icons/lucide/menu'

<PureButton class="flex h-8 w-8 items-center justify-center">
  <IconMenu />
</PureButton>
```

### 自定义样式按钮

```tsx
<PureButton class="text-white px-4 py-2 bg-blue-500 hover:bg-blue-600">
  主要按钮
</PureButton>
```
