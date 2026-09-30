import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  {
    ignores: ["dist"],
  },

  {
    settings: {
      react: {
        version: "detect",
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      semi: ["error", "always"],
      quotes: ["error", "single"],
      "react/prop-types": "off",
    },
  },
];
