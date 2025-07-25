import { defineComponent } from 'vue'

/**
 * 应用程序根组件
 * 使用 Vue 3 Composition API 定义的根组件，负责渲染路由视图
 *
 * @returns {import('vue').Component} Vue 组件实例
 */
const App = defineComponent(() => {
  /**
   * 组件渲染函数
   * @returns {import('vue/jsx-runtime').JSX.Element} JSX 元素
   */
  return () => (
    <RouterView />
  )
})

export default App
