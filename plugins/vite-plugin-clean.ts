import type { Plugin, ResolvedConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import fg from 'fast-glob'

export interface CleanOptions {
  includes: string[]
  silent?: boolean
  timing?: 'before' | 'after' | 'both'
}

export type GlobPattern = string | string[]

export default function vitePluginClean(options: CleanOptions): Plugin {
  const { silent = false, timing = 'after' } = options
  let config: ResolvedConfig | null = null

  const cleanFiles = async (config: ResolvedConfig) => {
    const { includes } = options
    if (!includes?.length) return

    !silent && console.log('[vite-plugin-clean] Cleaning files...')
    const filesToDelete = await resolveGlobPatterns(includes, config.root)
    filesToDelete.forEach((file) => {
      try {
        fs.rmSync(file, { recursive: true, force: true })
        !silent && console.log(`[vite-plugin-clean] Deleted: ${file}`)
      } catch (err) {
        !silent && console.warn(`[vite-plugin-clean] Failed to delete ${file}:`, err)
      }
    })
  }

  return {
    name: 'vite-plugin-clean',
    configResolved(resolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig
    },
    buildStart() {
      if (!(timing === 'before' || timing === 'both')) return
      cleanFiles(config!)
    },
    closeBundle: () => {
      if (!(timing === 'after' || timing === 'both')) return
      cleanFiles(config!)
    },
  }
}

/**
 * 解析 Glob 模式为绝对路径列表（基于项目根目录）
 * @param patterns - 文件匹配模式（支持 Glob）
 * @returns 匹配到的绝对路径数组
 */
export async function resolveGlobPatterns(patterns: string[], rootDir: ResolvedConfig['root']): Promise<string[]> {
  // 2. 串行处理每个模式
  const results: string[] = []

  for (const pattern of patterns) {
    try {
      if (path.isAbsolute(pattern)) {
        const files = await fg(pattern, {
          cwd: rootDir,
          absolute: true,
        })
        results.push(...files)
        continue
      }

      const absolutePattern = path.resolve(rootDir, pattern)
      const files = await fg(absolutePattern, {
        cwd: rootDir,
        absolute: true,
      })
      results.push(...files)
    } catch (err) {
      console.warn(`[resolveGlob] Failed to process pattern "${pattern}":`, err)
    }
  }

  return results
}
