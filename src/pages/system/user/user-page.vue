<template>
  <div class="p-4 flex flex-col gap-4">
    <NCard size="small">
      <NForm inline label-placement="left" :show-feedback="false">
        <NGrid :x-gap="12">
          <NFormItemGi label="姓名" :span="6">
            <NInput v-model:value="filterForm.name" placeholder="搜索姓名" clearable>
              <template #prefix>
                <NIcon>
                  <IconSearch />
                </NIcon>
              </template>
            </NInput>
          </NFormItemGi>
          <NFormItemGi label="角色" :span="6">
            <NSelect
              v-model:value="filterForm.role" placeholder="选择角色" class="w-full" clearable :options="[{
                label: '管理员', value: 'admin' }, { label: '编辑者', value: 'editor' }, { label: '普通用户', value: 'any' },
              ]"
            />
          </NFormItemGi>
          <NFormItemGi label="状态" :span="6">
            <NSelect
              v-model:value="filterForm.status" placeholder="选择状态" class="w-full" clearable :options="[{
                label: '激活', value: 'active' }, { label: '未激活', value: 'inactive' }, { label: '待审核', value: 'pending' },
              ]"
            />
          </NFormItemGi>
          <NFormItemGi :span="6">
            <NFlex class="w-full" justify="end">
              <NButton type="primary" @click="handleSearch">
                <NIcon class="mr-1">
                  <IconSearch />
                </NIcon>
                查询
              </NButton>
              <NButton @click="handleReset">
                重置
              </NButton>
            </NFlex>
          </NFormItemGi>
        </NGrid>
      </NForm>
    </NCard>

    <div class="flex flex-col gap-4">
      <div class="flex justify-between">
        <div class="flex gap-3">
          <NButton type="primary" @click="handleCreate">
            <NIcon class="mr-1">
              <IconPlus />
            </NIcon>
            新增
          </NButton>
          <NButton @click="handleImport">
            <NIcon class="mr-1">
              <IconUpload />
            </NIcon>
            导入
          </NButton>
          <NButton @click="handleExport">
            <NIcon class="mr-1">
              <IconDownload />
            </NIcon>
            导出
          </NButton>
          <NButton type="error" :disabled="checkedRowKeys.length === 0" @click="handleBatchDelete">
            <NIcon class="mr-1">
              <IconTrash2 />
            </NIcon>
            批量删除 ({{ checkedRowKeys.length }})
          </NButton>
        </div>
        <ColumnSelector />
      </div>
      <DataTable />
    </div>
    <UserModal />
  </div>
</template>

<script setup lang="tsx">
import { NButton, NCard, NFlex, NForm, NFormItemGi, NGrid, NIcon, NInput, NSelect, NSpace, NTag } from 'naive-ui'
import { ref } from 'vue'
import IconDownload from '~icons/lucide/download'
import IconEdit from '~icons/lucide/edit'
import IconPlus from '~icons/lucide/plus'
import IconSearch from '~icons/lucide/search'
import IconTrash2 from '~icons/lucide/trash-2'
import IconUpload from '~icons/lucide/upload'
import { useColumnSelector } from '@/hooks/use-column-selector'
import { useTable } from '@/hooks/use-table/use-table'
import { $confirm, $dialog, $message } from '@/utils/global'
import { useUserModal } from './hooks/use-user-modal'
import { apiBatchDeleteUser, apiDeleteUser, apiGetUserList } from './user-api'

const roleMap = new Map([
  ['admin', { type: 'error', text: '管理员' }],
  ['editor', { type: 'warning', text: '编辑者' }],
  ['any', { type: 'info', text: '普通用户' }],
])

const statusMap = new Map([
  ['active', { type: 'success', text: '激活' }],
  ['inactive', { type: 'default', text: '未激活' }],
  ['pending', { type: 'warning', text: '待审核' }],
])

const filterForm = ref({
  name: '',
  role: null,
  status: null,
})

const allColumns = ref([
  { title: '复选框', type: 'selection', key: 'selection', fixed: 'left', width: 50 },
  { title: 'ID', key: 'id', width: 80 },
  { title: '姓名', key: 'name', width: 120 },
  { title: '邮箱', key: 'email', width: 200 },
  { title: '角色', key: 'role', width: 100, render(row: any) {
    const { type, text } = roleMap.get(row.role) ?? roleMap.get('any')
    return (
      <NTag type={type} size="small">{text}</NTag>
    )
  } },
  { title: '状态', key: 'status', width: 100, render(row: any) {
    const { type, text } = statusMap.get(row.status) ?? statusMap.get('pending')
    return (
      <NTag type={type} size="small">{text}</NTag>
    )
  } },
  { title: '创建时间', key: 'createdAt', width: 120 },
  {
    title: '操作',
    key: 'actions',
    width: 150,
    fixed: 'right',
    render(row: any) {
      return (
        <NSpace>
          <NButton size="small" type="primary" quaternary onClick={() => handleEdit(row)}>
            <NIcon>
              <IconEdit />
            </NIcon>
          </NButton>
          <NButton size="small" type="error" quaternary onClick={() => handleDelete(row)}>
            <NIcon>
              <IconTrash2 />
            </NIcon>
          </NButton>
        </NSpace>
      )
    },
  },
])

const [ColumnSelector, { columns }] = useColumnSelector(allColumns)

const [DataTable, { reload, checkedRowKeys }] = useTable(columns, { dataSource })
const [UserModal, { open }] = useUserModal({ reload })

async function dataSource({ page, pageSize }) {
  try {
    const res = await apiGetUserList({ page, pageSize, ...filterForm.value })
    return { data: res.data || [], total: res.total || 0 }
  } catch (error) {
    console.error('获取用户列表失败:', error)
    return { data: [], total: 0 }
  }
}

function handleSearch() {
  reload()
}

function handleReset() {
  Object.assign(filterForm.value, {
    name: '',
    role: null,
    status: null,
  })
  reload()
}

function handleCreate() {
  open('create')
}

function handleImport() {
  $confirm.warning({
    title: '确认导入',
    content: '确定要导入用户数据吗？',
    onConfirm: () => {
      // TODO: 实现导入功能
      $message.success('导入成功')
    },
  })
}

function handleExport() {
  $confirm.warning({
    title: '确认导出',
    content: '确定要导出用户数据吗？',
    onConfirm: () => {
      // TODO: 实现导出功能
      $message.success('导出成功')
    },
  })
}

// function handleView(row: any) {
//   $message.info(`查看用户: ${row.name}`)
// }

function handleEdit(row: any) {
  open('update', row)
}

async function handleDelete(row: any) {
  $dialog.warning({
    title: '确认删除',
    content: `确定删除用户 "${row.name}" 吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        await apiDeleteUser(row.id)
        $message.success('删除成功')
        reload()
      } catch (error) {
        $message.error('删除失败')
      }
    },
  })
}

async function handleBatchDelete() {
  if (checkedRowKeys.value.length === 0) return
  $dialog.warning({
    title: '确认批量删除',
    content: `确定删除选中的 ${checkedRowKeys.value.length} 个用户吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        await apiBatchDeleteUser(checkedRowKeys.value)
        $message.success('批量删除成功')
        checkedRowKeys.value = []
        reload()
      } catch (error) {
        $message.error('批量删除失败')
      }
    },
  })
}
</script>
