import { NAvatar, NDropdown } from 'naive-ui'
import IconFileText from '~icons/lucide/file-text'
import IconGithub from '~icons/lucide/github'
import IconLogOut from '~icons/lucide/log-out'
import IconUser from '~icons/lucide/user'

const UserDropdown = defineComponent({
  setup() {
    const options = [
      {
        label: '个人资料',
        key: 'profile',
        icon: () => <IconUser class="h-4 w-4" />,
      },
      {
        label: '文档',
        key: 'docs',
        icon: () => <IconFileText class="h-4 w-4" />,
      },
      {
        label: 'GitHub',
        key: 'github',
        icon: () => <IconGithub class="h-4 w-4" />,
      },
      {
        type: 'divider',
        key: 'divider',
      },
      {
        label: '退出登录',
        key: 'logout',
        icon: () => <IconLogOut class="h-4 w-4" />,
      },
    ]

    const handleSelect = (key: string) => {
      switch (key) {
        case 'profile':
          // TODO: 跳转到个人资料页面
          break
        case 'docs':
          // TODO: 打开文档页面
          break
        case 'github':
          window.open('https://github.com/vue-best-admin/vue-best-admin', '_blank')
          break
        case 'logout':
          // TODO: 实现退出登录逻辑
          break
      }
    }

    return () => (
      <NDropdown
        options={options}
        onSelect={handleSelect}
        trigger="hover"
        placement="bottom-end"
      >
        <NAvatar
          round
          size="medium"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          class="cursor-pointer"
        />
      </NDropdown>
    )
  },
})

export default UserDropdown
