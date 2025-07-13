const tokenKey = 'admin-token'

export function getToken() {
  return localStorage.getItem(tokenKey)
}

export function setToken(value: string) {
  localStorage.setItem(tokenKey, value)
}

export function removeToken() {
  localStorage.removeItem(tokenKey)
}
