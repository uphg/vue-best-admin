import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    sidebar: [
      {
        text: '简介',
        items: [
          { text: 'Vue Best Admin', link: '/index' },
          { text: '项目规范', link: '/specification' },
        ],
      },

      {
        text: 'Hooks',
        items: [
          { text: '快速开始', link: '/hooks/index' },
          { text: 'useDataTable', link: '/hooks/use-data-table' },
          { text: 'useForm', link: '/hooks/use-form' },
        ],
      },
      {
        text: '公共组件',
        items: [
          { text: 'PureButton', link: '/components/pure-button' },
          { text: 'XModal', link: '/components/x-modal' },
          { text: 'XTag', link: '/components/x-tag' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
