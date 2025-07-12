import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './app'
import { enableMocking } from './mocks/mocks'
import router from './router'
import './assets/styles/main.scss'
import 'virtual:uno.css'

enableMocking().then((a) => {
  console.log('a')
  console.log(a)
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)

  app.mount('#app')
})
