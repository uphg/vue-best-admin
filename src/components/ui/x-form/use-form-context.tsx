import type { XFormContext } from './types'
import { inject, ref } from 'vue'
import { xFormContextProviderKey } from './provider'

export function useFormContext() {
  return inject<XFormContext>(xFormContextProviderKey, {
    defaultProps: ref({}),
    rules: ref({}),
    autoRules: ref(false),
    formItemWrapClass: ref(''),
  })!
}
