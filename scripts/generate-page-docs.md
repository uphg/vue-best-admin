# 页面生成器使用文档

## 概述

`@scripts/generate-page.js` 是一个基于配置文件的页面生成器，可以根据 JSON 配置文件自动生成 Vue 3 + TypeScript 的管理页面，包括：

- 页面组件（.vue 文件）
- API 接口文件（.ts 文件）
- 弹框组件（.tsx 文件）

## 安装依赖

确保已安装以下依赖：

```bash
pnpm add eta strip-json-comments commander
```

## 使用方法

### 基本用法

```bash
# 生成页面
node scripts/generate-page.js generate <config-file-path>

# 指定输出目录
node scripts/generate-page.js generate <config-file-path> --output <output-dir>

# 强制覆盖已存在文件
node scripts/generate-page.js generate <config-file-path> --force

# 查看帮助
node scripts/generate-page.js --help
node scripts/generate-page.js generate --help
```

### 参数说明

- `<config-file-path>`: 配置文件路径（必需）
- `-o, --output <path>`: 输出目录，默认为 `src/pages`
- `-f, --force`: 强制覆盖已存在文件，默认为 `false`

## 配置文件格式

配置文件使用 JSONC 格式（支持注释），基本结构如下：

```json
{
  "id": "user",
  "name": "用户管理",
  "type": "table",
  "path": "/users",
  "config": {
    "fields": [...],
    "filterFileds": [...],
    "writeableFields": [...],
    "api": {...}
  }
}
```

### 配置项说明

#### 基本配置

- `id`: 页面标识符，用于生成文件名和组件名
- `name`: 页面显示名称
- `type`: 页面类型，目前支持 `"table"`
- `path`: 路由路径
- `config`: 页面详细配置

#### 字段配置 (fields)

定义表格中显示的字段：

```json
"fields": [
  {
    "key": "id",
    "label": "ID",
    "type": "text",
    "hidden": true
  },
  {
    "key": "name",
    "label": "姓名",
    "type": "text"
  },
  {
    "key": "role",
    "label": "角色",
    "type": "enum",
    "enums": [
      ["admin", { "type": "error", "text": "管理员" }],
      ["editor", { "type": "warning", "text": "编辑者" }],
      ["user", { "type": "info", "text": "普通用户" }]
    ]
  }
]
```

字段属性：

- `key`: 字段键名
- `label`: 字段显示标签
- `type`: 字段类型，支持 `text`、`enum`
- `hidden`: 是否隐藏，默认为 `false`
- `enums`: 枚举值配置（仅当 `type` 为 `enum` 时需要）

#### 筛选字段配置 (filterFileds)

定义可用于搜索筛选的字段：

```json
"filterFileds": ["id", "name", "email"]
```

#### 可写字段配置 (writeableFields)

定义在新增/修改弹框中显示的字段：

```json
"writeableFields": ["name", "email", "role", "status"]
```

#### API 配置 (api)

定义相关的 API 接口：

```json
"api": {
  "query": {
    "url": "/api/users",
    "method": "GET",
    "params": {
      "page": "page",
      "size": "pageSize",
      "sort": "sortField",
      "order": "sortOrder"
    }
  },
  "create": {
    "url": "/api/users",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    }
  },
  "update": {
    "url": "/api/users/:id",
    "method": "PUT",
    "headers": {
      "Content-Type": "application/json"
    }
  },
  "delete": {
    "url": "/api/users/:id",
    "method": "DELETE"
  },
  "batchDelete": {
    "url": "/api/users/batch",
    "method": "DELETE",
    "data": {
      "ids": "selectedIds"
    }
  }
}
```

API 操作类型：

- `query`: 查询列表
- `create`: 创建记录
- `update`: 更新记录
- `delete`: 删除记录
- `batchDelete`: 批量删除

## 生成的文件结构

执行生成命令后，会在输出目录下创建以下文件结构：

```
src/pages/
└── {id}/
    ├── {id}-page.vue          # 页面组件
    ├── {id}-api.ts            # API 接口文件
    └── hooks/
        └── use-{id}-modal.tsx # 弹框组件
```

### 示例：用户管理页面

生成的文件结构：

```
src/pages/
└── user/
    ├── user-page.vue
    ├── user-api.ts
    └── hooks/
        └── use-user-modal.tsx
```

## 功能特性

### 自动生成的功能

1. **表格展示**: 支持分页、排序、列选择
2. **搜索筛选**: 根据配置自动生成搜索表单
3. **CRUD 操作**: 新增、编辑、删除、批量删除
4. **枚举值显示**: 自动处理枚举类型的标签显示
5. **响应式设计**: 使用 Vue 3 Composition API

### 支持的字段类型

- **text**: 文本类型，直接显示
- **enum**: 枚举类型，自动转换为标签显示

### 组件依赖

生成的页面依赖以下组件：

- `@/components/features/x-action/action`
- `@/components/features/x-page-content/x-page-content`
- `@/components/features/x-page-header/x-page-header`
- `@/components/features/x-page/x-page`
- `@/components/features/x-text-action/text-action`
- `@/components/ui/x-form`
- `@/hooks/use-column-selector`
- `@/hooks/use-table/use-table`
- `@/utils/global`

