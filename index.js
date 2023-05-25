module.exports = {
  env: {
    node: true,
    commonjs: true,
    jest: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2022,
  },
  plugins: ["unicorn"],
  rules: {
    "space-infix-ops": ["error"],
    eqeqeq: ["error", "always"],
    "prefer-template": ["error"],
    "@typescript-eslint/no-explicit-any": "off",
    "unicorn/prefer-module": "off",
    "unicorn/filename-case": [
      "error",
      {
        case: "camelCase",
      },
    ],
  },
  ignorePatterns: ["node_modules/**", "*.json", "coverage", "dist"],
};
