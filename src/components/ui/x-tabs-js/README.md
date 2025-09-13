# XTabs 组件 (JavaScript 版本)

一个基于 Vue 3 + JavaScript 的标签页组件，支持受控和非受控模式。

## 特性

- 🎨 **主题适配** - 使用 CSS 变量，支持深色模式
- ♿ **无障碍访问** - 支持键盘导航和屏幕阅读器
- 🔧 **灵活配置** - 支持禁用状态、自定义样式
- 📱 **响应式** - 适配不同屏幕尺寸

## 组件结构

```
XTabs
├── XTabsBar
│   └── XTabsTrigger (多个)
└── XTabsContent (多个)
```

## 基础用法

### 非受控模式 (defaultValue)

```jsx
import { XTabs, XTabsBar, XTabsContent, XTabsTrigger } from '@/components/ui/x-tabs-js'

<XTabs defaultValue="tab1">
  <XTabsBar>
    <XTabsTrigger value="tab1">标签 1</XTabsTrigger>
    <XTabsTrigger value="tab2">标签 2</XTabsTrigger>
  </XTabsBar>
  <XTabsContent value="tab1">
    内容 1
  </XTabsContent>
  <XTabsContent value="tab2">
    内容 2
  </XTabsContent>
</XTabs>
```

### 受控模式 (v-model:value)

```jsx
const currentTab = ref('tab1')

<XTabs v-model:value={currentTab.value}>
  <XTabsBar>
    <XTabsTrigger value="tab1">标签 1</XTabsTrigger>
    <XTabsTrigger value="tab2">标签 2</XTabsTrigger>
  </XTabsBar>
  <XTabsContent value="tab1">
    内容 1
  </XTabsContent>
  <XTabsContent value="tab2">
    内容 2
  </XTabsContent>
</XTabs>
```

## API 参考

### XTabs Props

| 属性            | 类型     | 默认值      | 说明                           |
| --------------- | -------- | ----------- | ------------------------------ |
| `defaultValue`  | `string` | `''`        | 默认激活的标签值（非受控模式） |
| `value`         | `string` | `undefined` | 当前激活的标签值（受控模式）   |
| `v-model:value` | `string` | -           | 双向绑定的激活标签值           |

### XTabs Events

| 事件           | 类型                      | 说明                               |
| -------------- | ------------------------- | ---------------------------------- |
| `update:value` | `(value: string) => void` | 标签切换时触发，用于 v-model:value |

### XTabsTrigger Props

| 属性       | 类型      | 默认值  | 说明             |
| ---------- | --------- | ------- | ---------------- |
| `value`    | `string`  | -       | 标签的唯一标识符 |
| `disabled` | `boolean` | `false` | 是否禁用该标签   |

### XTabsContent Props

| 属性    | 类型     | 默认值 | 说明             |
| ------- | -------- | ------ | ---------------- |
| `value` | `string` | -      | 对应的标签标识符 |

## 样式定制

组件使用 CSS 变量进行主题定制：

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --ring: oklch(0.708 0 0);
}
```

## 高级用法

### 双向绑定示例

```jsx
const currentTab = ref('tab1')

// 可以通过程序化方式切换标签
const switchToTab2 = () => {
  currentTab.value = 'tab2'
}

<XTabs v-model:value={currentTab.value}>
  <XTabsBar>
    <XTabsTrigger value="tab1">标签 1</XTabsTrigger>
    <XTabsTrigger value="tab2">标签 2</XTabsTrigger>
  </XTabsBar>
  <XTabsContent value="tab1">内容 1</XTabsContent>
  <XTabsContent value="tab2">内容 2</XTabsContent>
</XTabs>

<button onClick={switchToTab2}>切换到标签 2</button>
```

### 监听标签切换

```jsx
const currentTab = ref('tab1')

watch(currentTab, (newValue) => {
  console.log('标签切换到:', newValue)
})

<XTabs v-model:value={currentTab.value}>
  {/* ... */}
</XTabs>
```

### 禁用标签

```jsx
<XTabsTrigger value="disabled-tab" disabled>
  禁用标签
</XTabsTrigger>
```

### 自定义样式

```jsx
<XTabs defaultValue="tab1" class="custom-tabs">
  <XTabsBar class="custom-tabs-bar">
    <XTabsTrigger value="tab1" class="custom-trigger">
      自定义标签
    </XTabsTrigger>
  </XTabsBar>
  <XTabsContent value="tab1" class="custom-content">
    自定义内容
  </XTabsContent>
</XTabs>
```

## 注意事项

1. 每个 `XTabsTrigger` 和 `XTabsContent` 必须有对应的 `value` 属性
2. `defaultValue` 应该匹配某个 `XTabsTrigger` 的 `value`
3. 在受控模式下，需要监听并更新 `value` 属性
4. 组件依赖 Vue 3 的 provide/inject 机制进行状态管理

## 浏览器支持

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88
