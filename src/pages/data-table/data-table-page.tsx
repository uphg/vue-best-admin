import type { DataTableColumn } from 'naive-ui'
import { NButton, NCard, NForm, NFormItemGi, NGrid, NIcon, NInput, NSelect, NSpace, NTag, useMessage } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'
import IconSearch from '~icons/lucide/search'
import { useDataTable } from '@/hooks/use-data-table'
import { http } from '@/utils/http-lite'

interface TableDemo { data: any[], page: number, total: number }

const DataTablePage = defineComponent(() => {
  const message = useMessage()
  const queryForm = ref({
    name: '',
    roles: [],
    status: null,
  })

  const columns = ref<DataTableColumn[]>([
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Age',
      key: 'age',
    },
    {
      title: 'Address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      render(row: any) {
        const tags = row.tags.map((tagKey: string) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px',
              },
              type: 'info',
              bordered: false,
            },
            {
              default: () => tagKey,
            },
          )
        })
        return tags
      },
    },
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => message.info(`send mail to ${row.name}`),
          },
          { default: () => 'Send Email' },
        )
      },
    },
  ])

  const [Table] = useDataTable(columns, { dataSource: onDataSource })

  function onDataSource({ page, pageSize }: any) {
    return http.get<TableDemo>('/api/table-demo', { page, pageSize, ...queryForm.value }).then(res => ({ data: res.data.data, page: res.data.page, total: res.data.total }))
  }

  function handleSearch() {

  }

  function handleReset() {

  }

  return () => (
    <div class="p-5 flex flex-col gap-4">
      <NCard size="small">
        <NForm inline label-placement="left" showFeedback={false}>
          <NGrid xGap={12}>
            <NFormItemGi span={6} label="关键词">
              <NInput
                v-model:value={queryForm.value.name}
                placeholder="搜索姓名或邮箱"
                clearable
                v-slots={{
                  prefix: () => h(NIcon, null, () => h(IconSearch)),
                }}
              />
            </NFormItemGi>
            <NFormItemGi span={6} label="角色">
              <NSelect
                v-model:value={queryForm.value.roles}
                placeholder="选择角色"
                clearable
                options={[
                  { label: '管理员', value: 'admin' },
                  { label: '编辑者', value: 'editor' },
                  { label: '普通用户', value: 'user' },
                ]}
              />
            </NFormItemGi>
            <NFormItemGi span={6} label="状态">
              <NSelect
                v-model:value={queryForm.value.status}
                placeholder="选择状态"
                clearable
                options={[
                  { label: '激活', value: 'active' },
                  { label: '未激活', value: 'inactive' },
                  { label: '待审核', value: 'pending' },
                ]}
              />
            </NFormItemGi>
            <NFormItemGi span={6}>
              <NSpace>
                <NButton type="primary" onClick={handleSearch}>
                  <NIcon class="mr-1">
                    <IconSearch />
                  </NIcon>
                  查询
                </NButton>
                <NButton onClick={handleReset}>重置</NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCard>
      <NCard>
        <Table />
      </NCard>
    </div>
  )
})

export default DataTablePage
