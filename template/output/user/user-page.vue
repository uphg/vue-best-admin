<template>
  <XPage>
    <XPageContent>
      <XCard>
        <template #header>
          <div class="flex justify-between items-center">
            <span class="text-lg font-medium">用户管理管理</span>
            <div class="flex gap-2">
              <PureButton type="primary" @click="handleCreate">
                <template #icon>
                  <NIcon>
                    <IconAdd />
                  </NIcon>
                </template>
                新增
              </PureButton>
              <PureButton type="error" @click="handleBatchDelete" :disabled="!selectedRowKeys.length">
                <template #icon>
                  <NIcon>
                    <IconDelete />
                  </NIcon>
                </template>
                批量删除
              </PureButton>
            </div>
          </div>
        </template>

        <XForm
          ref="filterFormRef"
          :model="filterForm"
          :fields="filterFields"
          :span="6"
          inline
          @submit="handleSearch"
        >
          <template #actions>
            <PureButton type="primary" @click="handleSearch">
              <template #icon>
                <NIcon>
                  <IconSearch />
                </NIcon>
              </template>
              搜索
            </PureButton>
            <PureButton @click="handleReset">
              <template #icon>
                <NIcon>
                  <IconRefresh />
                </NIcon>
              </template>
              重置
            </PureButton>
          </template>
        </XForm>

        <XTable
          ref="tableRef"
          :columns="columns"
          :data="tableData"
          :loading="loading"
          :pagination="pagination"
          :row-key="(row: any) => row.id"
          @update:checked-row-keys="handleSelectionChange"
        >
          <template #actions="{ row }">
            <XActionGroup>
              <XAction type="primary" @click="handleEdit(row)">编辑</XAction>
              <XAction type="error" @click="handleDelete(row)">删除</XAction>
            </XActionGroup>
          </template>
        </XTable>
      </XCard>
    </XPageContent>
  </XPage>

  <UserModal ref="modalRef" @refresh="handleRefresh" />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { NIcon } from 'naive-ui'
import { IconAdd, IconDelete, IconSearch, IconRefresh } from '@/assets/icons'
import { XPage, XPageContent, XCard, XForm, XTable, XActionGroup, XAction } from '@/components'
import { PureButton } from '@/components/ui/pure-button'
import { useUserModal } from './hooks/use-User-modal'
import { apiGetUserList, apiBatchDeleteUser } from './User-api'

const { modalRef } = useUserModal()

// 表格数据
const tableRef = ref()
const tableData = ref<any[]>([])
const loading = ref(false)
const selectedRowKeys = ref<string[]>([])

// 分页
const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  onChange: (page: number) => {
    pagination.page = page
    loadData()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    loadData()
  },
})

// 筛选表单
const filterFormRef = ref()
const filterForm = reactive({
  
  : '',
  
  : '',
  
  : '',
  
})

const filterFields = [
  
  {
    key: '',
    label: '',
    
    type: 'input',
    
    placeholder: '搜索',
    clearable: true,
  },
  
  {
    key: '',
    label: '',
    
    type: 'input',
    
    placeholder: '搜索',
    clearable: true,
  },
  
  {
    key: '',
    label: '',
    
    type: 'input',
    
    placeholder: '搜索',
    clearable: true,
  },
  
]

// 表格列
const columns = [
  { title: '复选框', type: 'selection', key: 'selection', fixed: 'left', width: 50 },
  
  
  
  
  
  { title: '姓名', key: 'name', width: 150 },
  
  
  
  
  
  { title: '邮箱', key: 'email', width: 150 },
  
  
  
  
  
  {
    title: '角色',
    key: 'role',
    width: 100,
    render(row: any) {
      const config = roleMap.get(row.role)
      return h(NTag, { type: config?.type || 'default' }, { default: () => config?.text || row.role })
    },
  },
  
  
  
  
  
  {
    title: '状态',
    key: 'status',
    width: 100,
    render(row: any) {
      const config = statusMap.get(row.status)
      return h(NTag, { type: config?.type || 'default' }, { default: () => config?.text || row.status })
    },
  },
  
  
  
  
  
  { title: '创建时间', key: 'createdAt', width: 150 },
  
  
  
  { title: '操作', key: 'actions', width: 120, fixed: 'right' },
]

// 枚举映射








const roleMap = new Map([
  
  ['admin', { type: 'error', text: '管理员' }],
  
  ['editor', { type: 'warning', text: '编辑者' }],
  
  ['user', { type: 'info', text: '普通用户' }],
  
])



const statusMap = new Map([
  
  ['active', { type: 'success', text: '激活' }],
  
  ['inactive', { type: 'default', text: '未激活' }],
  
  ['pending', { type: 'warning', text: '待审核' }],
  
])





// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...filterForm,
    }
    const res = await apiGetUserList(params)
    tableData.value = res.data.list || res.data
    pagination.itemCount = res.data.total || res.data.length
  } catch (error) {
    console.error('加载数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.page = 1
  loadData()
}

// 重置
const handleReset = () => {
  filterFormRef.value?.resetFields()
  handleSearch()
}

// 刷新
const handleRefresh = () => {
  loadData()
}

// 选择变化
const handleSelectionChange = (keys: string[]) => {
  selectedRowKeys.value = keys
}

// 新增
const handleCreate = () => {
  modalRef.value?.open('create')
}

// 编辑
const handleEdit = (row: any) => {
  modalRef.value?.open('edit', row)
}

// 删除
const handleDelete = async (row: any) => {
  try {
    await $dialog.warning('确认删除', `确定要删除该用户管理吗？`)
    await apiDeleteUser(row.id)
    $message.success('删除成功')
    loadData()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// 批量删除
const handleBatchDelete = async () => {
  try {
    await $dialog.warning('确认删除', `确定要删除选中的 ${selectedRowKeys.value.length} 个用户管理吗？`)
    await apiBatchDeleteUser(selectedRowKeys.value)
    $message.success('批量删除成功')
    selectedRowKeys.value = []
    loadData()
  } catch (error) {
    console.error('批量删除失败:', error)
  }
}

onMounted(() => {
  loadData()
})
</script>