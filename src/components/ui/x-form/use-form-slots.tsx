import type { SetupContext } from 'vue'
import type { InputElement } from '@/types/form'
import { pick } from 'lodash-es'
import { slotsMap } from './common'

export function useFormSlots(slots: SetupContext<any[], any>['slots'], fieldType: InputElement) {
  return computed(() => pick(slots, slotsMap[fieldType]))
}
