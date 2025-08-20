# 退出登录功能实现文档

## 📋 功能概述

本次实现了完整的退出登录功能，包括用户确认对话框、状态清理、权限重置和页面跳转。

## 🔧 实现的功能

### 1. 用户下拉菜单 (`user-dropdown.tsx`)

- ✅ 显示用户头像和用户名
- ✅ 提供个人资料、文档、GitHub 和退出登录选项
- ✅ 集成退出登录确认对话框
- ✅ 响应式设计，支持深色模式

### 2. 退出登录工具 (`logout.ts`)

- ✅ `useLogout()` - 主要的退出登录 Hook
- ✅ 支持带确认对话框的退出
- ✅ 支持直接退出（无确认）
- ✅ 完整的状态清理机制
- ✅ 错误处理和异常恢复

### 3. 状态管理优化

- ✅ 用户 Store 添加 `avatar` 字段
- ✅ 侧边栏 Store 添加 `clear()` 方法
- ✅ 权限状态重置功能

## 🚀 使用方法

### 基本使用

```typescript
import { useLogout } from '@/hooks/logout'

const { logout } = useLogout()

// 带确认对话框的退出（推荐）
await logout()

// 直接退出，无确认对话框
await logout(false)
```

### 在组件中使用

```tsx
const UserComponent = defineComponent({
  setup() {
    const { logout } = useLogout()

    const handleLogout = async () => {
      try {
        await logout()
        // 退出成功
      } catch (error) {
        // 用户取消或退出失败
        console.log('退出被取消:', error)
      }
    }

    return () => (
      <button onClick={handleLogout}>
        退出登录
      </button>
    )
  }
})
```

## 📁 文件结构

```
src/
├── components/layout/components/layout-header/
│   └── user-dropdown.tsx          # 用户下拉菜单组件
├── stores/
│   ├── user.ts                     # 用户状态管理（已优化）
│   └── sidebar.ts                  # 侧边栏状态管理（已优化）
├── utils/
│   ├── logout.ts                   # 退出登录工具函数
│   ├── logout-test.ts              # 测试工具（开发环境）
│   └── token.ts                    # Token 管理工具
└── router/guards/
    └── guards-optimized.ts         # 路由守卫（已优化）
```

## 🔄 退出登录流程

1. **用户点击退出按钮**
   - 显示确认对话框（可选）
   - 用户确认退出

2. **执行退出操作**
   - 清除本地存储的 Token
   - 清除用户状态 (UserStore)
   - 清除侧边栏状态 (SidebarStore)
   - 重置权限加载状态

3. **页面跳转**
   - 跳转到登录页面 (`/login`)
   - 清理完成，用户需要重新登录

## 🎯 特性说明

### 确认对话框

- 使用 Naive UI 的 `useDialog()` 实现
- 支持自定义确认和取消按钮文本
- 用户取消时会抛出异常，便于上层处理

### 状态清理

- **Token 清理**: 移除 localStorage 中的认证 Token
- **用户状态**: 重置用户信息、权限等
- **侧边栏状态**: 清空菜单数据和映射关系
- **权限状态**: 重置动态路由加载状态

### 错误处理

- 网络错误处理
- 用户取消操作处理
- 状态清理失败处理
- 页面跳转失败处理

## 🧪 测试

### 开发环境测试

在浏览器控制台中运行：

```javascript
// 测试带确认对话框的退出
window.testLogout().testLogoutWithConfirm()

// 测试直接退出
window.testLogout().testLogoutDirect()

// 测试底层退出逻辑
window.testLogout().testPerformLogout()
```

### 手动测试步骤

1. 登录系统
2. 点击右上角用户头像
3. 选择"退出登录"
4. 确认对话框出现
5. 点击"确定"
6. 验证是否跳转到登录页
7. 验证用户状态是否已清除

## 🔧 自定义配置

### 修改确认对话框文本

```typescript
// 在 logout.ts 中修改
dialog.warning({
  title: '自定义标题',
  content: '自定义内容',
  positiveText: '自定义确定按钮',
  negativeText: '自定义取消按钮',
  // ...
})
```

### 修改跳转页面

```typescript
// 在 logout.ts 的 performLogout 函数中修改
await router.push('/custom-login-page')
```

### 添加额外的清理逻辑

```typescript
async function performLogout() {
  // 现有清理逻辑...

  // 添加自定义清理逻辑
  customStore.clear()
  clearCustomCache()

  // ...
}
```

## 🚨 注意事项

1. **权限重置**: 退出登录会重置所有权限相关状态，下次登录需要重新加载
2. **路由清理**: 动态添加的路由会在下次刷新页面时自动清理
3. **状态持久化**: 确保所有需要清理的状态都在 `performLogout` 中处理
4. **错误处理**: 建议在调用 `logout()` 时添加 try-catch 处理用户取消的情况

## 📝 更新日志

- ✅ 实现基础退出登录功能
- ✅ 添加用户确认对话框
- ✅ 优化用户下拉菜单显示
- ✅ 完善状态清理机制
- ✅ 添加错误处理和测试工具
- ✅ 支持用户头像和用户名显示
