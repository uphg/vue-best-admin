import type { PropType } from 'vue'
import { cn } from '@/utils/class-merge'

const PureInput = defineComponent({
  props: {
    class: {
      type: [String, Array, Object] as PropType<string | (string | Array<string> | Record<string, boolean>)[] | Record<string, boolean>>,
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String as PropType<'text' | 'password' | 'email' | 'number' | 'search'>,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    onInput: {
      type: Function as PropType<(event: Event) => void>,
      default: undefined,
    },
    onFocus: {
      type: Function as PropType<(event: FocusEvent) => void>,
      default: undefined,
    },
    onBlur: {
      type: Function as PropType<(event: FocusEvent) => void>,
      default: undefined,
    },
  },
  emits: ['update:value', 'input', 'focus', 'blur'],
  setup(props, { emit }) {
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      emit('update:value', target.value)
      emit('input', event)
      props.onInput?.(event)
    }

    const handleFocus = (event: FocusEvent) => {
      emit('focus', event)
      props.onFocus?.(event)
    }

    const handleBlur = (event: FocusEvent) => {
      emit('blur', event)
      props.onBlur?.(event)
    }

    return () => (
      <input
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
        disabled={props.disabled}
        readonly={props.readonly}
        class={cn(
          'px-3 py-2 border border-gray-300 rounded-3px text-sm transition-colors duration-200',
          'focus:outline-none',
          'disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500',
          'placeholder:text-gray-400',
          props.class,
        )}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    )
  },
})

export default PureInput
