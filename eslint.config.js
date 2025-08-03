const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const unusedImports = require("eslint-plugin-unused-imports");
const storybook = require("eslint-plugin-storybook");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      "unused-imports": unusedImports,
      storybook,
    },
    rules: {
      // remove unused imports
      "unused-imports/no-unused-imports": "warn",

      // optional: remove unused vars (but allow "_" prefix to ignore)
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],

      // optional: disable the base rule if needed
      "no-unused-vars": "off",
      "react/no-unescaped-entities": "off",
    },
    ignores: ["dist/*"],
  },
  {
    files: ["**/.rnstorybook/**", "**/*.stories.ts", "**/*.stories.tsx"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["**/app.config.ts"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);
