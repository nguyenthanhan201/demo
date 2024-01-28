/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  // parserOptions: {
  //   ecmaVersion: 'latest',
  //   sourceType: 'module'
  // },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    '@repo/eslint-config/next.js'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: false
  },
  plugins: [],
  rules: {}
};
