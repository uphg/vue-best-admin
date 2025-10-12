#!/usr/bin/env node

import path from 'node:path'
import { Command } from 'commander'
import { generatePage } from './generator.js'

const program = new Command()

program
  .name('generate-page')
  .description('根据配置文件生成页面')
  .version('1.0.0')

program
  .command('generate')
  .alias('g')
  .description('生成页面')
  .argument('<config>', '配置文件路径')
  .option('-o, --output <path>', '输出目录', 'src/pages')
  .option('-f, --force', '强制覆盖已存在文件', false)
  .action(async (config, options) => {
    try {
      const configPath = path.resolve(process.cwd(), config)
      const outputPath = path.resolve(process.cwd(), options.output)

      console.log('🚀 开始生成页面...')
      console.log(`📄 配置文件: ${configPath}`)
      console.log(`📁 输出目录: ${outputPath}`)

      await generatePage(configPath, outputPath, options.force)

      console.log('✅ 页面生成完成!')
    } catch (error) {
      console.error('❌ 生成失败:', error.message)
      process.exit(1)
    }
  })

program.parse()
