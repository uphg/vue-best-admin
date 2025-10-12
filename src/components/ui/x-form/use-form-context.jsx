import { inject, ref } from 'vue'
import { xFormContextProviderKey } from './provider.js'

export function useFormContext() {
  return inject(xFormContextProviderKey, {
    defaultProps: ref({}),
    rules: ref({}),
    autoRules: ref(false),
    formItemWrapClass: ref(''),
  })
}