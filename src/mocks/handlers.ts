// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'
import { routeDate } from './common'

export const handlers = [
  // http.get('https://api.example.com/user', () => {
  //   return HttpResponse.json({
  //     id: 'abc-123',
  //     firstName: 'John',
  //     lastName: 'Maverick',
  //   })
  // }),
  http.post<{ username: string, password: string }>('/api/login', ({ params }) => {
    const { username, password } = params
    return HttpResponse.json(username === 'admin' && password === '123456'
      ? { code: 200, data: { token: 'admin-token' } }
      : { code: 401, message: '账号或密码错误' })
  }),
  http.get('/api/route-data', () => {
    return HttpResponse.json(routeDate)
  }),
  http.get('/api/user-info', () => {
    return HttpResponse.json({
      id: '0',
      name: 'Jacker',
      rules: [],
      email: 'jacker@qq.com',
      token: 'alsdhfioasdf',
    })
  }),
  http.get('/api/users', () => HttpResponse.json({
    data: [
      { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin', status: 'active', createdAt: '2024-01-15' },
      { id: 2, name: '李四', email: 'lisi@example.com', role: 'user', status: 'active', createdAt: '2024-01-16' },
      { id: 3, name: '王五', email: 'wangwu@example.com', role: 'editor', status: 'inactive', createdAt: '2024-01-17' },
      { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'user', status: 'pending', createdAt: '2024-01-18' },
      { id: 5, name: '陈七', email: 'chenqi@example.com', role: 'admin', status: 'active', createdAt: '2024-01-19' },
      { id: 6, name: '周八', email: 'zhouba@example.com', role: 'editor', status: 'active', createdAt: '2024-01-20' },
      { id: 7, name: '吴九', email: 'wujiu@example.com', role: 'user', status: 'inactive', createdAt: '2024-01-21' },
      { id: 8, name: '郑十', email: 'zhengshi@example.com', role: 'user', status: 'active', createdAt: '2024-01-22' },
      { id: 9, name: '刘一', email: 'liuyi@example.com', role: 'editor', status: 'pending', createdAt: '2024-01-23' },
      { id: 10, name: '孙二', email: 'suner@example.com', role: 'admin', status: 'active', createdAt: '2024-01-24' },
    ],
    total: 100,
  })),
  http.get('/api/table-demo', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // 1秒延迟
    return HttpResponse.json({
      data: [
        {
          key: 0,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: 1,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['wow'],
        },
        {
          key: 2,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ],
      page: 1,
      total: 100,
    })
  }),
]
