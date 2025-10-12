import { computed, pick } from 'lodash-es'
import { slotsMap } from './common.js'

export function useFormSlots(slots, fieldType) {
  return computed(() => pick(slots, slotsMap[fieldType]))
}