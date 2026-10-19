import js from "@eslint/js";
import globals from "globals";

// Lint du JS compilé : typescript-eslint ne supporte pas encore TypeScript 7
export default [
  { ignores: ["node_modules/", "dist/**/*.test.js"] },
  js.configs.recommended,
  {
    files: ["dist/**/*.js"],
    languageOptions: { globals: globals.browser },
  },
];
