import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
  content: {
    filesystem: [
      './src/**/*.{html,js,ts,jsx,tsx,vue}',
    ]
  },
  presets: [
    presetUno(),
    presetAttributify()
  ],
  rules: [
    ['shadow-medium', { 'box-shadow': 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }],
  ],
  theme: {
    colors: {
      primary: 'rgba(var(--c-primary),%alpha)',
    },
  },
})