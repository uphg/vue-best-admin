import type { PropType } from 'vue'
import { cn } from '@/utils/class-merge'

const options = {
  props: {
    class: {
      type: [String, Array, Object] as PropType<string | (string | Array<string> | Record<string, boolean>)[] | Record<string, boolean>>,
    },
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>,
      default: undefined,
    },
  },
}

const PureButton = defineComponent((props, { slots }) => {
  return () => (
    <button
      {...props}
      class={cn('text-black p-1 rounded-3px border-none bg-transparent cursor-pointer transition-colors duration-300 focus:outline-none active:bg-neutral-800/13 focus:bg-neutral-800/9 hover:bg-neutral-800/9', props.class)}
    >
      {slots.default?.()}
    </button>
  )
}, options)

export default PureButton
