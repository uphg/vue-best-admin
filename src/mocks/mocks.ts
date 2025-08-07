export async function enableMocking() {
  if (!import.meta.env.DEV) return

  const { worker } = await import('./browser')
  return worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
    onUnhandledRequest: 'bypass', // 对未处理的请求保持静默
  })
}
