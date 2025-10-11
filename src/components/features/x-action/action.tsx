import type { TagProps } from 'naive-ui'
import type { PropType } from 'vue'
import type { ActionButtonType } from '@/constants/action-button'
import { NButton, NIcon } from 'naive-ui'
import { actionMap } from '@/constants/action-button'

const XAction = defineComponent({
  props: {
    type: {
      type: String as PropType<ActionButtonType>,
      required: true,
    },
    text: String,
    onClick: Function as PropType<() => void>,
    disabled: Boolean,
    count: [String, Number],
  },
  setup(props, { slots }) {
    const action = actionMap[props.type]
    const text = props.text ?? action.text
    return () => (
      <NButton type={action.type as TagProps['type']} onClick={props.onClick} disabled={props.disabled}>
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
