import { defineConfig } from "cypress";
import  viteConfig  from "./vite.config";

export default defineConfig({
  component: {
    port: 3001,
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    indexHtmlFile: 'cypress/support/component-index.html',
    supportFile: false,
  },

  e2e: {
    baseUrl: 'http://127.0.0.1:3001',
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
    },
  },
});