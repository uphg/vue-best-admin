import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import * as NativeUI from 'naive-ui'
import svgstore from 'vite-plugin-svg-store'

const naiveUIComponentNames = getNaiveUIComponentNames()

function getNaiveUIComponentNames() {
  const exportKeys = Object.keys(NativeUI)
  return exportKeys.filter((item) => /^N/.test(item))
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/naive-ui')) {
            return 'naive-ui'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      imports: [
        'vue', 'vue-router',
        {
          'naive-ui': naiveUIComponentNames.concat(['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'])
        }
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/components', 'src/hooks', 'src/stores', 'src/shared'],
      eslintrc: {
        enabled: true, // <-- this
      },
    }),
    Components({
      dts: 'src/components.d.ts',
      dirs: ['src/components'],
      // file suffixes
      extensions: ['vue', 'tsx'],
      resolvers: [NaiveUiResolver()],
      // resolvable file suffixes
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
    }),
    UnoCSS(),
    svgstore()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
