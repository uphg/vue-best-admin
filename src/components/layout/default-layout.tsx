import { defineComponent } from "vue"

const DefaultLayout = defineComponent((_, { slots }) => {
  return () => (
    <div class="default-layout">
      {slots.default?.()}
    </div>
  )
})

export default DefaultLayout
