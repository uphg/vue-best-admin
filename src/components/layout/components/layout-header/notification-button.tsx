import { NBadge, NButton, NIcon, NList, NListItem, NPopover, NText, NTime } from 'naive-ui'
import IconBell from '~icons/lucide/bell'

interface NotificationItem {
  id: string
  title: string
  content: string
  time: Date
  read: boolean
  type: 'info' | 'warning' | 'error' | 'success'
}

const NotificationButton = defineComponent(() => {
  const notifications = ref<NotificationItem[]>([
    {
      id: '1',
      title: '系统通知',
      content: '您有新的消息需要处理',
      time: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
      type: 'info',
    },
    {
      id: '2',
      title: '任务提醒',
      content: '您的任务即将到期',
      time: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
      type: 'warning',
    },
    {
      id: '3',
      title: '操作成功',
      content: '数据保存成功',
      time: new Date(Date.now() - 1000 * 60 * 60),
      read: true,
      type: 'success',
    },
  ])

  const unreadCount = computed(() =>
    notifications.value.filter(item => !item.read).length,
  )

  const handleMarkAsRead = (id: string) => {
    const notification = notifications.value.find(item => item.id === id)
    if (notification) {
      notification.read = true
    }
  }

  const handleMarkAllAsRead = () => {
    notifications.value.forEach((item) => {
      item.read = true
    })
  }

  const getTypeColor = (type: NotificationItem['type']) => {
    const colors = {
      info: '#1890ff',
      warning: '#faad14',
      error: '#ff4d4f',
      success: '#52c41a',
    }
    return colors[type]
  }

  const renderNotificationList = () => (
    <div class="max-h-96 w-80 overflow-y-auto">
      <div class="p-3 border-b border-gray-200 flex items-center justify-between">
        <NText class="font-medium">通知消息</NText>
        {unreadCount.value > 0 && (
          <NButton
            text
            size="small"
            onClick={handleMarkAllAsRead}
          >
            全部已读
          </NButton>
        )}
      </div>

      {notifications.value.length === 0
        ? (
            <div class="text-gray-500 p-4 text-center">
              暂无通知消息
            </div>
          )
        : (
            <NList>
              {notifications.value.map(item => (
                <NListItem
                  key={item.id}
                  class={`cursor-pointer hover:bg-gray-50 ${!item.read ? 'bg-blue-50' : ''}`}
                  onClick={() => handleMarkAsRead(item.id)}
                >
                  <div class="p-2 flex gap-3 items-start">
                    <div
                      class="mt-2 rounded-full flex-shrink-0 h-2 w-2"
                      style={{ backgroundColor: getTypeColor(item.type) }}
                    />
                    <div class="flex-1 min-w-0">
                      <div class="mb-1 flex items-start justify-between">
                        <NText class={`font-medium ${!item.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {item.title}
                        </NText>
                        {!item.read && (
                          <div class="rounded-full bg-blue-500 flex-shrink-0 h-2 w-2" />
                        )}
                      </div>
                      <NText
                        depth="3"
                        class="text-sm mb-1 line-clamp-2"
                      >
                        {item.content}
                      </NText>
                      <NTime
                        time={item.time}
                        type="relative"
                        class="text-xs text-gray-400"
                      />
                    </div>
                  </div>
                </NListItem>
              ))}
            </NList>
          )}
    </div>
  )

  return () => (
    <NPopover
      trigger="click"
      placement="bottom-end"
      show-arrow={false}
    >
      {{
        trigger: () => (
          <NBadge value={unreadCount.value} show={unreadCount.value > 0}>
            <NButton quaternary circle>
              <NIcon size="18">
                <IconBell />
              </NIcon>
            </NButton>
          </NBadge>
        ),
        default: () => renderNotificationList(),
      }}
    </NPopover>
  )
})

export default NotificationButton
