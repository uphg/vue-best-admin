import type { RouteRecordRaw } from 'vue-router'
import { assign } from 'lodash-es'
import { defineStore } from 'pinia'

export type UserState = Partial<{
  id: string
  name: string
  rules: string[]
  email: string
  token: string
  rawRoutes: RouteRecordRaw[]
}>

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    id: '',
    name: '',
    rules: [],
    email: '',
    token: '',
    rawRoutes: [],

  })

  function set(data: UserState) {
    console.log('data')
    console.log(data)
    console.log('state')
    console.log(state)
    assign(state, data)
  }

  function clear() {
    assign(state, {
      id: '',
      name: '',
      rules: [],
      email: '',
      token: '',
      rawRoutes: [],
    })
  }

  return { ...toRefs(state), set, clear }
})

export type UserStore = ReturnType<typeof useUserStore>
