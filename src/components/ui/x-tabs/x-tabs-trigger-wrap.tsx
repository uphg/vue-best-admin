import type { ExtractPropTypes, Ref } from 'vue'

export const xTabsTriggerWrapProps = {
  value: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const

export type XTabsTriggerWrapProps = ExtractPropTypes<typeof xTabsTriggerWrapProps>

export const XTabsTriggerWrap = defineComponent({
  name: 'XTabsTriggerWrap',
  props: xTabsTriggerWrapProps,
  setup(props, { slots, attrs }) {
    const activeValue = inject<Ref<string>>('tabsActiveValue', ref(''))
    const setActiveValue = inject<(value: string) => void>('tabsSetActiveValue', () => {})

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