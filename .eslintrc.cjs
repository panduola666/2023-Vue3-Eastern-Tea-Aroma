/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    // 'eslint:recommended',
    'plugin:prettier/recommended',
    '@vue/eslint-config-prettier',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
    // ecmaVersion: "babel-eslint",
  },
  rules: {
    // 禁用 "Missing space before function parentheses" 警告
    'space-before-function-paren': 'off'
    // 其他规则
  }
}
