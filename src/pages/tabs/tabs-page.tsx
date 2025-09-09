import { NCard, NSpace, NButton, NInput, NFormItem, NForm } from 'naive-ui'
import { XTabs, XTabsBar, XTabsContent, XTabsTrigger } from '@/components/ui/x-tab/index'

const TabsDemo = defineComponent(() => {
  const accountForm = ref({
    username: '',
    email: ''
  })
  
  const passwordForm = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // v-model 示例的响应式值
  const currentTab = ref('account')
  const dashboardTab = ref('overview')
  const statusTab = ref('enabled')

  return () => (
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Tabs 组件示例</h1>
      
      <NSpace vertical size="large">
        {/* v-model 示例 */}
        <NCard title="v-model:value 双向绑定">
          <div class="mb-4">
            <p class="mb-2">当前选中的标签: <strong>{currentTab.value}</strong></p>
            <NSpace>
              <NButton onClick={() => currentTab.value = 'account'}>切换到 Account</NButton>
              <NButton onClick={() => currentTab.value = 'password'}>切换到 Password</NButton>
            </NSpace>
          </div>
          <XTabs v-model:value={currentTab.value} class="w-[400px]">
            <XTabsBar class="grid grid-cols-2 w-full">
              <XTabsTrigger value="account">
                Account
              </XTabsTrigger>
              <XTabsTrigger value="password">
                Password
              </XTabsTrigger>
            </XTabsBar>
            <XTabsContent value="account">
              <NCard>
                <p>这是 Account 标签页的内容。当前通过 v-model:value 绑定到: {currentTab.value}</p>
              </NCard>
            </XTabsContent>
            <XTabsContent value="password">
              <NCard>
                <p>这是 Password 标签页的内容。当前通过 v-model:value 绑定到: {currentTab.value}</p>
              </NCard>
            </XTabsContent>
          </XTabs>
        </NCard>

        {/* 基础示例 */}
        <NCard title="基础用法 (defaultValue)">
          <XTabs defaultValue="account" class="w-[400px]">
            <XTabsBar class="grid grid-cols-2 w-full">
              <XTabsTrigger value="account">
                Account
              </XTabsTrigger>
              <XTabsTrigger value="password">
                Password
              </XTabsTrigger>
            </XTabsBar>
            <XTabsContent value="account">
              <NCard>
                <NForm model={accountForm.value}>
                  <NFormItem label="用户名">
                    <NInput v-model:value={accountForm.value.username} placeholder="请输入用户名" />
                  </NFormItem>
                  <NFormItem label="邮箱">
                    <NInput v-model:value={accountForm.value.email} placeholder="请输入邮箱" />
                  </NFormItem>
                  <NFormItem>
                    <NButton type="primary">保存账户信息</NButton>
                  </NFormItem>
                </NForm>
              </NCard>
            </XTabsContent>
            <XTabsContent value="password">
              <NCard>
                <NForm model={passwordForm.value}>
                  <NFormItem label="当前密码">
                    <NInput v-model:value={passwordForm.value.currentPassword} type="password" placeholder="请输入当前密码" />
                  </NFormItem>
                  <NFormItem label="新密码">
                    <NInput v-model:value={passwordForm.value.newPassword} type="password" placeholder="请输入新密码" />
                  </NFormItem>
                  <NFormItem label="确认密码">
                    <NInput v-model:value={passwordForm.value.confirmPassword} type="password" placeholder="请确认新密码" />
                  </NFormItem>
                  <NFormItem>
                    <NButton type="primary">更新密码</NButton>
                  </NFormItem>
                </NForm>
              </NCard>
            </XTabsContent>
          </XTabs>
        </NCard>

        {/* 多标签示例 */}
        <NCard title="多标签示例 (v-model)">
          <div class="mb-4">
            <p class="mb-2">当前仪表板标签: <strong>{dashboardTab.value}</strong></p>
          </div>
          <XTabs v-model:value={dashboardTab.value} class="w-full">
            <XTabsBar class="grid grid-cols-4 w-full">
              <XTabsTrigger value="overview">
                概览
              </XTabsTrigger>
              <XTabsTrigger value="analytics">
                分析
              </XTabsTrigger>
              <XTabsTrigger value="reports">
                报告
              </XTabsTrigger>
              <XTabsTrigger value="notifications">
                通知
              </XTabsTrigger>
            </XTabsBar>
            <XTabsContent value="overview">
              <NCard>
                <h3 class="text-lg font-semibold mb-4">系统概览</h3>
                <p>这里显示系统的整体概览信息，包括关键指标和状态。</p>
              </NCard>
            </XTabsContent>
            <XTabsContent value="analytics">
              <NCard>
                <h3 class="text-lg font-semibold mb-4">数据分析</h3>
                <p>这里显示详细的数据分析图表和统计信息。</p>
              </NCard>
            </XTabsContent>
            <XTabsContent value="reports">
              <NCard>
                <h3 class="text-lg font-semibold mb-4">报告中心</h3>
                <p>这里显示各种报告和导出功能。</p>
              </NCard>
            </XTabsContent>
            <XTabsContent value="notifications">
              <NCard>
                <h3 class="text-lg font-semibold mb-4">通知设置</h3>
                <p>这里可以配置各种通知选项和偏好设置。</p>
              </NCard>
            </XTabsContent>
          </XTabs>
        </NCard>

        {/* 禁用状态示例 */}
        <NCard title="禁用状态 (v-model)">
          <div class="mb-4">
            <p class="mb-2">当前状态标签: <strong>{statusTab.value}</strong></p>
            <NSpace>
              <NButton onClick={() => statusTab.value = 'enabled'}>切换到可用</NButton>
              <NButton onClick={() => statusTab.value = 'readonly'}>切换到只读</NButton>
              <NButton disabled>禁用标签无法点击</NButton>
            </NSpace>
          </div>
          <XTabs v-model:value={statusTab.value} class="w-[400px]">
            <XTabsBar class="grid grid-cols-3 w-full">
              <XTabsTrigger value="enabled">
                可用
              </XTabsTrigger>
              <XTabsTrigger value="disabled" disabled>
                禁用
              </XTabsTrigger>
              <XTabsTrigger value="readonly">
                只读
              </XTabsTrigger>
            </XTabsBar>
            <XTabsContent value="enabled">
              <NCard>
                <p>这是一个可用的标签页内容。</p>
              </NCard>
            </XTabsContent>
            <XTabsContent value="disabled">
              <NCard>
                <p>这个标签页被禁用了，无法访问。</p>
              </NCard>
            </XTabsContent>
            <XTabsContent value="readonly">
              <NCard>
                <p>这是一个只读的标签页内容。</p>
              </NCard>
            </XTabsContent>
          </XTabs>
        </NCard>
      </NSpace>
    </div>
  )
})

export default TabsDemo
