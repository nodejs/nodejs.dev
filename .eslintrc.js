module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    // project: './tsconfig.json'
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
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
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'consistent-return': 'off',
    // "camelcase": "off",
    // "@typescript-eslint/camelcase": ["error", { "properties": "never" }],
    // "no-unused-vars": "off",
    // "@typescript-eslint/no-unused-vars": "error",
    // "@typescript-eslint/indent": ["error", 2]
  },
  plugins: [
    '@typescript-eslint',
    'react-hooks',
    // "prettier"
  ],
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
