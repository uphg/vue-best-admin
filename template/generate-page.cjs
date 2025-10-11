#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')
const { process } = require('node:process')

// 解析 JSONC 文件（支持注释）
function parseJsonc(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  // 移除注释
  const jsonContent = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '')
  return JSON.parse(jsonContent)
}

// 生成 API 文件
function generateApiFile(config, outputPath) {
  const apiConfig = config.config.api
  const entityName = config.id
  const entityKey = entityName.charAt(0).toUpperCase() + entityName.slice(1)
  const lowerEntityKey = entityName.toLowerCase()

  let apiContent = `import { http } from '@/utils/http-lite'\n\n`

  // 生成查询 API
  if (apiConfig.query) {
    const queryConfig = apiConfig.query
    apiContent += `export function apiGet${entityKey}List(params: Record<string, any>) {\n`
    apiContent += `  return http.${queryConfig.method.toLowerCase()}('${queryConfig.url}', params)\n`
    apiContent += `}\n\n`
  }

  // 生成创建 API
  if (apiConfig.create) {
    const createConfig = apiConfig.create
    apiContent += `export function apiCreate${entityKey}(data: Record<string, any>) {\n`
    apiContent += `  return http.${createConfig.method.toLowerCase()}('${createConfig.url}', data)\n`
    apiContent += `}\n\n`
  }

  // 生成更新 API
  if (apiConfig.update) {
    const updateConfig = apiConfig.update
    apiContent += `export function apiUpdate${entityKey}(id: string, data: Record<string, any>) {\n`
    apiContent += `  return http.${updateConfig.method.toLowerCase()}('/api/users/' + id, data)\n`
    apiContent += `}\n\n`
  }

  // 生成删除 API
  if (apiConfig.delete) {
    const deleteConfig = apiConfig.delete
    apiContent += `export function apiDelete${entityKey}(id: string) {\n`
    apiContent += `  return http.${deleteConfig.method.toLowerCase()}('/api/users/' + id)\n`
    apiContent += `}\n\n`
  }

  // 生成批量删除 API
  if (apiConfig.batchDelete) {
    const batchDeleteConfig = apiConfig.batchDelete
    apiContent += `export function apiBatchDelete${entityKey}(ids: string[]) {\n`
    if (batchDeleteConfig.data && batchDeleteConfig.data.ids) {
      apiContent += `  return http.${batchDeleteConfig.method.toLowerCase()}('${batchDeleteConfig.url}', { ids })\n`
    } else {
      apiContent += `  return http.${batchDeleteConfig.method.toLowerCase()}('${batchDeleteConfig.url}', { ids })\n`
    }
    apiContent += `}\n\n`
  }

  fs.writeFileSync(path.join(outputPath, `${lowerEntityKey}-api.ts`), apiContent)
}

// 生成枚举映射
function generateEnumMaps(fields) {
  let mapDefinitions = ''

  fields.forEach((field) => {
    if (field.type === 'enum' && field.enums) {
      const mapName = `${field.key}Map`
      mapDefinitions += `const ${mapName} = new Map([\n`
      field.enums.forEach(([value, config]) => {
        mapDefinitions += `  ['${value}', { type: '${config.type}', text: '${config.text}' }],\n`
      })
      mapDefinitions += `])\n\n`
    }
  })

  return mapDefinitions
}

// 生成表单项
function generateFilterFormItems(fields, filterFields) {
  let formItems = ''

  filterFields.forEach((fieldKey) => {
    const field = fields.find(f => f.key === fieldKey)
    if (!field || field.hidden) return

    if (field.type === 'enum' && field.enums) {
      const options = field.enums.map(([value, config]) =>
        `{ label: '${config.text}', value: '${value}' }`,
      ).join(', ')

      formItems += `          <XFormSelect\n`
      formItems += `            v-model:value="filterForm.${field.key}"\n`
      formItems += `            :options="[${options}]"\n`
      formItems += `            label="${field.label}"\n`
      formItems += `            placeholder="选择${field.label}"\n`
      formItems += `            clearable\n`
      formItems += `            span="6"\n`
      formItems += `          />\n`
    } else {
      formItems += `          <XFormInput\n`
      formItems += `            v-model:value="filterForm.${field.key}"\n`
      formItems += `            label="${field.label}"\n`
      formItems += `            placeholder="搜索${field.label}"\n`
      formItems += `            clearable\n`
      formItems += `            span="6"\n`
      formItems += `          >\n`
      formItems += `            <template #prefix>\n`
      formItems += `              <NIcon>\n`
      formItems += `                <IconSearch />\n`
      formItems += `              </NIcon>\n`
      formItems += `            </template>\n`
      formItems += `          </XFormInput>\n`
    }
  })

  return formItems
}

