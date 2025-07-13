import { RouterView } from 'vue-router'

const LayoutInnerLink = defineComponent(() => {
  return () => (
    <div>
      <RouterView></RouterView>
    </div>
  )
})

export default LayoutInnerLink
