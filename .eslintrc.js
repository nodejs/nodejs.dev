module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
    // project: './tsconfig.json'
  },
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    // "prettier",
    "prettier/@typescript-eslint",
    //
    // these were used in the other config
    // not sure wht the plugin prefix does
    // "plugin:jest/recommended",
    "plugin:prettier/recommended"
  ],
  settings: {
    "import/resolver": {
      typescript: {}
    }
  },
  env: {
    browser: true,
    node: true,
    jest: true
  },
  rules: {
    // "react/jsx-filename-extension": "off",
    // "react-hooks/rules-of-hooks": "error",
    // "react-hooks/exhaustive-deps": "warn",
    // "camelcase": "off",
    // "@typescript-eslint/camelcase": ["error", { "properties": "never" }],
    // "no-unused-vars": "off",
    // "@typescript-eslint/no-unused-vars": "error",
    // "@typescript-eslint/indent": ["error", 2]
  },
  plugins: [
    "@typescript-eslint",
    // "react-hooks",
    // "prettier"
  ]
}
