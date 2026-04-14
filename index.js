import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import unicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";
import vitest from "@vitest/eslint-plugin";

export default defineConfig([
  {
    ignores: [
      "node_modules/*",
      ".pnpm-store/*",
      "*.json",
      "coverage/*",
      "dist/*",
      ".serverless/*",
      "playwright-report/",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [tseslint.configs.recommended],
    plugins: {
      unicorn,
      "unused-imports": unusedImports,
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
      "unused-imports/no-unused-imports": "error",
    },
  },
  {
    ...prettier,
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
]);
