export const xTabsContentProps = {
  value: {
    type: String,
    required: true,
  },
}

export const XTabsContent = defineComponent({
  name: 'XTabsContent',
  props: xTabsContentProps,
  setup(props, { slots, attrs }) {
    const activeValue = inject('tabsActiveValue', ref(''))

    const isActive = computed(() => activeValue.value === props.value)

    return () => (
      <div
        v-show={isActive.value}
        class={[
          'x-tabs-content',
          'mt-2 ring-offset-[var(--background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
          attrs.class,
        ]}
        data-state={isActive.value ? 'active' : 'inactive'}
        {...attrs}
      >
        {isActive.value && slots.default?.()}
      </div>
    )
  },
})