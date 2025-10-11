# 页面生成脚本使用说明

## 概述

这个 Node.js 脚本可以根据 JSONC 配置文件自动生成 Vue 3 后台管理系统的标准 CRUD 页面，包括：

- API 接口文件
- Vue 页面组件（包含搜索、表格、操作等功能）
- Modal Hook 文件（用于新增/编辑弹窗）

## 使用方法

```bash
node template/generate-page.cjs <配置文件路径>
```

## 配置文件格式

配置文件使用 JSONC 格式（支持注释），基本结构如下：

```jsonc
{
  "id": "user-management", // 页面唯一标识（会转换为目录名）
  "name": "用户管理", // 页面中文名称
  "type": "table", // 页面类型（目前只支持 table）
  "path": "/users", // 路由路径
  "config": {
    "fields": [ // 字段定义
      {
        "key": "id",
        "label": "ID",
        "type": "text",
        "hidden": true // 是否在表格中隐藏
      },
      {
        "key": "name",
        "label": "姓名",
        "type": "text"
      },
      {
        "key": "role",
        "label": "角色",
        "type": "enum", // 枚举类型
        "enums": [ // 枚举值配置
          ["admin", { "type": "error", "text": "管理员" }],
          ["editor", { "type": "warning", "text": "编辑者" }],
          ["user", { "type": "info", "text": "普通用户" }]
        ]
      }
    ],
    "filterFileds": ["id", "name"], // 可搜索筛选的字段
    "writeableFields": ["name", "role", "status"], // 新增/修改弹框中展示的字段
    "api": { // API 接口配置
      "query": {
        "url": "/api/users",
        "method": "POST",
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
      },
      "export": {
        "url": "/api/users/export",
        "method": "GET",
        "responseType": "blob"
      },
      "import": {
        "url": "/api/users/import",
        "method": "GET",
        "responseType": "blob"
      }
    }
  }
}
```

## 字段类型支持

- `text`: 文本字段
- `number`: 数字字段
- `date`: 日期字段
- `datetime`: 日期时间字段
- `enum`: 枚举字段（需要配置 enums 选项）
- `boolean`: 布尔字段
- `email`: 邮箱字段
- `phone`: 电话字段
- `url`: 链接字段
- `textarea`: 多行文本
- `select`: 下拉选择
- `radio`: 单选
- `checkbox`: 多选
- `file`: 文件上传
- `image`: 图片上传

## 生成的文件结构

执行脚本后，会在 `template/output/` 目录下生成对应的页面结构：

```
template/output/user/
├── user-api.ts              # API 接口文件
├── user-page.vue           # Vue 页面组件
└── hooks/
    └── use-user-modal.tsx  # Modal Hook 文件
```

## 生成的功能特性

1. **搜索过滤**: 根据 `filterFileds` 配置自动生成搜索表单
2. **数据表格**: 根据 `fields` 配置自动生成表格列
3. **CRUD 操作**: 新增、编辑、删除、批量删除
4. **导入导出**: 提供导入导出功能框架（需要自行实现具体逻辑）
5. **列选择器**: 可以自定义显示的表格列
6. **分页排序**: 支持分页和排序功能
7. **表单验证**: 根据 `writeableFields` 自动生成表单验证

## 命名规则

- 页面目录名：从 `id` 字段中去掉 `-management` 后缀
- API 函数名：`api + 首字母大写的实体名 + 操作类型`
- 文件名：`小写实体名-文件类型.扩展名`

## 注意事项

1. 目前只支持生成 `table` 类型的页面
2. 导入导出功能需要根据实际 API 自行实现
3. 生成的代码遵循项目的代码规范和命名约定
4. 如果目标文件已存在，会被覆盖，请谨慎使用

## 示例

```bash
# 根据用户配置生成页面
node scripts/generate-page.cjs template/config/pages/user.jsonc

# 根据其他配置生成页面
node scripts/generate-page.cjs template/config/pages/product.jsonc
```

生成完成后，还需要在路由配置中添加相应的路由才能正常访问页面。
