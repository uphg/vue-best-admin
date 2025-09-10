export const xTabsTriggerWrapProps = {
  value: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}

export const XTabsTriggerWrap = defineComponent({
  name: 'XTabsTriggerWrap',
  props: xTabsTriggerWrapProps,
  setup(props, { slots, attrs }) {
    const activeValue = inject('tabsActiveValue', ref(''))
    const setActiveValue = inject('tabsSetActiveValue', () => {})

    const isActive = computed(() => activeValue.value === props.value)

    const handleClick = () => {
      if (!props.disabled) {
        setActiveValue(props.value)
      }
    }

    const state = computed(() => ({
      isActive: isActive.value,
      disabled: props.disabled,
      value: props.value,
      dataState: isActive.value ? 'active' : 'inactive',
    }))

    return () => (
      <div
        onClick={handleClick}
        data-state={isActive.value ? 'active' : 'inactive'}
        {...attrs}
      >
        {slots.default?.(state.value)}
      </div>
    )
  },
})