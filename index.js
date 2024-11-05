import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import unicorn from "eslint-plugin-unicorn";

export default [
  {
    ignores: [
      "node_modules/*",
      "*.json",
      "coverage/*",
      "dist/*",
      ".serverless/*",
      "playwright-report/",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      unicorn,
    },
    rules: {
      "unicorn/prefer-module": "off",
      "unicorn/filename-case": [
        "error",
        {
          case: "camelCase",
          ignore: ["jest-mongodb-config.js"],
        },
      ],
      "no-console": "error",
      "prefer-template": "error",
    },
  },
  {
    ...prettier,
  },
];
