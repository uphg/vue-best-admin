import type { AxiosRequestConfig } from 'axios'

export type Resource<T> = {
  resource: T
};

export type Resources<T = any> = {
  resources: T[]
  pager: {
    page: number
    per_page: number
    count: number
  }
}

export type User = {
  id: number,
  username: string,
  email: string
}

export type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue }
