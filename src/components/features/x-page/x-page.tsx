const XPage = defineComponent({
  setup(_, { slots }) {
    return () => (
      <div class="p-4 flex flex-col gap-4">
        {{ ...slots }}
      </div>
    )
  },
})

export default XPage
