import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Eta } from 'eta'
import stripJsonComments from 'strip-json-comments'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const eta = new Eta({ autoEscape: false, views: path.join(__dirname, 'templates') })

export function loadConfig(configPath) {
  if (!fs.existsSync(configPath)) {
    throw new Error(`配置文件不存在: ${configPath}`)
  }

  const content = fs.readFileSync(configPath, 'utf-8')
  const jsonContent = stripJsonComments(content)

  try {
    return JSON.parse(jsonContent)
  } catch (error) {
    throw new Error(`配置文件格式错误: ${error.message}`)
  }
}

export function generateFields(fields) {
  return fields.map((field) => {
    if (field.type === 'enum' && field.enums) {
      const enumMap = field.enums.map(([value, config]) =>
        `  ['${value}', { type: '${config.type}', text: '${config.text}' }]`,
      ).join(',\n')

      return {
        ...field,
        enumMap: `const ${field.key}Map = new Map([\n${enumMap}\n])`,
        enumRender: `const { type, text } = ${field.key}Map.get(row.${field.key}) ?? ${field.key}Map.get('${field.enums[0][0]}')\n        return (\n          <NTag type={type} size=\"small\">{text}</NTag>\n        )`,
      }
    }
    return field
  })
}

export function generateFilterForm(filterFileds, fields) {
  if (!filterFileds || !Array.isArray(filterFileds)) {
    return []
  }

  return filterFileds.map((fieldKey) => {
    const field = fields.find(f => f.key === fieldKey)
    if (!field) return null

    if (field.type === 'enum' && field.enums) {
      const options = field.enums.map(([value, config]) =>
        `{ label: '${config.text}', value: '${value}' }`,
      ).join(', ')

      return {
        ...field,
        component: 'XFormSelect',
        options: `[${options}]`,
      }
    }

    return {
      ...field,
      component: 'XFormInput',
    }
  }).filter(Boolean)
}

export function generateWriteableForm(writeableFields, fields) {
  if (!writeableFields || !Array.isArray(writeableFields)) {
    return []
  }

  return writeableFields.map((fieldKey) => {
    const field = fields.find(f => f.key === fieldKey)
    if (!field) return null

    if (field.type === 'enum' && field.enums) {
      const options = field.enums.map(([value, config]) =>
        `{ label: '${config.text}', value: '${value}' }`,
      ).join(', ')

      return {
        ...field,
        as: 'select',
        options: `[${options}]`,
      }
    }

    return {
      ...field,
      as: 'input',
    }
  }).filter(Boolean)
}

export function generateApiMethods(api) {
  const methods = []

  if (api.query) {
    methods.push({
      name: 'apiGetList',
      method: api.query.method.toLowerCase(),
      url: api.query.url,
      params: api.query.params,
    })
  }

  if (api.create) {
    methods.push({
      name: 'apiCreate',
      method: api.create.method.toLowerCase(),
      url: api.create.url,
    })
  }

  if (api.update) {
    methods.push({
      name: 'apiUpdate',
      method: api.update.method.toLowerCase(),
      url: api.update.url,
    })
  }

  if (api.delete) {
    methods.push({
      name: 'apiDelete',
      method: api.delete.method.toLowerCase(),
      url: api.delete.url,
    })
  }

  if (api.batchDelete) {
    methods.push({
      name: 'apiBatchDelete',
      method: api.batchDelete.method.toLowerCase(),
      url: api.batchDelete.url,
    })
  }

  return methods
}

export async function generatePage(configPath, outputPath, force = false) {
  const config = loadConfig(configPath)
  const { id, name, config: pageConfig } = config

  if (!id || !pageConfig) {
    throw new Error('配置文件缺少必要字段: id 或 config')
  }

  const pageDir = path.join(outputPath, id)

  if (fs.existsSync(pageDir) && !force) {
    throw new Error(`目录已存在: ${pageDir}，请使用 --force 参数覆盖`)
  }

  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true })
  }

  const hooksDir = path.join(pageDir, 'hooks')
  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true })
  }

  const processedFields = generateFields(pageConfig.fields)
  const filterForm = generateFilterForm(pageConfig.filterFileds || [], pageConfig.fields)
  const writeableForm = generateWriteableForm(pageConfig.writeableFields || [], pageConfig.fields)
  const apiMethods = generateApiMethods(pageConfig.api || {})

  const templateData = {
    id,
    name,
    fields: processedFields,
    filterForm,
    writeableForm,
    apiMethods,
    config: pageConfig,
    pageConfig,
  }

  const pageContent = eta.render('page.vue.eta', templateData)
  const apiContent = eta.render('api.ts.eta', templateData)
  const modalContent = eta.render('modal.tsx.eta', templateData)

  const pageFilePath = path.join(pageDir, `${id}-page.vue`)
  const apiFilePath = path.join(pageDir, `${id}-api.ts`)
  const modalFilePath = path.join(hooksDir, `use-${id}-modal.tsx`)

  fs.writeFileSync(pageFilePath, pageContent)
  fs.writeFileSync(apiFilePath, apiContent)
  fs.writeFileSync(modalFilePath, modalContent)

  console.log(`📄 生成页面文件: ${pageFilePath}`)
  console.log(`📄 生成API文件: ${apiFilePath}`)
  console.log(`📄 生成弹框文件: ${modalFilePath}`)
}