## 示例配置文件

### 用户管理配置

```json
{
  "id": "user",
  "name": "用户管理",
  "type": "table",
  "path": "/users",
  "config": {
    "fields": [
      { "key": "id", "label": "ID", "type": "text", "hidden": true },
      { "key": "name", "label": "姓名", "type": "text" },
      { "key": "email", "label": "邮箱", "type": "text" },
      {
        "key": "role",
        "label": "角色",
        "type": "enum",
        "enums": [
          ["admin", { "type": "error", "text": "管理员" }],
          ["editor", { "type": "warning", "text": "编辑者" }],
          ["user", { "type": "info", "text": "普通用户" }]
        ]
      },
      {
        "key": "status",
        "label": "状态",
        "type": "enum",
        "enums": [
          ["active", { "type": "success", "text": "激活" }],
          ["inactive", { "type": "default", "text": "未激活" }],
          ["pending", { "type": "warning", "text": "待审核" }]
        ]
      },
      { "key": "createdAt", "label": "创建时间", "type": "text" }
    ],
    "filterFileds": ["id", "name", "email"],
    "writeableFields": ["name", "email", "role", "status"],
    "api": {
      "query": {
        "url": "/api/users",
        "method": "GET",
        "params": {
          "page": "page",
          "size": "pageSize",
          "sort": "sortField",
          "order": "sortOrder"
        }
      },
      "create": {
        "url": "/api/users",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        }
      },
      "update": {
        "url": "/api/users/:id",
        "method": "PUT",
        "headers": {
          "Content-Type": "application/json"
        }
      },
      "delete": {
        "url": "/api/users/:id",
        "method": "DELETE"
      },
      "batchDelete": {
        "url": "/api/users/batch",
        "method": "DELETE",
        "data": {
          "ids": "selectedIds"
        }
      }
    }
  }
}
```

### 产品管理配置

```json
{
  "id": "product-management",
  "name": "产品管理",
  "type": "table",
  "path": "/products",
  "config": {
    "fields": [
      { "key": "id", "label": "ID", "type": "text", "hidden": false },
      { "key": "name", "label": "产品名称", "type": "text", "hidden": false },
      { "key": "category", "label": "分类", "type": "enum", "hidden": false, "enums": [["electronics", { "type": "info", "text": "电子产品" }], ["clothing", { "type": "success", "text": "服装" }], ["books", { "type": "warning", "text": "图书" }]] },
      { "key": "price", "label": "价格", "type": "text", "hidden": false },
      { "key": "stock", "label": "库存", "type": "text", "hidden": false },
      { "key": "status", "label": "状态", "type": "enum", "hidden": false, "enums": [["active", { "type": "success", "text": "上架" }], ["inactive", { "type": "default", "text": "下架" }], ["draft", { "type": "warning", "text": "草稿" }]] },
      { "key": "createdAt", "label": "创建时间", "type": "text", "hidden": false },
      { "key": "updatedAt", "label": "更新时间", "type": "text", "hidden": false }
    ],
    "filterFileds": ["name", "category", "status"],
    "writeableFields": ["name", "category", "price", "stock", "status"],
    "api": {
      "query": { "method": "GET", "url": "/api/products" },
      "create": { "method": "POST", "url": "/api/products" },
      "update": { "method": "PUT", "url": "/api/products" },
      "delete": { "method": "DELETE", "url": "/api/products" },
      "batchDelete": { "method": "DELETE", "url": "/api/products/batch", "data": { "ids": true } }
    }
  }
}
```

## 注意事项

1. **文件覆盖**: 使用 `--force` 参数会覆盖已存在的文件，请谨慎使用
2. **依赖组件**: 确保项目中已包含所需的组件和工具函数
3. **API 接口**: 生成的 API 文件需要与后端接口保持一致
4. **路由配置**: 生成的页面需要手动添加到路由配置中
5. **权限控制**: 生成的页面不包含权限控制逻辑，需要根据实际需求添加

## 故障排除

### 常见错误

1. **配置文件不存在**: 检查配置文件路径是否正确
2. **配置文件格式错误**: 检查 JSON 语法是否正确
3. **目录已存在**: 使用 `--force` 参数覆盖或选择其他输出目录
4. **模板渲染错误**: 检查配置文件中的字段是否完整

### 调试方法

1. 使用 `--help` 查看命令帮助
2. 检查配置文件格式是否正确
3. 确认所有依赖组件已正确安装
4. 查看控制台错误信息定位问题

## 扩展开发

如需扩展生成器功能，可以：

1. 修改模板文件（`scripts/templates/` 目录）
2. 添加新的字段类型支持
3. 扩展 API 操作类型
4. 自定义生成逻辑

模板文件说明：

- `page.vue.eta`: 页面组件模板
- `page-script.eta`: 页面脚本模板
- `api.ts.eta`: API 接口模板
- `modal.tsx.eta`: 弹框组件模板
