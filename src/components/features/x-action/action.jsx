import { NButton, NIcon } from 'naive-ui'
import { actionMap } from '@/constants/action-button'

const XAction = defineComponent({
  props: {
    type: {
      type: String,
      required: true,
    },
    text: String,
    onClick: Function,
    disabled: Boolean,
    count: [String, Number],
  },
  setup(props, { slots }) {
    const action = actionMap[props.type]
    const text = props.text ?? action.text
    return () => (
      <NButton type={action.type} onClick={props.onClick} disabled={props.disabled}>
        { slots.default
          ? slots.default()
          : (
              <>
                <NIcon class="mr-1">
                  <action.icon />
                </NIcon>
                {props.type === 'batchDelete' ? `${text} (${props.count})` : text}
              </>
            )}
      </NButton>
    )
  },
})

export default XAction