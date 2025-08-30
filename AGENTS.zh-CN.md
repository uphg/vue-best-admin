# Vue-Best-Admin 开发指南

## 基础信息

- **框架**: Vue 3 + TSX + Composition API
- **构建**: Vite
- **包管理**: pnpm
- **运行环境**: Node.js v20+, Ubuntu
- **代码规范**: Conventional Commits

## 开发命令

```bash
pnpm install    # 安装依赖
pnpm dev        # 开发服务器
pnpm build      # 生产构建
pnpm test:unit  # 单元测试
pnpm type-check # 类型检查
pnpm lint       # 代码检查
```

## 规范指南

- **文件命名**: kebab-case (`user-profile.tsx`)
- **组件扩展名**: `.tsx`
- **工具类扩展名**: `.ts`
- **代码风格**: 单引号，无分号

## 目录结构

```
src/
├── api/         # API 接口
├── components/  # 组件
├── hooks/       # 组合式函数
├── pages/       # 页面组件
├── router/      # 路由配置
├── stores/      # 状态管理
├── types/       # 类型定义
└── utils/       # 工具函数
```

## 核心依赖

- **Vue 3** - 框架核心
- **TypeScript** - 类型支持
- **Pinia** - 状态管理
- **Naive UI** - UI组件库
- **UnoCSS** - 样式引擎
