export let $loading: { visible: boolean, message: string | null, open: (message?: string) => void, close: () => void } | null = null 

const defaultMessage = '加载中...'

export function useGlobalLoading() {
  $loading = $loading ?? reactive({
    visible: false,
    message: null as string | null,
    open,
    close
  })

  return { $loading }
}

function open(message?: string) {
  $loading!.message = message ?? defaultMessage
  $loading!.visible = true
}

function close() {
  $loading!.message = null
  $loading!.visible = false
}