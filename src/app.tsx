import { NConfigProvider, NDialogProvider, NMessageProvider } from 'naive-ui'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

const App = defineComponent(() => {
  return () => (
    <NConfigProvider>
      <NDialogProvider>
        <NMessageProvider>
          <RouterView />
        </NMessageProvider>
      </NDialogProvider>
    </NConfigProvider>
  )
})

export default App
