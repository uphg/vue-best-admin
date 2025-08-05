import { NButton, NCard, NCheckbox, NDataTable, NDropdown, NForm, NFormItemGi, NGrid, NIcon, NInput, NPagination, NSelect, NSpace, NTag } from 'naive-ui'
import { computed, defineComponent, h, ref } from 'vue'
import IconColumns from '~icons/lucide/columns'
import IconDownload from '~icons/lucide/download'
import IconEdit from '~icons/lucide/edit'
import IconEye from '~icons/lucide/eye'
import IconPlus from '~icons/lucide/plus'
import IconSearch from '~icons/lucide/search'
import IconTrash2 from '~icons/lucide/trash-2'
import IconUpload from '~icons/lucide/upload'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'editor'
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  avatar?: string
}

const TablePage = defineComponent({
  name: 'TablePage',
  setup() {
    const searchQuery = ref('')
    const selectedRole = ref<string | null>(null)
    const selectedStatus = ref<string | null>(null)
    const pagination = ref({
      page: 1,
      pageSize: 10,
      showSizePicker: true,
      pageSizes: [10, 20, 50, 100],
    })
    const checkedRowKeys = ref<number[]>([])
    const visibleColumns = ref<string[]>(['id', 'name', 'email', 'role', 'status', 'createdAt', 'actions'])

    // 模拟数据
    const mockData: User[] = [
      { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin', status: 'active', createdAt: '2024-01-15' },
      { id: 2, name: '李四', email: 'lisi@example.com', role: 'user', status: 'active', createdAt: '2024-01-16' },
      { id: 3, name: '王五', email: 'wangwu@example.com', role: 'editor', status: 'inactive', createdAt: '2024-01-17' },
      { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'user', status: 'pending', createdAt: '2024-01-18' },
      { id: 5, name: '陈七', email: 'chenqi@example.com', role: 'admin', status: 'active', createdAt: '2024-01-19' },
      { id: 6, name: '周八', email: 'zhouba@example.com', role: 'editor', status: 'active', createdAt: '2024-01-20' },
      { id: 7, name: '吴九', email: 'wujiu@example.com', role: 'user', status: 'inactive', createdAt: '2024-01-21' },
      { id: 8, name: '郑十', email: 'zhengshi@example.com', role: 'user', status: 'active', createdAt: '2024-01-22' },
      { id: 9, name: '刘一', email: 'liuyi@example.com', role: 'editor', status: 'pending', createdAt: '2024-01-23' },
      { id: 10, name: '孙二', email: 'suner@example.com', role: 'admin', status: 'active', createdAt: '2024-01-24' },
      { id: 11, name: '钱三', email: 'qiansan@example.com', role: 'user', status: 'active', createdAt: '2024-01-25' },
      { id: 12, name: '冯四', email: 'fengsi@example.com', role: 'editor', status: 'inactive', createdAt: '2024-01-26' },
      { id: 13, name: '褚五', email: 'chuwu@example.com', role: 'user', status: 'pending', createdAt: '2024-01-27' },
      { id: 14, name: '卫六', email: 'weiliu@example.com', role: 'admin', status: 'active', createdAt: '2024-01-28' },
      { id: 15, name: '蒋七', email: 'jiangqi@example.com', role: 'user', status: 'active', createdAt: '2024-01-29' },
    ]

    // 过滤后的数据
    const filteredData = computed(() => {
      let result = mockData

      if (searchQuery.value) {
        result = result.filter(item =>
          item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
          || item.email.toLowerCase().includes(searchQuery.value.toLowerCase()),
        )
      }

      if (selectedRole.value) {
        result = result.filter(item => item.role === selectedRole.value)
      }

      if (selectedStatus.value) {
        result = result.filter(item => item.status === selectedStatus.value)
      }

      return result
    })

    // 分页后的数据
    const paginatedData = computed(() => {
      const start = (pagination.value.page - 1) * pagination.value.pageSize
      const end = start + pagination.value.pageSize
      return filteredData.value.slice(start, end)
    })

    const handlePageChange = (page: number) => {
      pagination.value.page = page
    }

    const handlePageSizeChange = (pageSize: number) => {
      pagination.value.pageSize = pageSize
      pagination.value.page = 1
    }

    const handleSearch = () => {
      pagination.value.page = 1
    }

    const handleReset = () => {
      searchQuery.value = ''
      selectedRole.value = null
      selectedStatus.value = null
      pagination.value.page = 1
    }

    const handleView = (row: User) => {
      console.log('查看用户:', row)
    }

    const handleEdit = (row: User) => {
      console.log('编辑用户:', row)
    }

    const handleDelete = (row: User) => {
      console.log('删除用户:', row)
    }

    const handleBatchDelete = () => {
      console.log('批量删除用户:', checkedRowKeys.value)
    }

    const handleAdd = () => {
      console.log('新增用户')
    }

    const handleImport = () => {
      console.log('导入用户')
    }

    const handleExport = () => {
      console.log('导出用户')
    }

    const allColumns = [
      {
        title: 'ID',
        key: 'id',
        width: 80,
        sortOrder: undefined,
        sorter: 'default',
      },
      {
        title: '姓名',
        key: 'name',
        width: 120,
        sortOrder: undefined,
        sorter: 'default',
      },
      {
        title: '邮箱',
        key: 'email',
        width: 200,
      },
      {
        title: '角色',
        key: 'role',
        width: 100,
        render: (row: User) => {
          const typeMap = {
            admin: 'error',
            editor: 'warning',
            user: 'info',
          }
          const textMap = {
            admin: '管理员',
            editor: '编辑者',
            user: '普通用户',
          }
          return h(NTag, {
            type: typeMap[row.role as keyof typeof typeMap] as any,
            size: 'small',
          }, () => textMap[row.role as keyof typeof textMap])
        },
      },
      {
        title: '状态',
        key: 'status',
        width: 100,
        render: (row: User) => {
          const typeMap = {
            active: 'success',
            inactive: 'default',
            pending: 'warning',
          }
          const textMap = {
            active: '激活',
            inactive: '未激活',
            pending: '待审核',
          }
          return h(NTag, {
            type: typeMap[row.status as keyof typeof typeMap] as any,
            size: 'small',
          }, () => textMap[row.status as keyof typeof textMap])
        },
      },
      {
        title: '创建时间',
        key: 'createdAt',
        width: 120,
        sortOrder: undefined,
        sorter: 'default',
      },
      {
        title: '操作',
        key: 'actions',
        width: 150,
        fixed: 'right',
        render: (row: User) => {
          return h(NSpace, null, () => [
            h(NButton, {
              size: 'small',
              type: 'info',
              quaternary: true,
              onClick: () => handleView(row),
            }, () => [h(NIcon, null, () => h(IconEye))]),
            h(NButton, {
              size: 'small',
              type: 'primary',
              quaternary: true,
              onClick: () => handleEdit(row),
            }, () => [h(NIcon, null, () => h(IconEdit))]),
            h(NButton, {
              size: 'small',
              type: 'error',
              quaternary: true,
              onClick: () => handleDelete(row),
            }, () => [h(NIcon, null, () => h(IconTrash2))]),
          ])
        },
      },
    ]

    const columns = computed(() => {
      const filteredColumns = allColumns.filter(col => visibleColumns.value.includes(col.key))
      return [
        {
          type: 'selection',
          fixed: 'left',
          width: 50,
        },
        ...filteredColumns,
      ]
    })

    const columnOptions = computed(() => allColumns.map(col => ({
      label: col.title,
      value: col.key,
      checked: visibleColumns.value.includes(col.key),
    })))

    const handleColumnToggle = (value: string[]) => {
      visibleColumns.value = value
    }

    return () => (
      <div class="p-6">
        <NSpace vertical size="large">
          {/* 查询表单区域 */}
          <NCard size="small">
            <NForm inline label-placement="left" show-feedback={false}>
              <NGrid x-gap={12}>
                <NFormItemGi label="关键词" span={6}>
                  <NInput
                    v-model:value={searchQuery.value}
                    placeholder="搜索姓名或邮箱"
                    clearable
                    style={{ width: '200px' }}
                    v-slots={{
                      prefix: () => h(NIcon, null, () => h(IconSearch)),
                    }}
                  />
                </NFormItemGi>
                <NFormItemGi label="角色" span={6}>
                  <NSelect
                    v-model:value={selectedRole.value}
                    placeholder="选择角色"
                    class="w-full"
                    clearable
                    options={[
                      { label: '管理员', value: 'admin' },
                      { label: '编辑者', value: 'editor' },
                      { label: '普通用户', value: 'user' },
                    ]}
                  />
                </NFormItemGi>
                <NFormItemGi label="状态" span={6}>
                  <NSelect
                    v-model:value={selectedStatus.value}
                    placeholder="选择状态"
                    class="w-full"
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

          {/* 表格区域 */}
          <NCard>
            <NSpace vertical>
              {/* 表格操作栏 */}
              <div class="flex justify-between">
                {/* 左侧操作按钮 */}
                <NSpace>
                  <NButton type="primary" onClick={handleAdd}>
                    <NIcon class="mr-1">
                      <IconPlus />
                    </NIcon>
                    新增
                  </NButton>
                  <NButton onClick={handleImport}>
                    <NIcon class="mr-1">
                      <IconUpload />
                    </NIcon>
                    导入
                  </NButton>
                  <NButton onClick={handleExport}>
                    <NIcon class="mr-1">
                      <IconDownload />
                    </NIcon>
                    导出
                  </NButton>
                  {checkedRowKeys.value.length > 0 && (
                    <NButton type="error" onClick={handleBatchDelete}>
                      <NIcon class="mr-1">
                        <IconTrash2 />
                      </NIcon>
                      批量删除 ({checkedRowKeys.value.length})
                    </NButton>
                  )}
                </NSpace>

                {/* 右侧列控制 */}
                <NDropdown
                  trigger="click"
                  options={columnOptions.value.map(option => ({
                    label: () => h(NCheckbox, {
                      checked: option.checked,
                      onUpdateChecked: (checked: boolean) => {
                        if (checked) {
                          handleColumnToggle([...visibleColumns.value, option.value])
                        } else {
                          handleColumnToggle(visibleColumns.value.filter(v => v !== option.value))
                        }
                      },
                    }, () => option.label),
                    key: option.value,
                  }))}
                >
                  <NButton>
                    <NIcon class="mr-1">
                      <IconColumns />
                    </NIcon>
                    列设置
                  </NButton>
                </NDropdown>
              </div>

              {/* 数据表格 */}
              <NDataTable
                columns={columns.value as any}
                data={paginatedData.value}
                pagination={false}
                row-key={(row: User) => row.id as any}
                checked-row-keys={checkedRowKeys.value}
                onUpdateCheckedRowKeys={(rowKeys: any[]) => {
                  checkedRowKeys.value = rowKeys as number[]
                }}
                max-height={400}
                scroll-x={1000}
              />

              {/* 分页 */}
              <div class="flex justify-end">
                <NPagination
                  v-model:page={pagination.value.page}
                  v-model:page-size={pagination.value.pageSize}
                  page-count={Math.ceil(filteredData.value.length / pagination.value.pageSize)}
                  show-size-picker
                  page-sizes={pagination.value.pageSizes}
                  onUpdatePage={handlePageChange}
                  onUpdatePageSize={handlePageSizeChange}
                  show-quick-jumper
                />
              </div>
            </NSpace>
          </NCard>
        </NSpace>
      </div>
    )
  },
})

export default TablePage
