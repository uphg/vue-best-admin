import type { MouseEventHandler } from '@/types/intrinsic'
import Tag from '@/components/ui/x-tag/x-tag'

const NavTag = defineComponent({
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    closable: {
      type: Boolean,
      default: false,
    },
    onClick: Function as PropType<MouseEventHandler>,
    onClose: Function as PropType<MouseEventHandler>,
  },
  setup(props, { slots }) {
    return () => {
      const { active, closable, onClick, onClose } = props
      return (
        <Tag hue={active ? 'blue' : ''} closable={closable} onClick={onClick} onClose={onClose}>
          <span>{slots.default?.()}</span>
        </Tag>
      )
    }
  },
})

export default NavTag
