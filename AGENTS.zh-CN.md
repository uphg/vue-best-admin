# Vue-Best-Admin 开发指南（优化版）

## 概述

本项目是基于 Vue 3 + TypeScript + Composition API 构建的后台管理系统，采用现代前端工具链（Vite/pnpm）开发，遵循严格的代码规范和架构约定。

## 技术栈

- **核心框架**: Vue 3 + Composition API
- **开发语言**: TypeScript (TSX 语法)
- **构建工具**: Vite
- **包管理器**: pnpm
- **运行环境**: Node.js ≥ v20 (推荐 Ubuntu)
- **UI 组件**: Naive UI
- **样式方案**: UnoCSS
- **状态管理**: Pinia
- **代码规范**: Conventional Commits + ESLint

## 开发命令

```bash
pnpm install      # 安装项目依赖
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm test:unit    # 执行单元测试
pnpm type-check   # 运行类型检查
pnpm lint         # 代码质量检查
```

## 代码规范

### 文件命名

- 组件/页面：kebab-case (例: `user-profile.tsx`)
- 工具类/工具函数：kebab-case (例: `data-formatter.ts`)

### 扩展名约定

- Vue 组件: `.tsx`
- 工具函数/工具类: `.ts`

### 代码风格

- 使用单引号
- 省略分号
- 使用 Linux 换行符 (LF)
- 禁止非必要的代码格式化（仅格式化修改部分）
- `import { foo, bar } from 'xxx'` 导入相关的代码 `{}` 中不论多少内容都缩进为一行

### 代码组织原则

- 避免过早抽象：单行代码（≤100 字符）且使用次数 ≤2 时不应抽离为函数
- 优先使用 Composition API 进行逻辑组织

## 项目结构

```
src/
├── api/           # API 接口层
├── components/    # 通用组件
├── hooks/         # 组合式函数
├── pages/         # 页面组件
├── router/        # 路由配置
├── stores/        # 状态管理 (Pinia)
├── types/         # TypeScript 类型定义
└── utils/         # 工具函数库
```

## 核心依赖

- vue (v3) - 核心框架
- typescript - 类型系统
- pinia - 状态管理
- naive-ui - UI 组件库
- unocss - 原子化 CSS 引擎
- vite - 构建工具
- vue-router - 路由管理
