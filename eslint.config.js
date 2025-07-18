"use strict";

const { defineConfig } = require("eslint/config");
const salesforceLwcConfig = require("@salesforce/eslint-config-lwc/recommended");
const globals = require("globals");

module.exports = defineConfig([
  // LWC configuration for force-app/main/default/lwc
  {
    files: ["force-app/main/default/lwc/**/*.js"],
    extends: [salesforceLwcConfig]
  },

  // LWC configuration with override for LWC test files
  {
    files: ["force-app/main/default/lwc/**/*.test.js"],
    extends: [salesforceLwcConfig],
    rules: {
      "@lwc/lwc/no-unexpected-wire-adapter-usages": "off"
    },
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
]);
