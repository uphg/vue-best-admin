<template>
  <XPage>
    <XPageHeader />
    <XPageContent>
      <NCard>
        <XForm inline label-placement="left" :show-feedback="false" :grid="{ xGap: 12 }">
          <XFormInput
            v-model:value="filterForm.name"
            label="姓名"
            placeholder="搜索姓名"
            clearable
            span="6"
          >
            <template #prefix>
              <NIcon>
                <IconSearch />
              </NIcon>
            </template>
          </XFormInput>
          <XFormSelect
            v-model:value="filterForm.role"
            :options="[{ label: '管理员', value: 'admin' }, { label: '编辑者', value: 'editor' }, { label: '普通用户', value: 'any' }]"
            label="角色"
            placeholder="选择角色"
            clearable
            span="6"
          />
          <XFormSelect
            v-model:value="filterForm.status"
            :options="[{ label: '激活', value: 'active' }, { label: '未激活', value: 'inactive' }, { label: '待审核', value: 'pending' }]"
            label="状态"
            placeholder="选择状态"
            clearable
            span="6"
          />
          <XFormItem span="6">
            <NFlex justify="end" class="w-full">
              <XAction type="search" @click="handleSearch" />
              <XAction type="reset" @click="handleReset" />
            </NFlex>
          </XFormItem>
        </XForm>
      </NCard>
      <div class="flex justify-between">
        <div class="flex gap-3">
          <XAction type="create" @click="handleCreate" />
          <XAction type="import" @click="handleImport" />
          <XAction type="export" @click="handleExport" />
          <XAction type="batchDelete" :disabled="checkedRowKeys.length === 0" :count="checkedRowKeys.length" @click="handleBatchDelete" />
        </div>
        <ColumnSelector />
      </div>
      <DataTable />
    </XPageContent>
    <UserModal />
  </XPage>
</template>

<script setup lang="tsx">
import { NCard, NFlex, NIcon, NTag } from 'naive-ui'
import { ref } from 'vue'
import IconSearch from '~icons/lucide/search'
import XAction from '@/components/features/x-action/action'
import XPageContent from '@/components/features/x-page-content/x-page-content'
import XPageHeader from '@/components/features/x-page-header/x-page-header'
import XPage from '@/components/features/x-page/x-page'
import XTextAction from '@/components/features/x-text-action/text-action'
import { XForm, XFormInput, XFormSelect } from '@/components/ui/x-form'
import XFormItem from '@/components/ui/x-form/x-form-item'
import { useColumnSelector } from '@/hooks/use-column-selector'
import { useTable } from '@/hooks/use-table/use-table'
import { $confirm, $dialog, $message } from '@/utils/global'
import { useUserModal } from './hooks/use-user-modal'
import { apiBatchDeleteUser, apiDeleteUser, apiGetUserList } from './user-api'

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
        <NFlex>
          <XTextAction type="update" onClick={() => handleEdit(row)} />
          <XTextAction type="delete" onClick={() => handleDelete(row)} />
        </NFlex>
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
