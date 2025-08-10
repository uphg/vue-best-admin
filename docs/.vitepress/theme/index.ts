import type { Theme } from 'vitepress'
import { NButton, NCard, NCode } from 'naive-ui'
import DefaultTheme from 'vitepress/theme'
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('NButton', NButton)
    app.component('NCard', NCard)
    app.component('NCode', NCode)
  },
} satisfies Theme
