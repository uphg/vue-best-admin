import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

const App = defineComponent(() => {
  return () => (
    <NConfigProvider>
      <NMessageProvider>
        <RouterView />
      </NMessageProvider>
    </NConfigProvider>
  )
})

export default App
