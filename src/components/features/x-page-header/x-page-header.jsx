const XPageHeader = defineComponent({
  props: {
    title: String,
  },
  setup(props, { slots }) {
    const route = useRoute()
    const title = computed(() => props.title ?? route.meta.title)
    return () => (
      <div>
        <div class="font-size-5 flex gap-3 items-center">
          <span class="rounded-2 bg-blue-500 h-1em w-1"></span>
          <span>{title.value}</span>
        </div>
      </div>
    )
  },
})

export default XPageHeader