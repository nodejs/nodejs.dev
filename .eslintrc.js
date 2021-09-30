module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    node: true,
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      plugins: ['@typescript-eslint', 'react-hooks'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          typescript: {},
        },
      },
      rules: {
        'react/no-unused-prop-types': 'off',
        'react/require-default-props': 'off',
        'react/jsx-filename-extension': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'warn',
        'import/extensions': 'off',
        'consistent-return': 'off',
      },
    },
    {
      files: ['**/*.ts'],
      plugins: ['@typescript-eslint', 'react-hooks'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/resolver': {
          typescript: {},
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'warn',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
      },
    },
    {
      files: ['test-processor.js', 'test-setup.js', 'test/**'],
      extends: ['plugin:testing-library/react'],
      env: {
        jest: true,
      },
    },
  ],
};