// 生成表格列
function generateTableColumns(fields) {
  let columns = '['

  // 添加复选框列
  columns += `\n  { title: '复选框', type: 'selection', key: 'selection', fixed: 'left', width: 50 },`

  fields.forEach((field) => {
    if (field.hidden) return

    if (field.type === 'enum' && field.enums) {
      const mapName = `${field.key}Map`
      columns += `\n  { title: '${field.label}', key: '${field.key}', width: 100, render(row: any) {
    const { type, text } = ${mapName}.get(row.${field.key}) ?? ${mapName}.get('${field.enums[0][0]}')
    return (
      <NTag type={type} size="small">{text}</NTag>
    )
  } },`
    } else {
      columns += `\n  { title: '${field.label}', key: '${field.key}', width: ${field.key === 'id' ? 80 : field.key === 'createdAt' || field.key === 'updatedAt' ? 120 : 150} },`
    }
  })

  // 添加操作列
  columns += `\n  {
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
  },`

  columns += '\n]'
  return columns
}

// 生成表单字段
function generateFormFields(fields, writeableFields) {
  let formFields = '['

  writeableFields.forEach((fieldKey) => {
    const field = fields.find(f => f.key === fieldKey)
    if (!field || field.hidden) return

    if (field.type === 'enum' && field.enums) {
      const options = field.enums.map(([value, config]) =>
        `{ label: '${config.text}', value: '${value}' }`,
      ).join(', ')

      formFields += `\n    { label: '${field.label}', key: '${field.key}', as: 'select', options: [${options}] },`
    } else {
      formFields += `\n    { label: '${field.label}', key: '${field.key}' },`
    }
  })

  formFields += '\n  ]'
  return formFields
}

// 生成 Vue 页面文件
function generatePageFile(config, outputPath) {
  const entityName = config.id
  const entityKey = entityName.charAt(0).toUpperCase() + entityName.slice(1)
  const lowerEntityKey = entityName.toLowerCase()

  const { fields, filterFileds, writeableFields } = config.config
  const enumMaps = generateEnumMaps(fields)
  const filterFormItems = generateFilterFormItems(fields, filterFileds)
  const tableColumns = generateTableColumns(fields)

  // 生成过滤表单初始值
  let filterFormInit = '{\n'
  filterFileds.forEach((fieldKey) => {
    const field = fields.find(f => f.key === fieldKey)
    if (!field || field.hidden) return

    if (field.type === 'enum') {
      filterFormInit += `  ${field.key}: null,\n`
    } else {
      filterFormInit += `  ${field.key}: '',\n`
    }
  })
  filterFormInit += '}'

  // 生成重置表单逻辑
  let resetFormLogic = '{\n'
  filterFileds.forEach((fieldKey) => {
    const field = fields.find(f => f.key === fieldKey)
    if (!field || field.hidden) return

    if (field.type === 'enum') {
      resetFormLogic += `    ${field.key}: null,\n`
    } else {
      resetFormLogic += `    ${field.key}: '',\n`
    }
  })
  resetFormLogic += '  }'

  const pageContent = `<template>
  <XPage>
    <XPageHeader />
    <XPageContent>
      <NCard>
        <XForm inline label-placement="left" :show-feedback="false" :grid="{ xGap: 12 }">
${filterFormItems}
          <XFormItem span="6">
            <NFlex justify="end" class="w-full">
              <XAction type="search" @click="handleSearch"/>
              <XAction type="reset" @click="handleReset"/>
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
    <${entityKey}Modal />
  </XPage>
</template>

<script setup lang="tsx">
import { NButton, NCard, NFlex, NIcon, NTag } from 'naive-ui'
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
import { use${entityKey}Modal } from './hooks/use-${lowerEntityKey}-modal'
import { apiBatchDelete${entityKey}, apiDelete${entityKey}, apiGet${entityKey}List } from './${lowerEntityKey}-api'

${enumMaps}
const filterForm = ref(${filterFormInit})

const allColumns = ref(${tableColumns})

const [ColumnSelector, { columns }] = useColumnSelector(allColumns)

const [DataTable, { reload, checkedRowKeys }] = useTable(columns, { dataSource })
const [${entityKey}Modal, { open }] = use${entityKey}Modal({ reload })

async function dataSource({ page, pageSize }) {
  try {
    const res = await apiGet${entityKey}List({ page, pageSize, ...filterForm.value })
    return { data: res.data || [], total: res.total || 0 }
  } catch (error) {
    console.error('获取${config.name}列表失败:', error)
    return { data: [], total: 0 }
  }
}

function handleSearch() {
  reload()
}

function handleReset() {
  Object.assign(filterForm.value, ${resetFormLogic})
  reload()
}

function handleCreate() {
  open('create')
}

function handleImport() {
  $confirm.warning({
    title: '确认导入',
    content: '确定要导入${config.name}数据吗？',
    onConfirm: () => {
      // TODO: 实现导入功能
      $message.success('导入成功')
    },
  })
}

function handleExport() {
  $confirm.warning({
    title: '确认导出',
    content: '确定要导出${config.name}数据吗？',
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
    content: \`确定删除${config.name.slice(0, -2)} "\${row.name || row.id}" 吗？\`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        await apiDelete${entityKey}(row.id)
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
    content: \`确定删除选中的 \${checkedRowKeys.value.length} 个${config.name.slice(0, -2)}吗？\`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        await apiBatchDelete${entityKey}(checkedRowKeys.value)
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
`

  fs.writeFileSync(path.join(outputPath, `${lowerEntityKey}-page.vue`), pageContent)
}

