import { http } from '@/utils/http-lite'

export function apiGetUserList(params: Record<string, any>) {
  return http.get('/api/users', params)
}

export function apiCreateUser(data: Record<string, any>) {
  return http.post('/api/users', data)
}

export function apiUpdateUser(id: string, data: Record<string, any>) {
  return http.put(`/api/users/${id}`, data)
}

export function apiDeleteUser(id: string) {
  return http.delete(`/api/users/${id}`)
}

export function apiBatchDeleteUser(ids: string[]) {
  return http.delete('/api/users/batch', { ids })
}
