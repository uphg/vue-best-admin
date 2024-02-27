import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
  content: {
    filesystem: ['./src/**/*.{html,js,ts,jsx,tsx,vue}']
  },
  presets: [presetUno(), presetAttributify()],
  rules: [
    ['shadow-base', { 'box-shadow': 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }]
    // ['shadow-', { 'box-shadow': '0 20px 25px -5px rgb(0 0 0/0.1),0 8px 10px -6px rgb(0 0 0/0.1)' }]
  ],
  theme: {
    colors: {
      primary: 'rgba(var(--c-primary),%alpha)'
    }
  }
})
