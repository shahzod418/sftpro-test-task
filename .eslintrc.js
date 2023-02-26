// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@mui/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@pages/**',
            group: 'parent',
          },
          {
            pattern: '@components/**',
            group: 'parent',
          },
          {
            pattern: '@state/**',
            group: 'parent',
          },
          {
            pattern: '@hooks/**',
            group: 'parent',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'parent', 'type'],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'object', 'type', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/newline-after-import': ['error', { count: 1 }],
    'import/extensions': 'off',
    'import/no-cycle': 'error',
    'import/export': 'error',
    'import/no-duplicates': 'error',

    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    '@typescript-eslint/consistent-type-imports': ['error'],
    'no-plusplus': 'error',
    'no-implicit-coercion': 'error',
    'no-unneeded-ternary': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    eqeqeq: 'error',
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    curly: 'error',
    'no-console': ['error', { allow: ['info', 'error'] }],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
};
