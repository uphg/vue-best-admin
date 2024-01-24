import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'

export let $message: MessageApiInjection | null = null

export function useGlobalMessage() {
  !$message && loadGlobalMessage()
  return { $message }
} 

export function loadGlobalMessage() {
  onScopeDispose(() => {
    $message = useMessage()
  })
}