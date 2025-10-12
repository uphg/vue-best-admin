const XPageContent = defineComponent({
  setup(_, { slots }) {
    return () => (
      <div class="flex flex-col gap-4">
        {{ ...slots }}
      </div>
    )
  },
})

export default XPageContent