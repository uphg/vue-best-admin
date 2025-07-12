export async function enableMocking() {
  if (!import.meta.env.DEV) return

  console.log('DEV 模式')
  console.log('启用 Mocking 功能')
  const { worker } = await import('./browser')
  return worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
}
