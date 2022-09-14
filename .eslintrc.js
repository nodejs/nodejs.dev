module.exports = {
  overrides: [
    {
      files: ['**/*.{js,jsx}'],
      extends: ['airbnb', 'prettier'],
      env: { node: true },
    },
    {
      files: ['**/*.{ts,tsx}'],
      extends: ['airbnb', 'prettier', 'plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      env: { browser: true, node: true },
      parser: '@typescript-eslint/parser',
      settings: { 'import/resolver': { typescript: {} } },
      rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'warn',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
      },
    },
    {
      files: ['**/*.tsx'],
      extends: [
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      plugins: ['@typescript-eslint', 'react-hooks'],
      parserOptions: { ecmaFeatures: { jsx: true } },
      settings: { react: { version: 'detect' } },
      rules: {
        'react/no-unused-prop-types': 'off',
        'react/require-default-props': 'off',
        'react/jsx-filename-extension': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'consistent-return': 'off',
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
      },
    },
    {
      files: [
        'test-processor.js',
        'test-setup.js',
        'test/**/**.{js,jsx,ts,tsx}',
        '**/**.test.{js,jsx,ts,tsx}',
      ],
      extends: ['plugin:testing-library/react'],
      env: { jest: true, node: true, browser: true },
    },
    {
      // Disable linting for API as some parts are just not compatible with MDXv2
      files: ['content/**/*.{md,mdx}'],
      extends: ['plugin:mdx/recommended'],
      settings: { 'mdx/code-blocks': false },
      rules: { 'react/jsx-no-undef': 'off' },
    },
    {
      files: [
        'content/about/*.{md,mdx}',
        'content/download/*.{md,mdx}',
        'content/get-involved/*.{md,mdx}',
        'content/homepage/*.{md,mdx}',
        'content/learn/*.m{md,mdx}',
      ],
      settings: { 'mdx/code-blocks': true },
    },
    {
      files: ['content/**/*.{md,mdx}/*.{js,jsx,cjs,mjs,ts,tsx}'],
      rules: {
        camelcase: 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'consistent-return': 'off',
        'func-names': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'no-console': 'off',
        'no-empty': 'off',
        'no-restricted-globals': 'off',
        'no-restricted-syntax': 'off',
        'no-undef': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'prefer-promise-reject-errors': 'off',
      },
    },
  ],
};
