<template>
  <div class="demo-container">
    <h3>useTable 演示</h3>
    <NCard>
      <Table />
      <div style="margin-top: 16px">
        <NButton type="primary" @click="handleRefresh">
          刷新数据
        </NButton>
        <NButton style="margin-left: 8px" @click="handleAddData">
          添加数据
        </NButton>
      </div>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import type { DataTableColumn } from 'naive-ui'
import { NButton, NCard } from 'naive-ui'
import { shallowRef } from 'vue'
import { useTable } from '../../../src/hooks/use-data-table'

// 设置演示数据
const columns = shallowRef<DataTableColumn[]>([
  {
    title: 'ID',
    key: 'id',
    width: 80,
  },
  {
    title: '姓名',
    key: 'name',
    width: 120,
  },
  {
    title: '年龄',
    key: 'age',
    width: 80,
    sorter: true,
  },
  {
    title: '邮箱',
    key: 'email',
    width: 200,
  },
  {
    title: '地址',
    key: 'address',
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render: (row: any) => {
      return row.status === 'active' ? '活跃' : '未激活'
    },
  },
])

let counter = 1

async function fetchData({ page, pageSize }: { page: number, pageSize: number }) {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 800))

  const total = 28
  const data = Array.from({ length: Math.min(pageSize, total - (page - 1) * pageSize) }, (_, i) => {
    const id = (page - 1) * pageSize + i + 1
    return {
      id,
      name: `用户${id}`,
      age: Math.floor(Math.random() * 30) + 20,
      email: `user${id}@example.com`,
      address: `北京市朝阳区${id}号`,
      status: Math.random() > 0.5 ? 'active' : 'inactive',
    }
  })

  return {
    data,
    total,
  }
}

const [Table, { refresh, data }] = useTable(columns, {
  dataSource: fetchData,
  hasLoading: true,
  tableClass: 'demo-table',
  pagingWrapClass: 'demo-pagination',
})

function handleRefresh() {
  refresh()
}

function handleAddData() {
  const newItem = {
    id: counter++,
    name: `新用户${counter}`,
    age: 25,
    email: `new${counter}@example.com`,
    address: `新地址${counter}`,
    status: 'active',
  }

  // 这里只是演示，实际应该调用API添加数据后刷新
  console.log('添加数据:', newItem)
  refresh()
}
</script>

<style scoped>
.demo-container {
  max-width: 100%;
  margin: 0 auto;
}

.demo-table {
  margin-bottom: 16px;
}

.demo-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
