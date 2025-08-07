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
