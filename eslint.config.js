import js from "@eslint/js"
import { defineConfig, globalIgnores } from "eslint/config"
import configPrettier from "eslint-config-prettier"
import pluginPrettier from "eslint-plugin-prettier"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import globals from "globals"

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      configPrettier, // Desativa regras de formatação do ESLint que conflitam com o Prettier
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      prettier: pluginPrettier, // Adiciona o plugin do Prettier
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "prettier/prettier": "error", // Reporta erros de formatação como erros do ESLint
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
])
