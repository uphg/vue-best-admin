import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  vue: true,
  rules: {
    'style/brace-style': 'off', // 代码大括号风格
    'import/no-mutable-exports': 'off',
    'antfu/if-newline': 'off', // if 语句结束后强制换行
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-use-before-define': 'off',
    'no-undef': 'off',
    'regexp/no-unused-capturing-group': 'off',
    'no-restricted-globals': 'off',
    'unused-imports/no-unused-vars': 'off',
    // 'nonblock-statement-body-position': 'error', // 关闭 if 语句结束后强制换行
    'ts/no-unused-expressions': ['error', { allowShortCircuit: true }],
    'ts/no-use-before-define': 'off',
    // vue 文件各模块顺序
    'vue/block-order': ['error', {
      order: ['template', 'script', 'style'],
    }],
  },
}, {
  files: ['*.tsx', '*.jsx'],
  rules: {
    'no-unused-vars': 'off',
  },
})
