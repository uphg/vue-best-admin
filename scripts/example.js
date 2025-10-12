#!/usr/bin/env node

// 页面生成器使用示例
// 运行: node scripts/example.js

import { execSync } from 'node:child_process'

console.log('=== 页面生成器使用示例 ===\n')

// 示例1: 生成用户管理页面
console.log('1. 生成用户管理页面...')
try {
  execSync('node scripts/generate-page.js generate template/config/pages/user.jsonc --force', {
    stdio: 'inherit',
    cwd: process.cwd(),
  })
  console.log('✅ 用户管理页面生成成功\n')
} catch (error) {
  console.error('❌ 用户管理页面生成失败:', error.message)
}

// 示例2: 生成产品管理页面
console.log('2. 生成产品管理页面...')
try {
  execSync('node scripts/generate-page.js generate template/config/pages/product.jsonc --force', {
    stdio: 'inherit',
    cwd: process.cwd(),
  })
  console.log('✅ 产品管理页面生成成功\n')
} catch (error) {
  console.error('❌ 产品管理页面生成失败:', error.message)
}

// 示例3: 查看帮助信息
console.log('3. 查看帮助信息...')
try {
  const helpOutput = execSync('node scripts/generate-page.js --help', {
    encoding: 'utf8',
    cwd: process.cwd(),
  })
  console.log(helpOutput)
} catch (error) {
  console.error('❌ 获取帮助信息失败:', error.message)
}

console.log('=== 示例完成 ===')