// 生成 Modal Hook 文件
function generateModalFile(config, outputPath) {
  const entityName = config.id
  const entityKey = entityName.charAt(0).toUpperCase() + entityName.slice(1)
  const lowerEntityKey = entityName.toLowerCase()

  const { fields, writeableFields } = config.config
  const formFields = generateFormFields(fields, writeableFields)
  const autoRules = writeableFields.map(field => `'${field}'`).join(', ')

  const modalContent = `import XModal from '@/components/ui/x-modal/x-modal'
import { useForm } from '@/hooks/use-form/use-form'
import { $message } from '@/utils/global'
import { apiCreate${entityKey}, apiUpdate${entityKey} } from '../${lowerEntityKey}-api'

export function use${entityKey}Modal({ refresh }: any) {
  const visible = ref(false)
  const type = ref<null | 'create' | 'update'>(null)

  const [Form, { form, resetForm, validate }] = useForm(${formFields}, { autoRules: [${autoRules}] })

  function open(_type: 'create' | 'update' = 'create', values?: Record<string, any>) {
    type.value = _type
    visible.value = true
    if (_type === 'create') return
    Object.assign(form.value, values)
  }

  function close() {
    visible.value = false
  }

  async function submit() {
    try {
      await validate()
      // TODO: 调用 API 提交数据
      if (type.value === 'create') {
        await apiCreate${entityKey}(form.value)
        $message.success('新增成功')
      } else {
        await apiUpdate${entityKey}(form.value.id, form.value)
        $message.success('修改成功')
      }
      refresh()
      close()
    } catch (error) {
      console.error('验证失败:', error)
    }
  }

  function onAfterLeave() {
    resetForm()
  }

  return [
    () => (
      <XModal
        v-model:visible={visible.value}
        title={type.value === 'create' ? '新增' : '修改'}
        onConfirm={submit}
        onCancel={close}
        onAfterLeave={onAfterLeave}
      >
        <Form />
      </XModal>
    ),
    { open, close },
  ] as const
}
`

  const hooksDir = path.join(outputPath, 'hooks')
  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true })
  }
  fs.writeFileSync(path.join(hooksDir, `use-${lowerEntityKey}-modal.tsx`), modalContent)
}

// 主函数
function main() {
  const configPath = process.argv[2]
  if (!configPath) {
    console.error('请提供配置文件路径')
    process.exit(1)
  }

  if (!fs.existsSync(configPath)) {
    console.error('配置文件不存在:', configPath)
    process.exit(1)
  }

  try {
    const config = parseJsonc(configPath)

    if (config.type !== 'table') {
      console.error('目前只支持生成 table 类型的页面')
      process.exit(1)
    }

    const entityName = config.id.replace('-management', '')
    const outputDir = path.join('template/output', entityName)

    // 创建输出目录
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    console.log(`正在生成 ${config.name} 页面...`)
    console.log(`输出目录: ${outputDir}`)

    // 生成文件
    generateApiFile(config, outputDir)
    generatePageFile(config, outputDir)
    generateModalFile(config, outputDir)

    console.log('✅ 页面生成完成!')
    console.log(`📁 生成的文件:`)
    console.log(`   - ${outputDir}/${entityName.toLowerCase()}-api.ts`)
    console.log(`   - ${outputDir}/${entityName.toLowerCase()}-page.vue`)
    console.log(`   - ${outputDir}/hooks/use-${entityName.toLowerCase()}-modal.tsx`)
  } catch (error) {
    console.error('生成页面失败:', error.message)
    process.exit(1)
  }
}

// 运行主函数
main()
