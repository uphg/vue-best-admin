import { XCard } from './index'
import { NButton } from 'naive-ui'

export default defineComponent({
  name: 'XCardDemo',
  setup() {
    return () => (
      <div class="p-6 space-y-6">
        <h2 class="text-2xl font-bold mb-6">XCard 组件示例</h2>
        
        {/* 基础卡片 */}
        <XCard title="基础卡片" class="max-w-md">
          <p>这是一个基础的卡片组件示例。</p>
          <p>支持自定义内容、标题和底部操作。</p>
        </XCard>
        
        {/* 无标题卡片 */}
        <XCard :show-header="false" class="max-w-md">
          <p>这是一个没有标题的卡片。</p>
          <p>通过设置 showHeader={false} 来隐藏标题区域。</p>
        </XCard>
        
        {/* 带底部操作的卡片 */}
        <XCard title="带底部操作" class="max-w-md" :show-footer="true">
          <p>这个卡片有底部操作区域。</p>
          <p>通过 footer 插槽自定义底部内容。</p>
          <template #footer>
            <div class="flex gap-2">
              <NButton size="small">取消</NButton>
              <NButton type="primary" size="small">确认</NButton>
            </div>
          </template>
        </XCard>
        
        {/* 自定义头部 */}
        <XCard class="max-w-md">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">自定义头部</h3>
              <NButton size="tiny">设置</NButton>
            </div>
          </template>
          <p>这个卡片使用自定义头部插槽。</p>
          <p>可以在 header 插槽中放置任意内容。</p>
        </XCard>
        
        {/* 悬停效果 */}
        <XCard title="悬停效果" class="max-w-md" hoverable>
          <p>这个卡片有悬停效果。</p>
          <p>鼠标悬停时阴影会加深。</p>
        </XCard>
        
        {/* 不同尺寸 */}
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">不同尺寸</h3>
          <div class="flex gap-4">
            <XCard title="小尺寸" size="sm" class="flex-1">
              <p>小尺寸卡片内容</p>
            </XCard>
            <XCard title="中尺寸" size="md" class="flex-1">
              <p>中尺寸卡片内容</p>
            </XCard>
            <XCard title="大尺寸" size="lg" class="flex-1">
              <p>大尺寸卡片内容</p>
            </XCard>
          </div>
        </div>
        
        {/* 不同阴影 */}
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">不同阴影</h3>
          <div class="flex gap-4">
            <XCard title="无阴影" shadow="none" class="flex-1">
              <p>无阴影效果</p>
            </XCard>
            <XCard title="小阴影" shadow="sm" class="flex-1">
              <p>小阴影效果</p>
            </XCard>
            <XCard title="大阴影" shadow="lg" class="flex-1">
              <p>大阴影效果</p>
            </XCard>
          </div>
        </div>
        
        {/* 无边框 */}
        <XCard title="无边框" :bordered="false" class="max-w-md">
          <p>这是一个无边框的卡片。</p>
          <p>通过设置 bordered={false} 来移除边框。</p>
        </XCard>
      </div>
    )
  },
})
