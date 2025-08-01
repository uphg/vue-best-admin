import { NBadge, NButton, NIcon } from 'naive-ui'
import IconBell from '~icons/lucide/bell'

const NotificationButton = defineComponent({
  setup() {
    const unreadCount = ref(10)

    return () => (
      <NButton quaternary circle size="medium">
        <NBadge value={unreadCount.value} show={unreadCount.value > 0} dot>
          <NIcon component={IconBell} size="18" />
        </NBadge>
      </NButton>
    )
  },
})

export default NotificationButton
