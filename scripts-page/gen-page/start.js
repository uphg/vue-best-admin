import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Eta } from 'eta'
import { createApi } from './create-api.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function loadConfigs(directoryPath) {
  const absolutePath = path.resolve(directoryPath)
  const files = await fs.readdir(absolutePath)
  const jsFiles = files.filter(file => file.endsWith('.js'))
  const configs = []
  for (const file of jsFiles) {
    try {
      const filePath = path.join(absolutePath, file)
      const module = await import(filePath)

      if (module.config) {
        configs.push({
          file,
          config: module.config,
        })
      }
    } catch (error) {
      console.error(`Error loading ${file}:`, error.message)
    }
  }
  return configs
}

async function main() {
  const eta = new Eta({ autoEscape: false, views: path.join(__dirname, '../template') })
  // const configs = await loadConfigs('./scripts-page/configs')
  // console.log('Loaded configs:', configs)
  createApi(eta)
}

main()
