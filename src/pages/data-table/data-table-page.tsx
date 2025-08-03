import { NButton, NCard, NForm, NFormItemRow, NIcon, NInput, NSelect, NSpace } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'
import IconSearch from '~icons/lucide/search'

const DataTablePage = defineComponent(() => {
  const queryForm = ref({
    name: '',
    roles: [],
    status: null,
  })

  return () => (
    <div>
      {/* 查询表单区域 */}
      <NCard size="small">
        <NForm inline label-placement="left">
          <NFormItemRow label="关键词">
            <NInput
              v-model:value={queryForm.value.name}
              placeholder="搜索姓名或邮箱"
              clearable
              style={{ width: '200px' }}
              v-slots={{
                prefix: () => h(NIcon, null, () => h(IconSearch)),
              }}
            />
          </NFormItemRow>
          <NFormItemRow label="角色">
            <NSelect
              v-model:value={selectedRole.value}
              placeholder="选择角色"
              clearable
              options={[
                { label: '管理员', value: 'admin' },
                { label: '编辑者', value: 'editor' },
                { label: '普通用户', value: 'user' },
              ]}
              style={{ width: '120px' }}
            />
          </NFormItemRow>
          <NFormItemRow label="状态">
            <NSelect
              v-model:value={selectedStatus.value}
              placeholder="选择状态"
              clearable
              options={[
                { label: '激活', value: 'active' },
                { label: '未激活', value: 'inactive' },
                { label: '待审核', value: 'pending' },
              ]}
              style={{ width: '120px' }}
            />
          </NFormItemRow>
          <NFormItemRow>
            <NSpace>
              <NButton type="primary" onClick={handleSearch}>
                <NIcon class="mr-1">
                  <IconSearch />
                </NIcon>
                查询
              </NButton>
              <NButton onClick={handleReset}>重置</NButton>
            </NSpace>
          </NFormItemRow>
        </NForm>
      </NCard>
    </div>
  )
})

export default DataTablePage
