export const config = {
  id: 'user',
  name: '用户管理',
  type: 'table',
  fields: [
    ['ID', 'id', { hidden: true }],
    ['姓名', 'name'],
    ['邮箱', 'email'],
    ['角色', 'role', {
      type: 'tag',
      options: {
        admin: { type: 'error', text: '管理员' },
        editor: { type: 'warning', text: '编辑者' },
        user: { type: 'info', text: '普通用户' },
      },
    }],
    ['状态', 'status', {
      type: 'tag',
      options: {
        active: { type: 'success', text: '激活' },
        inactive: { type: 'default', text: '未激活' },
        pending: { type: 'warning', text: '待审核' },
      },
    }],
    ['创建时间', 'createdAt', { type: 'date' }],
  ],
  filter: ['id', 'name', 'email'],
  editable: ['name', 'email', 'role', 'status'],
  apis: {
    list: ['get', '/api/users'],
    create: ['post', '/api/users'],
    update: ['put', '/api/users/:id'],
    delete: ['delete', '/api/users/:id'],
    batchDelete: ['delete', '/api/users/batch'],
    export: ['get', '/api/users/export'],
    import: ['post', '/api/users/import'],
  },
}
