import type { AttributifyAttributes } from '@unocss/preset-attributify'
import type { AxiosRequestConfig } from 'axios'

declare module 'vue' {
  interface HTMLAttributes extends AttributifyAttributes {}
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    _autoLoading?: boolean
    _mock?: string
  }
}
