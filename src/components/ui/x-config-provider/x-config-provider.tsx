import { NConfigProvider } from 'naive-ui'

const XConfigProvider = defineComponent({
  name: 'XConfigProvider',
  props: {
  },
  setup(props, { slots }) {
    return () => (
      <NConfigProvider>
        {slots.default?.()}
      </NConfigProvider>
    )
  },
})

export default XConfigProvider
