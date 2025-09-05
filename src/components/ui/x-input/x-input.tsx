const XInput = defineComponent({
  name: 'XInput',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value', 'input', 'focus', 'blur'],
  setup(props, { emit }) {
    const inputRef = ref(null)

    return () => (
      <input
        ref={inputRef}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onInput={}
        onFocus={}
        onBlur={}
      />
    )
  },
})
