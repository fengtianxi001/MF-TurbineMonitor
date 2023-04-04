module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/vue3-strongly-recommended', 'airbnb-base', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      tsx: true,
      jsx: true
    }
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }
    ],
    'no-param-reassign': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/attribute-hyphenation': 'off',
    'import/prefer-default-export': 'off',
    'no-promise-executor-return': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT'
        ],
        alphabetical: false
      }
    ],
    'vue/v-on-event-hyphenation': [
      'error',
      'always',
      {
        autofix: true,
        ignore: []
      }
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always'
      }
    ]
  }
}
